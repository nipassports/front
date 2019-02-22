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
        }
        stage('Stop old container') {
          when {
            branch "dev"
          }
          steps {
            sh 'docker stop nip-front-dev' 2> /dev/null
            sh 'docker rm nip-front-dev' 2> /dev/null
            sh 'docker rmi nip/front-dev' 2> /dev/null
            echo 'Old container stopped'
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
    }
  }
  environment {
    HOME = '.'
  }
}
