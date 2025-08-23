pipeline {
	agent any
	tools {
        	nodejs 'NodeJS'
    }
	environment {
    		DOCKER_HUB_REPO = 'jozefcvik/jenkinsargocdgitops'
			DOCKER_HUB_CREDENTIALS_ID = 'GitOps-token-DockerHub'
	}
	stages {
		stage('Checkout Github'){
			steps {
			git branch: 'main', credentialsId: 'GitOps-token-GitHub', url: 'https://github.com/Jozefcvik/Jenkins-ArgoCD-GitOps.git'
			}
		}		
		stage('Install node dependencies'){
			steps {
					sh 'npm install'
			}
		}
		stage('Build Docker Image'){
			steps {
				script {
					echo 'building docker...'
					dockerImage = docker.build("${DOCKER_HUB_REPO}:latest")
				}
				script {
					echo 'deleting building docker...'
                    sh 'docker image prune -f'
                }
			}
		}
		stage('Trivy Scan'){
			steps {
				echo 'scanning docker with Trivy...'
				// ONLY FIRST TIME TO UPDATE TRIVY VULNERABILITY DATABASE
				// sh 'trivy image --severity HIGH,CRITICAL --no-progress --format table -o trivy-scan-report.txt ${DOCKER_HUB_REPO}:latest'
				// AFTER THAT - THE VULNERABILITY DATABASE DOESN`T NEED TO BE ALWAYS DOWNLOADED (IN THE TEST ENVIRONMENT)
				sh 'trivy image --severity HIGH,CRITICAL --skip-update --no-progress --format table -o trivy-scan-report.txt ${DOCKER_HUB_REPO}:latest'
			}
		}
		stage('Push Image to DockerHub'){
			steps {
				script {
					echo 'pushing docker to DockerHub...'
					docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_HUB_CREDENTIALS_ID}"){
						dockerImage.push('latest')
						}
					}
				}
			}
		stage('Install Kubectl & ArgoCD CLI'){
			steps {
				echo 'installing Kubectl + Argocd...'
			}
		}
		stage('Apply Kubernetes Manifests & Sync App with ArgoCD'){
			steps {
				script {
					echo 'sync app with ARGO CD...'	
				}
			}
		}
	}

	post {
		success {
			echo 'Build & Deploy completed succesfully!'
		}
		failure {
			echo 'Build & Deploy failed. Check logs.'
		}
	}
}
