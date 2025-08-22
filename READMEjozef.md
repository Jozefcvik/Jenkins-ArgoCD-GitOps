### Create EC2 Instance & Set up Environment

Login to EC2 instance


### Generate API key for EC2 (clone GIT repo) in Github
- Login to Github
  - create Personal Acces tokens (Tokens Classic)
      - repo
      - admin
      - workflow


### Log in to Ubuntu EC2 Instance:
```sh
ssh -i /home/paacyber/Downloads/<keypair.pem> ubuntu@PublicIP
```


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



