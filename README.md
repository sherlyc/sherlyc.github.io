# Stuff Experience Reference (Web)
Forked from https://bitbucket.org/fairfax/stuff-ref-frontend-architecture

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
---
What things you need to install the software and how to install them

1. Install [nodejs](https://nodejs.org/en/download/) (LTS Recommended). 
2. Install [git](https://git-scm.com/downloads).
3. Editor we will be using [VSCode](https://code.visualstudio.com/download).
4. Development browser Chrome, firefox, Safari, IE Edge
5. Chrome extension [Augury](https://augury.rangle.io/), [YSlow](http://yslow.org/)

## Frontend framework and tools
---
Below are the front end toolset and framework we will be using to start with and will evolve in future to adapt the fast changing technology approach or tools.


1. [Angular](https://angular.io/) (6+) / Angular CLI (JS Framework)
2. [SCSS](https://sass-lang.com/) for Styling (CSS Preprocessor)
3. [Angular Material](https://material.angular.io/) (Google Material Design Principle)
4. [Angular Flexlayout](https://github.com/angular/flex-layout/wiki) (Flexbox layout based grid)
5. [Jest](https://jestjs.io) (Unit testing)
6. [Protractor](http://www.protractortest.org/) (e2e Testing)
7. [Jest](https://jestjs.io) (Test runner)
8. [Webpack]() (Static Module Bundler)
9. [Node/npm]() (Build / Project dependency)
10. [Codelyzer](), [tslint](), [SonarQube](), [Prettier]() (Code style checker)
11. [Compodoc]() / [Asciidoctor.js]() (Code documentation)
12. [benchpress.js]() (Performance Testing)
13. [OWASP ZAP]() (Security Testing)
14. [Jenkins]() (Continuous Integration)
15. [Bitbucket](https://bitbucket.org) (Code repository / versioning)
16. [Husky](https://github.com/typicode/husky) (git hooks)


### Installing
---
A step by step series of examples that tell you how to get a development env running

After installing the prerequisites. We have to install the angular cli.

```
$ npm install -g @angular/cli
```
Once angular cli is installed we will be creating our project with scss and routing preconfigured.

```
$ ng new <project name> --style=scss --routing
```

Next we are going to add the angular material to our project

```
$ ng add @angular/material
```
And for the gesture support we have to add [HammerJS](http://hammerjs.github.io/)
```
$ npm install --save hammerjs
```
After installing we have to import it on our app's entry point. In the file "<b>src/main.ts</b>" add
```
import 'hammerjs';
```
Next we'll create a separate NgModule that imports all of the Angular Material components that we will use in your application. You can then include this module wherever you'd like to use the components.

```
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule],
  exports: [MatButtonModule, MatCheckboxModule],
})

export class StuffCustomMaterialModule { }
```
Then import the Angular Material modules after Angular's BrowserModule, as the import order matters for NgModules.

Next we need to add the Angular Flex Layout for the responsive layout implementation in mind. Refer to the [documentation](https://github.com/angular/flex-layout/wiki/Declarative-API-Overview) for implementation guidelines.
```
$ npm install @angular/flex-layout --save
```
This is what we need to install till now for the angular project to work for the development to start. We will try to run the project using 
```
$ ng serve --o
```
### Git setup
```
> git remote add origin git@bitbucket.org:fairfax/stuff-experience-frontend.git

> git add .
> git commit -m "Your Message"
> git push -u origin master
```
### Git pre-commit hook setup for linting and testing
We are going to use husky for that
```
$ npm install husky --save-dev
```

Next we have to add the configuration in package.json
```
//root/package.json
{
  "private": true,
  "devDependencies": {
    ...
  },
  "husky": {
    "hooks": {
      "pre-commit": "ng lint && ng test --watch=false && ng e2e"
    }
  }
}
```
### Compodoc
Compodoc is a documentation tool for Angular applications. It generates a static documentation of your application. Compodoc helps Angular developers providing a clear and helpful documentation of their application. Others developers of your team can easily understand the features of your application or library.

```
$ npm install --save-dev @compodoc/compodoc
```
Once installed define a script task for it in your package.json "scripts".
```
"compodoc": "./node_modules/.bin/compodoc -p src/tsconfig.app.json -w -s"
```
To run the compodoc and generate documentation
```
$ npm run compodoc
```
It will generate folder called "documentation" in the app-root.

## Defining a custom theme for material components
---
When you want more customization than a pre-built theme offers, you can create your own theme file.

### A custom theme file does two things:

* Imports the mat-core() sass mixin. This includes all common styles that are used by multiple components. This should only be included once in your application. If this mixin is included multiple times, your application will end up with multiple copies of these common styles.

* Defines a theme data structure as the composition of multiple palettes. This object can be created with either the mat-light-theme function or the mat-dark-theme function. The output of this function is then passed to the angular-material-theme mixin, which will output all of the corresponding styles for the theme.

A typical theme file will look something like this:

```
@import '~@angular/material/theming';

// Be sure that you only ever include this mixin once!
@include mat-core();

$stuff-app-primary: mat-palette($mat-indigo);
$stuff-app-accent:  mat-palette($mat-pink, A200, A100, A400);

$stuff-app-warn:    mat-palette($mat-red);

// Create the theme object (a Sass map containing all of the palettes).
$stuff-app-theme: mat-light-theme($stuff-app-primary, $stuff-app-accent, $stuff-app-warn);

// Include theme styles for core and each component used in your app.
@include angular-material-theme($stuff-app-theme);

```
Create that file under "src" and add that to the angular cli in the angular.json file.
```
"styles": [
  {
    "input": "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
  },
  "src/stuff-app-theme.scss",
  "src/styles.scss"
],
```
## Test driven development
---
### Running unit tests
Run `ng test` to execute the unit tests via [Jest](https://jestjs.io).

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

## Angular Universal
---
```
npm install --save @angular/platform-server @nguniversal/module-map-ngfactory-loader ts-loader @nguniversal/express-engine
```
### Build Angular universal
The Angular CLI compiles and bundles the universal app into two different folders, browser and server. Webpack transpiles the server.ts file into Javascript.
```
npm run build:ssr
```
### Serve the angular universal application
After building the application, start the server. 
```
npm run serve:ssr
```
Because a Universal platform-server app doesn't execute in the browser, you may have to work around some of the browser APIs and capabilities that are missing on the server.

You won't be able reference browser-only native objects such as window, document, navigator or location. If you don't need them on the server-rendered page, side-step them with conditional logic.

Alternatively, look for an injectable Angular abstraction over the object you need such as Location or Document; it may substitute adequately for the specific API that you're calling. If Angular doesn't provide it, you may be able to write your own abstraction that delegates to the browser API while in the browser and to a satisfactory alternative implementation while on the server.

## Sentry integration
```
npm install raven-js --save
```

### And coding style tests

TBD: Explain what these tests test and why

```
Give an example
```

## Deployment

TBD: Add additional notes about how to deploy this on a live system


## Contributing
[Frontend Ref Architecture slides](https://docs.google.com/presentation/d/1Ui8dTFkxaFZP09skZkHKwa5tX6EasZbUnsEa1lwpbQs/edit#slide=id.g420ba61905_1_63)

## Versioning
__Automated:__ 
Our Build process in our pipeline is responsible to git tag the minor version and push tags to remote. 
__Manually:__
 Do increase the version whenever you consider your code is a significant/breaking change. Use `npm version major -m "Upgrade to %s for reasons"`. 


## Angular CLI commands 
---
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md). -->
