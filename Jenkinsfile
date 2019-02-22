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
			if(env.BRANCH_NAME == 'master') {
            sh 'docker build -t nip/front .'
			}
			if(env.BRANCH_NAME == 'dev') {
			sh 'docker build -t nip/front-dev .'
			}
            echo 'Docker image built'
          }
        }
		if(env.BRANCH_NAME == 'master'){
			stage('Stop production container') {
			  steps {
				sh 'docker stop nip-front'
				sh 'docker rm nip-front'
				echo 'Production container stopped'
			  }
			}
        }
		if(env.BRANCH_NAME == 'dev'){
			stage('Stop dev container') {
			  steps {
				sh 'docker stop nip-front-dev'
				sh 'docker rm nip-front-dev'
				echo 'Dev container stopped'
			  }
			}
        }
      }
    }
	if(env.BRANCH_NAME == 'master'){
		stage('Run production container') {
		  steps {
			sh 'docker run -p 80:4200 -d --name nip-front nip/front'
			echo 'Container ready (port 80) !'
		  }
		}
	}
	if(env.BRANCH_NAME == 'dev'){
		stage('Run new container') {
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
