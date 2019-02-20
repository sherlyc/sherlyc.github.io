# SPADE - Stuff Platform Agnostic Driven Experience

Forked from https://bitbucket.org/fairfax/stuff-ref-frontend-architecture

## Prerequisites

---

What things you need to install the software and how to install them

1. Install [nodejs](https://nodejs.org/en/download/) (LTS Recommended).
2. Install [git](https://git-scm.com/downloads).
3. Development browser Chrome, firefox, Safari, IE Edge

## Test driven development

---

### guidelines

[Follow these guidelines when writing your tests](https://stuffnz.atlassian.net/wiki/spaces/DE/pages/659619848/SPADE+-+Test+pyramid)

---

### Running Tests

It is strongly recommended to use Intellij Jest testing feature to keep these tests continuously running.

- Running angular unit test, api unit tests and api tests

`npm test` or `npm run test`

- Running unit tests for the frontend - Angular

`npm run test:app`

- Running unit tests for the backend - Node/ExpressJs

`npm run test:server`

- Running api tests for the backend

`npm run test:api`

- Running end-to-end tests with Selenium

`npm run e2e`

### Pre Commit hook

When committing changes the hooks some test will run to ensure quality of code.
E2e test are run when pushing changes to remote as part of a commit hook.

## Production Build and Running

- Build Angular universal in production mode

The Angular CLI compiles and bundles the universal app into two different folders, browser and server.

```
npm run build
```

- Serve the angular universal application in production mode

After building the application, start the server.

```
npm run start
```

Because a Universal platform-server app doesn't execute in the browser, you may have to work around some of the browser APIs and capabilities that are missing on the server.

You won't be able reference browser-only native objects such as window, document, navigator or location. If you don't need them on the server-rendered page, side-step them with conditional logic.

Alternatively, look for an injectable Angular abstraction over the object you need such as Location or Document; it may substitute adequately for the specific API that you're calling. If Angular doesn't provide it, you may be able to write your own abstraction that delegates to the browser API while in the browser and to a satisfactory alternative implementation while on the server.

## Development Build and Running

- Serve the angular universal application in development mode

```
npm run dev
```

This command should be ok for daily development.

The following commands can be used as well:

- `npm run dev:build` build universal application in development mode
- `npm run dev:build:browser` _watch_ build browser Angular application only
- `npm run dev:build:server` _watch_ build browser Server application only
- `npm run dev:serve` _watch_ serve the universal application

## Deployment

TBD: Add additional notes about how to deploy this on a live system

## Contributing

[Contribution guidelines](https://stuffnz.atlassian.net/wiki/spaces/DE/pages/653230081/Experience+Frontend+Contribution)

## Versioning

**Automated:**
Our Build process in our pipeline is responsible to git tag the minor version and push tags to remote.
**Manually:**
Do increase the version whenever you consider your code is a significant/breaking change. Use `npm version major -m "Upgrade to %s for reasons"`.

## Angular CLI commands

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md). -->
