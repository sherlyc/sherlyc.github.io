#!/usr/bin/env groovy
def String getDockerImageUrl() {
  // Get project name, organisation group from package.json
  packageJson = readJSON file:'package.json'
  organisationGroup = packageJson.name.split('-')[1]
  projectName = packageJson.name
  env.PROJECT_NAME = projectName
  echo "organisationGroup : ${organisationGroup}, with projectName: ${projectName}"

  // Get Version(this version need to be the same as previous step: buildImage())
  readMavenPom = readMavenPom()
  contractVersion = readMavenPom.version.split(".999")[0]
  tagPrefix = "${readMavenPom.artifactId}-${contractVersion}"
  projectVersion = "${SPADE_VERSION}".tokenize('-').last()

  dockerRegistry = "gcr.io/shared-218200"
  return "${dockerRegistry}/nz.stuff/experience/${projectName}:${projectVersion}"
}

pipeline {
  agent {
    kubernetes {
      cloud 'Practiv BUILD'
      defaultContainer 'jnlp'
      yamlFile 'experience-build.yaml'
    }
  }

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
    ansiColor('xterm')
    lock(resource: env.JOB_NAME.split('/')[1], inversePrecedence: true)
    timeout(30)
  }

  stages {
    stage('Prepare') {
      steps {
        container('practiv-maven') {
          checkoutWithTags()
          script {
            env.SPADE_VERSION = "stuff-${prepareVersion()}"
            env.DOCKER_URL = getDockerImageUrl()
            echo "git tag: ${SPADE_VERSION}"
            echo "docker url: ${DOCKER_URL}"
          }
        }
      }
    }
    stage('Install') {
      when {
        branch 'master'
      }
      steps {
        container('node') {
          script {
            sh '''
            npm ci
            '''
          }
        }
      }
    }
    stage('Test') {
      when {
        branch 'master'
      }
      steps {
        container('node') {
          script {
            sh '''
            npm run test
            npm run integration-test
            '''
          }
        }
      }
    }
    stage('Push image and Tag') {
//      when {
//        branch 'master'
//      }
      steps {
        container('practiv-maven') {
          withCredentials([string(credentialsId: "gcr-service-account", variable: 'DOCKER_LOGIN'),
          usernamePassword(credentialsId: "JenkinsOnFairfaxBitbucket", passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')
          ]) {
            script {
              sh '''
              git tag -a -m'jenkins' ${SPADE_VERSION}
              set +x
              docker login https://gcr.io -u _json_key -p "${DOCKER_LOGIN}"
              set -x
              echo "build image: ${DOCKER_URL}"
              docker build . -t ${DOCKER_URL} --build-arg spade_version=${SPADE_VERSION}
              docker push ${DOCKER_URL}
              git push https://${GIT_USERNAME}:${GIT_PASSWORD}@bitbucket.org/fairfax/${PROJECT_NAME}.git ${SPADE_VERSION}
              '''
            }
          }
        }
        configFileProvider([configFile(fileId: 'maven-settings-for-stuff', targetLocation: 'maven/settings.xml')]) {
          mavenDeploy()
        }
      }
    }
  }
}
buildCascade(["stuff-raster-spade"])
