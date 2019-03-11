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
    stage('Build') {
      parallel {
        stage('Build dev') {
          when {
            branch "dev"
          }
          steps {
            sh 'docker build -t nip/front-dev .'
            echo 'Docker dev image built'
          }
        }
        stage('Build prod') {
          when {
            branch "master"
          }
          steps {
            sh 'docker build -t nip/front .'
            echo 'Docker prod image built'
          }
        }
        stage('Stop old dev') {
          when {
            branch "dev"
          }
          steps {
            sh 'docker stop nip-front-dev || true'
            sh 'docker rm nip-front-dev || true'
            sh 'docker rmi nip/front-dev || true'
            echo 'Old dev container stopped'
          }
        }
        stage('Stop old prod') {
          when {
            branch "master"
          }
          steps {
            sh 'docker stop nip-front || true'
            sh 'docker rm nip-front || true'
            sh 'docker rmi nip/front || true'
            echo 'Old prod container stopped'
          }
        }
      }
    }
    stage('Run dev container') {
      when {
        branch "dev"
      }
      steps {
        sh 'docker run -p 4200:4200 -p 3000:3000 -d --name nip-front-dev nip/front-dev'
        echo 'Dev container ready !'
      }
    }
    stage('Run prod container') {
      when {
        branch "master"
      }
      steps {
        sh 'docker run -p 80:4200 -d --name nip-front nip/front'
        echo 'Prod container ready !'
      }
    }
  }
  environment {
    HOME = '.'
  }
}
