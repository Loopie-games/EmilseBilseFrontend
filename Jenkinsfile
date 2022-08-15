pipeline {
    agent any

    triggers {
        pollSCM "*/5 * * * *"
    }

    tools {nodejs "NodeJS"}

    stages {
	    stage('Building') {
            steps{
                sh "npm install"
                sh "CI=False npm run build"
            }
        }

        stage("Testing"){
            steps {
                sh "npm install testcafe testcafe-reporter-xunit"
                sh "node_modules/.bin/testcafe firefox:headless tests/**/* -r xunit:res.xml"
                junit 'res.xml'
            }
        }

        stage("Reset containers"){
            steps{
                script {
                    try {
                        sh "docker compose -f docker-compose.yml --env-file config/test.env down"
                    }
                    finally {}
                }
            }
        }
        stage("Deploy containers") {
            steps {
                sh "docker compose -f docker-compose.yml --env-file config/test.env up -d"
            }
        }
    }
}