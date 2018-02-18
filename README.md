kubernetes-multicontainer-pod Node.js on GCP Kubernetes
===============================================================

You can run these steps in Kubernetes GCP free-tier.
[TODO Purpose]
[TODO Image]

### Step 1: Test nodejs-express-api locally
Open one terminal window to start the server.
```bash
cd nodejs-express-api
node server.js
curl http://localhost:8080/hello -H 'Skip-Backend: true'
```
Response:
```
Hello world-API
```
Note `Skip-Backend` header will skip call to the backend.

### Step 2: Test nodejs-express-backend locally
Open another terminal window to start the server. And execute the following commands:

```bash
cd nodejs-express-backend
node server.js
curl http://localhost:8081
```
Response:
```
Hello world-backend 
```

### Step 3: Test nodejs-api calling nodejs-backend

Execute
```bash
curl http://localhost:8080/hello
```
Response:
```
Hello world-backend
```
**Note that response includes `-backend` word in it. Therefore, nodejs-api is serving as api proxy to nodejs-express-backend.**

In the next steps we will deploy a multicontainer pod with these two apps.

### Step 4: Login to console.cloud.google.com start CloudShell
Create a cluster of 3 VMs f1-micro. We will only small nodes to run tiny our two tiny nodejs-api and nodejs-backend services.

```
gcloud container clusters create multi-container-pod --num-nodes=3 --machine-type=f1-micro --zone=us-west1-a
```

