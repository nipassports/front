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
          steps {
            sh 'docker build -t nip-front .'
            echo 'Docker image built'
          }
        }
        stage('Stop old container') {
          steps {
            sh 'docker stop nip-front-master'
            sh 'docker rm nip-front-master'
            echo 'Old containers stopped'
          }
        }
      }
    }
    stage('Run new container') {
      steps {
        sh 'docker run -p 80:4200 -d --name nip-front-master nip-front'
        echo 'Container ready !'
      }
    }
  }
  environment {
    HOME = '.'
  }
}
