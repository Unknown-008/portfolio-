pipeline {
    agent any

    stages {

        stage('Deploy Frontend') {

            steps {

                dir('/var/www/avennyx/client') {

                    sh 'git pull origin main'
                    sh 'npm install --legacy-peer-deps'
                    sh 'npm run build'

                    sh 'sudo rm -rf /var/www/html/*'
                    sh 'sudo cp -r build/* /var/www/html/'
                }
            }
        }
    }
}