# MINI PROJECT CODE.ID BATCH#9

## This project is a isomorphic web app built using NodeJS with ExpressJS framework for the server side and ReactJS for the client side.

## To run this project after cloning, use yarn or npm to install all dependencies
### You can check all the dependencies needed on the package.json file

### Use yarn start and the app will be started on the 'http://localhost:5000/mini-project'

---- 

### For running only the backend server use this config on the nodemon.json : 

{
    "verbose": false,
    "watch": [
      "./server"
    ],
    "exec" : "babel-node ./server/server.js"
},

### And use express.js file on the server.js file import

### For running the frontend and backend of the app use this config on the nodemon.json : 

{
    "verbose": false,
    "watch": [
      "./server"
    ],
    "exec": "webpack --mode=development --config webpack.config.server.js && node ./dist/server.generated.js"
}

### And use express-fullstack.js file on the server.js file import