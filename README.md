# termin8_frontend

The front-end for the plant watering system. Made with love by Termin8

## Frameworks used

### React.js
A javascript framework made to build web-based user interfaces.

### Webpack
Used to transpire all the js, frameworks, html and css to deployable files.

### Babel
Compiles ES6.


### Materialize.js
A Css framework to easily generate som nice css and html code.

### Materialize-react.js
Free components for React in material design!


## Setting up the local environment

First of all, navigate to your preffered location and clone the repo:
```
git clone https://github.com/simenbkr/termin8_frontend.git
git checkout dev
```

For testing purposes,  setup the local REST API server simulator:
```
cd mock_REST_API
npm install -g json-server
cd plant-manager
json-server --port 4000 mockData.json
```

Open another terminal and navigate to the project. Start the front-end server:
```
cd termin8_frontend
cd front-end
npm install
npm start
```

The real front-end and a mock back-end is now running.



## Available scripts
```
npm run build
```
Genereates html, css and js to be deployed to the server.
The underlying frameworks used are Webpack and Babel
