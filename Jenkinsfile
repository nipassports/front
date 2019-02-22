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
    parallel {
      stage('Build image') {
        steps {
          if(env.BRANCH_NAME == 'master') {
            sh 'docker build -t nip/front .'
            echo 'Docker prod image built'
          }
          if(env.BRANCH_NAME == 'dev') {
            sh 'docker build -t nip/front-dev .'
            echo 'Docker dev image built'
          }
        }
      }
      stage('Stop old container') {
        steps {
          if(env.BRANCH_NAME == 'master') {
            sh 'docker stop nip-front'
            sh 'docker rm nip-front'
            echo 'Production container stopped'
          }
          if(env.BRANCH_NAME == 'dev') {
            sh 'docker stop nip-front-dev'
            sh 'docker rm nip-front-dev'
            echo 'Dev container stopped'
          }
        }
      }
    }
    stage('Run container') {
      steps {
        if(env.BRANCH_NAME == 'master'){
          sh 'docker run -p 80:4200 -d --name nip-front nip/front'
          echo 'Container ready (port 80) !'
        }
        if(env.BRANCH_NAME == 'dev'){
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
