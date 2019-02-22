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
            sh 'docker stop nip-front-dev'
            sh 'docker rm nip-front-dev'
            echo 'Old containers stopped'
          }
        }
      }
    }
    stage('Run new container') {
      steps {
        sh 'docker run -p 4200:4200 -d --name nip-front-dev nip-front'
        echo 'Container ready !'
      }
    }
  }
}