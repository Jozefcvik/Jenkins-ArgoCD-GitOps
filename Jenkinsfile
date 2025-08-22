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
				sh '''echo 'installing node dependencies...''''
			}
		}
		stage('Build Docker Image'){
			steps {
				script {
					sh '''echo 'building docker...''''
				}
			}
		}
		stage('Trivy Scan'){
			steps {
				sh '''echo 'scanning docker with Trivy...''''
			}
		}
		stage('Push Image to DockerHub'){
			steps {
				script {
					sh '''echo 'pushing docker to DockerHub...''''
					}
				}
			}
		stage('Install Kubectl & ArgoCD CLI'){
			steps {
				sh '''echo 'installing Kubectl + Argocd...''''
			}
		}
		stage('Apply Kubernetes Manifests & Sync App with ArgoCD'){
			steps {
				script {
				sh '''echo 'sync app with ARGO CD...''''	
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
