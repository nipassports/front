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
    if(env.BRANCH_NAME == 'master') {
      parallel {
        stage('Build prod image') {
          steps {
            sh 'docker build -t nip/front .'
            echo 'Docker production image built'
          }
        }
        stage('Stop prod container') {
          steps {
            sh 'docker stop nip-front'
            sh 'docker rm nip-front'
            echo 'Production container stopped'
          }
        }
      }
    }

    if(env.BRANCH_NAME == 'dev') {
      parallel {
        stage('Build dev image') {
          steps {
            sh 'docker build -t nip/front-dev .'
            echo 'Docker dev image built'
          }
        }
        stage('Stop dev container') {
          steps {
            sh 'docker stop nip-front-dev'
            sh 'docker rm nip-front-dev'
            echo 'Dev container stopped'
          }
        }
      }
    }

    if(env.BRANCH_NAME == 'master'){
      stage('Run prod container') {
        steps {
          sh 'docker run -p 80:4200 -d --name nip-front nip/front'
          echo 'Container ready (port 80) !'
        }
      }
    }


    if(env.BRANCH_NAME == 'dev'){
      stage('Run dev container') {
        steps {
          sh 'docker run -p 4200:4200 -d --name nip-front-dev nip/front-dev'
          echo 'Container ready (port 4200) !'
        }
      }
    }
    
  }
  environment {
    HOME = '.'
  }
}
