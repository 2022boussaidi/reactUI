

pipeline {
    agent any
 
    tools { nodejs "NodeJS_22" }

    environment {
        // Define environment variables used throughout the pipeline
        registryUrl = "http://YOUR_REGISTRY_IP:PORT"  // Replace with your Docker registry URL
        imageTag = "YOUR_REGISTRY_IP:PORT/reactapp"   // Replace with your Docker image tag
        dockerImage = ''
        serverIp = "YOUR_SERVER_IP"                    // Replace with your server's IP address
        serverUser = "YOUR_SERVER_USERNAME"            // Replace with your server's username
    }

    stages {

        stage('Checkout') {
            steps {
                // Checkout the code from your Git repository
                git 'https://github.com/2022boussaidi/reactUI.git'
            }
        }

        stage('Build React App') {
            steps {
                // Install project dependencies and build the React application
                sh 'npm install'
                sh 'npm run build'
            }
        }
}
}

