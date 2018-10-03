# Stuff Frontend Reference Architecture (Web)

The key principle of this implementation is to provide a simple, standardised implementation strategies. The approach is to make the foundation robust and future complexity proof with scalability as one our main concern. The architecture is focused to implement CI/CD for faster development and deployment cycle with automated testing.

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
5. [Jasmine]() (Unit testing)
6. [Protractor](http://www.protractortest.org/) (e2e Testing)
7. [Karma](https://karma-runner.github.io) (Test runner)
8. [Webpack]() (Static Module Bundler)
9. [Node/npm]() (Build / Project dependency)
10. [Codelyzer](), [tslint](), [SonarQube](), [Prettier]() (Code style checker)
11. [Compodoc]() / [Asciidoctor.js]() (Code documentation)
12. [benchpress.js]() (Performance Testing)
13. [OWASP ZAP]() (Security Testing)
14. [Jenkins]() (Continuous Integration)
15. [Bitbucket]() (Code repository / versioning)
16. [Husky]() (git hooks)


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
npm install @angular/flex-layout --save
```
This is what we need to install till now for the angular project to work for the development to start. We will try to run the project using 
```
ng serve --o
```
### Git setup
```
> git remote add origin git@bitbucket.org:fairfax/stuff-ref-frontend-architecture.git

> git add .
> git commit -m "Your Message"
> git push -u origin master
```


<!-- ## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc






















# StuffRefFrontendArchitecture

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

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
