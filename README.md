# Job-Portal

## About
This is a Web application based on MERN stack - MongoDB, Express.js, React.js, and Node.js. It is basically a webapp where users can apply for job and recruiters can recurit people.


## Requirements:

-   NodeJS
-   ReactJS
-   ExpressJS
-   MongoDB

## Running the program

### Node

-   sudo apt-get update
-   sudo apt-get install nodejs
-   sudo apt-get install npm

### MongoDB

-   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
-   echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
-   sudo apt-get update
-   sudo apt-get install -y mongodb-org
-   sudo systemctl start mongod
-   sudo systemctl status mongod
-   sudo systemctl enable mongod

### React

-   npm install -g create-react-app

### Express

-   npm i express

## Running the code

Run Express:

```
cd backend/
npm install
nodemon start
```

Run React:

```
cd fronted/
npm install/
npm start
```

---
