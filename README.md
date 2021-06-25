# MINI PRROJECT CODE.ID BATCH#9

## This project is a isomorphic web app built using NodeJS with ExpressJS framework for the server side and ReactJS for the client side.

## To run this project after cloning, use yarn or npm to install all dependencies

### Use yarn start and the app will be started on the http://localhost:5000

---- 

### For the backend debugging use this config on the nodemon.json : 

{
    "verbose": false,
    "watch": [
      "./server"
    ],
    "exec" : "babel-node ./server/server.js"
},

### For the frontend debugging use this config on the nodemon.json : 

{
    "verbose": false,
    "watch": [
      "./server"
    ],
    "exec": "webpack --mode=development --config webpack.config.server.js && node ./dist/server.generated.js"
}