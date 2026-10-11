pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        SELENIUM_HOST = 'http://selenium:4444/wd/hub'
        APP_URL       = 'http://jenkins:3000'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('UI Test') {
            steps {
                sh '''
                    node src/app.js &
                    APP_PID=$!
                    sleep 3
                    
                    npx jest tests/e2e/home.test.js --reporters=default --reporters=jest-junit || TEST_FAILED=true
                    
                    kill $APP_PID || true
                    
                    if [ "$TEST_FAILED" = "true" ]; then
                        exit 1
                    fi
                '''
            }
        }
    }

    post {
        always {
            junit 'junit.xml'
        }
    }
}