# Project Title

## Overview

This project consists of two main parts: the API and the App.

The API is located in the `api` directory and is responsible for handling all backend operations. It is built using Node.js and connects to a MySQL database.

The App is located in the `app` directory and is a React application responsible for the frontend.

It's a simple application that allows users to vote for all type of elections.

## Getting Started

Using kubernetes, we can deploy the API and the App in a cluster. The deployments files will create a pod for each one of them and a service to expose them. The deployment files are located in the `api` and `app` directories. The app uses Dockerfiles to build the images and the kubernetes deployment files to deploy them.

```bash
minikube start
cd api
kubectl apply -f mysql-deployment.yaml
```

Wait for the mysql pod to be ready and then we can apply the deployment for the backend.
If you want, you can build the docker image locally and push it to your docker registry.

```bash
docker build . -t <your-registry>/backend:1.0
docker push <your-registry>/backend:1.0
```

But i already pushed the image to my docker registry, so you can just apply the deployment.

```bash
kubectl apply -f node-app-deployment.yaml
```

Now, you can access the API is up and running at port 5000 in your minikube cluster.
The next step is to deploy the frontend.
You can also build the docker image locally and push it to your docker registry if you want.

```bash
cd ../app
kubectl apply -f front-app-deployment.yaml
```

Now, you can access the App is up and running at port 3000 in your minikube cluster.
Finally, you can access the app in your browser at http://localhost:3000 with a tunnel.

```bash
minikube tunnel
```
