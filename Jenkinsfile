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
    stage('Build image') {
      parallel {
        stage('Build image') {
          when {
            branch "dev"
          }
          steps {
            sh 'docker build -t nip/front-dev .'
            echo 'Docker dev image built'
          }
          when {
            branch "master"
          }
          steps {
            sh 'docker build -t nip/front .'
            echo 'Docker prod image built'
          }
        }
        stage('Stop old container') {
          when {
            branch "dev"
          }
          steps {
            sh 'docker stop nip-front-dev || true'
            sh 'docker rm nip-front-dev || true'
            sh 'docker rmi nip/front-dev || true'
            echo 'Dev container stopped'
          }
          when {
            branch "master"
          }
          steps {
            sh 'docker stop nip-front || true'
            sh 'docker rm nip-front || true'
            sh 'docker rmi nip/front || true'
            echo 'Prod container stopped'
          }
        }
      }
    }
    stage('Run new container') {
      when {
        branch "dev"
      }
      steps {
        sh 'docker run -p 4200:4200 -d --name nip-front-dev nip/front-dev'
        echo 'Dev container ready !'
      }
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
