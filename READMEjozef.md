## GITHUB - Generate API key for EC2 (clone GIT repo) in Github
- Login to Github
  - create Personal Acces tokens (Tokens Classic)
      - repo
      - admin
      - workflow
        
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


## ++++++++++++++++++++++++++++++++++++++++++++++++++
## INFOSSSS


## (Alternatively) Using ArgoCD CLI to Create New Application  
```sh
argocd app create my-app \
  --repo https://github.com/your-username/your-repo.git \
  --path manifest \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace argocd
```

## Create Environment Variables in GitHub
1. Click on the GitOps Repository and click on "Settings" 
2. Click on "Secrets and variables" and select "Actions"
3. Under Repository secrets, click on "New repository secret"
   
        Name: DOCKERHUB_USERNAME
        Secret: <dockerhub username>
        Add secret

        Name: DOCKERHUB_TOKEN
        Secret: <dockerhub token here>
        Add secret



