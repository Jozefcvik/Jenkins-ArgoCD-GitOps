## AWS - EC2 - Create EC2 Instance & Set up Environment

### Log in to Ubuntu EC2 Instance:
```sh
ssh -i /home/paacyber/Downloads/<keypair.pem> ubuntu@PublicIP
```

### Clone GitHUB repo
```sh
git clone https://xxx
```

### Install Docker

https://docs.docker.com/engine/install/ubuntu/

https://docs.docker.com/engine/install/linux-postinstall/


### Install Minikube

https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download

```sh
minikube start --driver=docker
```

### Install kubectl

https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

```sh
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```
```sh
snap install kubectl --classic
```
```sh
kubectl version --client
```
#### Check post-install
```sh
minikube status
```
```sh
kubectl get nodes
```
```sh
kubectl cluster-info 
```

### Set Up Jenkins container
```sh
docker run -d --name jenkins \
-p 8080:8080 \
-p 50000:50000 \
-v /var/run/docker.sock:/var/run/docker.sock \
-v $(which docker):/usr/bin/docker \
-u root \
-e DOCKER_GID=$(getent group docker | cut -d: -f3) \
--network minikube \
jenkins/jenkins:lts
```
### Login to Jenkins UI
http://AWS_EC2_public_IP:8080/

- Initial Jenkins Password
  ```sh
  docker logs jenkins
  ```
- Install suggested plugins
- Create First Admin User
- Manage Jenkins
    - Plugins
      - Available Plugins
        - Docker
        - Docker Pipeline
        - NodeJS
        - Kubernetes
```sh
docker restart jenkins
```
- login again to Jenkins UI
- Configure Jenkins Container
  ```sh
  docker exec -it jenkins bash
  ```
  ```sh
  apt-get update -y
  ```
  ```sh
  apt-get install iputils-ping npm -y
  ```
```sh
docker restart jenkins
```

## Set Credentials Between GitHub  and Jenkins
### 1. GITHUB - Generate API key for EC2 (clone GIT repo) in Github
- Login to Github
  - create Personal Acces tokens (Tokens Classic)
      - repo
      - admin
      - workflow

### 2. Jenkins
- Manage Jenkins
  - Credentials
    - Global Credentials
      - Add Credentials
        - Kind - Username with Password
        - Username - GitHub Username
        - Password - Generated Token Password from GitHub
        - ID - GitOps-token-GitHub
        - Description - GitOps-token-GitHub

## Create a new pipeline
### Pipeline
- Jenkins UI
- New Item
  - Name - GitOps
  - Description - GitOps
  - Pipeline - Pipeline script from SCM
    - Git
    - Repository URL - https://github_link
    - Credentials - GitOps-token-GitHub
    - Branch Specifier - */main
    - Scripth Path - Jenkinsfile
    - Pipeline Syntax
      - git: Git
      - Repository URL - https://github_link
      - Branch - main
      - Credentials - GitOps-token-GitHub
      - Generate Pipeline Script
    - Select and copy generated syntax
    - Copy it to Jenkinsfile in Github
      ```sh
      stage ('Checkout Github'){
        steps {
        GENERATED CODE FROM PIPELINE SYNTAX - git branch: 'main', credentialsId: 'GitOps-token-GitHub', url: 'https://github.com/Jozefcvik/Jenkins-ArgoCD-GitOps.git'
        }
      }    
      ```    
## Install NPM dependencies
### 1. Jenkins UI
- Node Plugin has been already installed (Jenkins UI - Manage Jenkins)
- Manage Jenkins
  - Tools
    - NodeJS
      - Name - NodeJS  
      - Install Automatically
      - Apply
      - Save
### 2. Change GitHub Jenkinsfile
```sh
pipeline {
    agent any
    tools {
            nodejs 'NodeJS'
    }
```
```sh
stage ('Install node dependencies'){
    steps {
            sh 'npm install'
    }
}
```
## Build Docker Image
### 1. Jenkins UI
- Docker Plugin has been already installed (Jenkins UI - Manage Jenkins)
- Manage Jenkins
  - Tools
    - Docker Installation
      - Name - Docker
      - Install automatically
        - Download from docker.com
        - Docker version - latest
        - Apply
        - Save
### 2. Generate Pipeline Syntax
#### Global Variable Reference (Menu on left Side)
  - check which command should be used for docker build
  - docker
     - build 
### 3. Change GitHub Jenkinsfile
  ```sh
  environment {
      DOCKER_HUB_REPO = 'jozefcvik/jenkinsargocdgitops'
  }
  ```
  ```sh
    stage('Build Docker Image'){
  			  steps {
  				      script {
  					        echo 'building docker...'
                    docker.build("${DOCKER_HUB_REPO}:latest")
  				      }
            }
  		}
  ```
## Scan Docker Image with Trivy
### 1. Trivy installation in the jenkins docker
```sh
docker exec -it jenkins /bin/bash
```
https://trivy.dev/v0.65/getting-started/installation/
  ```sh
  curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sudo sh -s -- -b /usr/local/bin v0.65.0
  ```
```sh
trivy -v
```

### 2. Change GitHub Jenkinsfile
```sh
stage('Trivy Scan'){
		  steps {
			      //sh 'trivy --severity HIGH,CRITICAL --no-progress image --format table -o trivy-scan-report.txt ${DOCKER_HUB_REPO}:latest'
			      sh 'trivy --severity HIGH,CRITICAL --skip-update --no-progress image --format table -o trivy-scan-report.txt ${DOCKER_HUB_REPO}:latest'
		  }
}
```



