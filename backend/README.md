# Backend Setup Guide

## Testing Changes on Feature Branches

Before merging changes into the main branch, follow these steps to ensure your feature branch is up to date.
**Important**: *Always check whether your branch is up to date with the main branch*:  
```bash
git status
```

**Important**: *Always check which branch you are currently on before making any pushes or pulls*:  
```bash
git branch
```

### Checkout to a Feature Branch

To switch from the main branch to your local version of the remote feature branch, run:  
```bash
git checkout -b [name-of-the-feature-branch] origin/[name-of-the-feature-branch]
```  
> **Tip**: Make sure to specify the remote branch with `origin/[branch-name]` when checking out a new feature branch.

### Pull Latest Changes

To fetch the latest updates from the remote feature branch, execute:  
```bash
git pull origin [name-of-the-feature-branch]
```

---

## Install Required Packages

To install any new packages that might have been added to the project, use:  
```bash
npm install
```

---

## Setting Up the `.env` File

Create a `.env` file in the root directory of your backend project and include the following MongoDB Atlas URI and port variables:  
```bash
ATLAS_URI=yourmongodbatlasuri
PORT=5050
```

---

## Running the Server

### Start the Server

To launch the server, execute the following command:  
```bash
npm start
```  
After starting, you should see confirmation messages indicating that the server is running. You can then open the server URL in your browser:  
[http://localhost:5050/](http://localhost:3000/)

### Accessing Routes

To access various routes, append them to the server URL as follows:  
- [http://localhost:5050/user-route](http://localhost:3000/user-route)  
- [http://localhost:5050/user-route/signup](http://localhost:5050/user-route/signup)

### Understanding Endpoints

- The **root endpoint** (`/`) supports `GET` requests and displays a message in your browser.
- The `/user-route` and `/user-route/signup` endpoints support `POST` requests, allowing you to submit data that is stored in a MongoDB cluster.

### Interacting with the Backend

You can use **Postman** to send requests to your backend. Alternatively, for a command-line option, use the **cURL** tool available in your Linux terminal (or WSL).

To send a `POST` request to the `/user-route/signup` endpoint, run the following command:  
```bash
curl -X POST http://localhost:5050/user-route/signup \
     -H "Content-Type: application/json" \
     -d '{
         "name": "student",
         "email": "student123@example.com",
         "password": "1223334444",
         "confirmPassword": "1223334444"
         "isStudent": true
     }'
```  
> **Note**: Feel free to modify the values in the request body as needed.

### Checking the Response

If your request is successful, you will see the MongoDB version logged in your terminal, confirming that the signup functionality is working correctly.
