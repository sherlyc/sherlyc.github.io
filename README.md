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

- Running performance tests - login into our GCP Nexus `docker login docker.ci.shift21.ffx.nz` and then

`npm run test:performance` - [performance tool used](https://bitbucket.org/fairfax/stuff-yokohama-autocannon/src/master/)

- Running end-to-end tests with Selenium

local Chrome browser `npm run e2e`. To run in multiple browsers in parallel by using Browserstack export `BS_ACCOUNT` and `BS_KEY` env variables then run
 `npm run test:e2e`

You can also test individual browsers. In a terminal run `npm run start:no-newrelic` and in other terminal run `npm run e2e:android`.

### CLINIC - Performance Insight Tools

If there is a problem with the autocannon test in the pipeline. Run these set of Clinic tools to get further diagnostic reports.

[Doctor](https://clinicjs.org/doctor/)

`npm run clinic:doctor`

`npm run clinic:doctor:backend`

[Flame](https://clinicjs.org/flame/)

`npm run clinic:flame`

`npm run clinic:flame:backend`

[Bubbleprof](https://clinicjs.org/bubbleprof/)

`npm run clinic:bubbleprof`

`npm run clinic:bubbleprof:backend`

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

This command should be ok for daily development, then you can access http://localhost:4000 or proxy https://localhost:3000.

The following commands can be used as well:

- `npm run dev:build` build universal application in development mode
- `npm run dev:build:browser` _watch_ build browser Angular application only
- `npm run dev:build:server` _watch_ build server (Angular SSR + API) only
- `npm run dev:serve` _watch_ serve the universal application listening on 4000
- `npm run dev:proxy` proxy SPADE and SICS/CQ listening on 3000

## Deployment

TBD: Add additional notes about how to deploy this on a live system

## Login Library

The login library utilised is [StuffLoginSdk](https://stuffnz.atlassian.net/wiki/spaces/MEM/pages/702971995/Stuff+Login+Browser+SDK+-+V1.2.0)

## Contributing

[Contribution guidelines](https://stuffnz.atlassian.net/wiki/spaces/DE/pages/653230081/Experience+Frontend+Contribution)

## Versioning

**Automated:**
Our Build process in our pipeline is responsible to git tag the minor version and push tags to remote.
**Manually:**
Do increase the version whenever you consider your code is a significant/breaking change. Use `npm version major -m "Upgrade to %s for reasons"`.

## Angular CLI commands

---

## Running Jenkins build pipeline locally

- Install branchout as per [Shift-21 instructions](https://bitbucket.org/fairfax/stuff-shift21/src)
- Then set up maven to use Nexus [Shift-21_maven-via-nexus](https://bitbucket.org/fairfax/stuff-shift21/src/48036a95708a7b3e1b84cf41f1043dadd3edfc0d/docs/maven-via-nexus.md)
- You will need your nexus credentials (kindly ask kiwiops)
- login to docker `docker login https://nexus.ci.shift21.ffx.nz/` and `docker login https://docker-upload.ci.shift21.ffx.nz`
- Finally, on the root of the project run `branchout maven cv`

## Health Checks

Health checks can be queried at the endpoints `/health/light` which simply returns a 200 OK
and `/health/full` that checks the upstream systems Spade consumes data from and if all reply 200 then the response
will be 200 too.
