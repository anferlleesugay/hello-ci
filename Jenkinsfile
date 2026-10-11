pipeline {
    agent any

    triggers {
        // Poll SCM every 2 minutes for changes on GitHub
        pollSCM('H/2 * * * *')
    }

    environment {
        // Points Jest/Selenium to the Selenium container on the Docker bridge network
        SELENIUM_HOST = 'http://selenium:4444/wd/hub'
        APP_URL       = 'http://jenkins:3000'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                dir('hello-ci') {
                    sh 'npm install'
                }
            }
        }

        stage('UI Test') {
            steps {
                dir('hello-ci') {
                    // Start Express server in background, wait for it to initialize, then run E2E test with JUnit reporter
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
    }

    post {
        always {
            dir('hello-ci') {
                // Publish JUnit XML test reports in Jenkins
                junit 'junit.xml'
            }
        }
    }
}