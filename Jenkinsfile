pipeline {
  agent any
  stages {
    stage('Check dependencies') {
      agent {
        docker {
          image 'node:8'
        }
      }
      steps {
        sh 'npm install'
        echo 'Everything is okay, we can continue !'
      }
    }

    node {
        if (env.BRANCH_NAME == 'master') {
          parallel {
            stage('Build prod') {
              steps {
                sh 'docker build -t nip/front-dev .'
                echo 'Docker prod image built'
              }
            }
            stage('Stop old container') {
              steps {
                sh 'docker stop nip-front || true'
                sh 'docker rm nip-front || true'
                sh 'docker rmi nip/front || true'
                echo 'Prod container stopped'
              }
            }
          }
        }
        if (env.BRANCH_NAME == 'dev'){
          parallel {
            stage('Build dev') {
              steps {
                sh 'docker build -t nip/front-dev .'
                echo 'Docker dev image built'
              }
            }
            stage('Stop old container') {
              steps {
                sh 'docker stop nip-front-dev || true'
                sh 'docker rm nip-front-dev || true'
                sh 'docker rmi nip/front-dev || true'
                echo 'Dev container stopped'
              }
            }
          }
        }
    }

    node {
      stage('Deploy') {
        if (env.BRANCH_NAME == 'master') {
            steps {
              sh 'docker run -p 4200:4200 -d --name nip-front-dev nip/front-dev'
              echo 'Dev container ready (port 4200)!'
            }
        }
        if (env.BRANCH_NAME == 'dev'){
          steps {
            sh 'docker run -p 80:4200 -d --name nip-front nip/front'
            echo 'Prod container ready (port 80)!'
          }
        }
      }
    }
  }
  environment {
    HOME = '.'
  }
}
