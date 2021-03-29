# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Code information

index.js - This is the main entry point of the app.
App.js - This component renders Route Component
Routes.js - This component renders and displays Routes, Departures and Stops based on the selections
departureList.js - This component renders respective departure details from the route, direction, stop selections.
App.test.js - This contains all tests using React Testing library.
fetchData - This contains method to fetch the data through Axios.
