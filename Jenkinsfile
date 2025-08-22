pipeline {
	agent any
	stages {
		stage('Checkout Github'){
			steps {
			git branch: 'main', credentialsId: 'GitOps-token-GitHub', url: 'https://github.com/Jozefcvik/Jenkins-ArgoCD-GitOps.git'
			}
		}		
		stage('Install node dependencies'){
			steps {
				echo 'installing node dependencies...'
			}
		}
		stage('Build Docker Image'){
			steps {
				script {
					echo 'building docker...'
				}
			}
		}
		stage('Trivy Scan'){
			steps {
				echo 'scanning docker with Trivy...'
			}
		}
		stage('Push Image to DockerHub'){
			steps {
				script {
					echo 'pushing docker to DockerHub...'
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
