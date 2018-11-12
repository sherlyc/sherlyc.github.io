# Stuff Composer App

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
---
What things you need to install the software and how to install them

1. Install [nodejs](https://nodejs.org/en/download/) (LTS Recommended). 
2. Install [git](https://git-scm.com/downloads).
3. Editor we will be using [VSCode](https://code.visualstudio.com/download).
4. Development browser Chrome, firefox, Safari, IE Edge

## Installing
---
Fork the stuff reference architecutre repo
```
git clone git@bitbucket.org:fairfax/stuff-composer-app.git
```
Next install the dependencies
```
npm install
```
Run ```ng serve``` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.


## For server side rendering
---
Build the code using 
```
npm run build:ssr
```
And then run on the express server using 
```
npm run serve:ssr
```

## For development
---
It is mandatory to follow the guidelines from 
1. https://material.angular.io
2. https://github.com/angular/flex-layout/wiki
3. https://angular.io/guide/styleguide


### Compodoc
---
To run the compodoc and generate documentation
```
$ npm run compodoc
```
It will generate folder called "documentation" in the app-root.

## Test driven development
---
### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Running code-coverage
Run `ng test --watch=false --code-coverage` to execute code coverage tool. Further reading on [code coverage](https://en.wikipedia.org/wiki/Code_coverage) for why it is important in development.

### Pre Commit hook
---
When doing commit the hooks will run all the tests given below to ensure quality of code.
1. `ng lint` (Check the code style usign Codelyzer and tslint)
2. `ng test --watch=false` to ensure unit test are successful and which will also check the test coverage of 80%
```
thresholds: {
    statements: 80,
    lines: 80,
    branches: 80,
    functions: 80
  }
  // Commented in the codebase presently
```
3. `ng e2e` to test the end to end testing.



## Angular CLI commands 
---
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md). -->

## Authors

* **Abhisek Roy** 
