import React, { useEffect, useState } from 'react';

const AlertComponent = () => {
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Create a new WebSocket connection
    const ws = new WebSocket('ws://localhost:5000');

    // Define WebSocket open event
    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

   // Define WebSocket message event
ws.onmessage = event => {
    console.log('Message received:', event.data);
    const data = JSON.parse(event.data);
    setAlertMessage(data.message);
  };
  
    // Define WebSocket close event
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Define WebSocket error event
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {alertMessage && (
        <div className="alert alert-danger" role="alert">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default AlertComponent;
