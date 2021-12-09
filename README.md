# Project Wise Issue Tracker - WIT

Project WIT is an issue tracking and Kanban board application. 
It is designed to work in tandem with the AWS infrastructure deployed via: https://github.com/kasenfoy/project-wit-cdk

This project utilizes Typescript and React to power the Single Page Web Application. It interfaces directly with DynamoDB as a data store for all application data. 

For ```SDEV-435``` class members you may use the default (dev) setup to build/run locally. Simply clone this package and run the command ```npm run start``` from the command line. Please note that you will see all other users data when using this setup. If you wish to deploy your own instance for private use/data you can see the CDK infrastructure and configuration setup here: https://github.com/kasenfoy/project-wit-cdk. 

For running just this React application and using the default configuration you will need Node.js (v14.17.6) https://nodejs.org/en/download/ installed and npm (v6.14.15) installed to get started. Run ```npm install``` to install the projects dependencies.
For private developer setup you will need to deploy the CDK code using the instructions found here: https://github.com/kasenfoy/project-wit-cdk/blob/mainline/README.md 
For private setup please change the "configuration" https://github.com/kasenfoy/ProjectWit/blob/mainline/src/lib/constants.ts file to represent the ```outputs``` from your CDK deployment.  

# TL;DR Setup
1. Install Node.JS (>= v14.17.6)
2. Install NPM (>= v6.14.15)
3. Clone this repository:
   1. ```git clone https://github.com/kasenfoy/ProjectWit.git```
4. ```cd ProjectWit```
5. Run ```npm install```
6. Run ```npm run start```
7. Visit https://localhost:3000 

# 
Below is the default React Developer setup README entries. 

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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
