pipeline {
    agent any

    triggers {
        pollSCM "*/5 * * * *"
    }

    tools {nodejs "NodeJS"}

    stages {
	    stage('Building') {
            steps{
                sh "echo '[Frontend] Building...'"
                sh "npm install"
                sh "CI=False npm run build"
            }
            post {
                success {
                    sh "echo 'Frontend built successfully'"
                }
            }
        }
        stage("Reset containers"){
            steps{
                script {
                    try {
                        sh "docker compose --env-file config/test.env down"
                    }
                    finally {}
                }
            }
        }
        stage("Deploy containers") {
            steps {
                sh "docker compose --env-file config/test.env up -d"
            }
        }

        stage("Push image to remote register"){
            steps {
                sh "docker compose --env-file config/test.env push"
            }
        }
    }
}