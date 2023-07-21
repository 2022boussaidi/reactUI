import React from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient=null;
export default function Chatroom() {
    const [userData, setUserData] = useState({
        username: "",
        receivername:"",
        connected:false,
        message:""
      });
    const handleUserName=(e) => {
       const {value} =e.target;
       setUserData({ ...userData, "username":value });
    };
    const registerUser=() => {
        let Sock=new SockJS('http://localhost:8080/ws')
        stompClient=over(Sock);
        stompClient.connect({},onConnected,onError)

     };

     const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/topic/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }
  return (
    <div className='chatContainer'>
    {userData.connected?
    <div>
    </div>
    :
    <div className='register'>
    <input 
    id='user-name'
    placeholder='Enter the user name'
    value={userData.username}
    onChange={handleUserName}
    />
    <button type='button' onClick={registerUser} >
    
    </button>
    
    </div>
    }
    </div>
  )
}
