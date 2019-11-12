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

def uploadKubernetesArtifacts() {
  practivImageForgeDinD() {
    def nextTag = prepareVersion()
    mavenDeploy(nextTag)
  }
}

pipeline {
  agent {
    kubernetes {
      cloud 'Practiv BUILD'
      defaultContainer 'dind'
      yamlFile 'experience-build.yaml'
    }
  }

  stages {
    stage('Prepare') {
      steps {
        container('jnlp') {
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
    stage('Build Image') {
      steps {
        container("dind") {
          script {
            sh '''
            echo "build image: ${DOCKER_URL}"
            docker build . -t ${DOCKER_URL} --build-arg spade_version=${SPADE_VERSION}
            '''
          }
        }
      }
    }
    stage('Smoke test') {
      steps {
        container("dind") {
          script {
            sh '''
            echo "docker version"
            docker version
            
            echo "Run smoke test"
            docker run --rm --env DOCKER_URL=${DOCKER_URL} -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.25.0-rc4-alpine up --build --exit-code-from puppet
            '''
          }
        }
      }
    }
    stage('Push Image To GCR') {
      when {
        branch 'master'
      }
      steps {
        container("dind") {
          withCredentials([string(credentialsId: "gcr-service-account", variable: 'DOCKER_LOGIN')]) {
            sh '''
            set +x
            docker login https://gcr.io -u _json_key -p "${DOCKER_LOGIN}"
            set -x
            docker push ${DOCKER_URL}
            '''
          }
        }
      }
    }
    stage('Push tag') {
      when {
        branch 'master'
      }
      steps {
        container("jnlp") {
          withCredentials([
            usernamePassword(credentialsId: "JenkinsOnFairfaxBitbucket", passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')
          ]) {
            sh '''
            git tag -a -m'jenkins' ${SPADE_VERSION}
            git push https://${GIT_USERNAME}:${GIT_PASSWORD}@bitbucket.org/fairfax/${PROJECT_NAME}.git ${SPADE_VERSION}
            '''
          }
        }
      }
    }
  }
}

uploadKubernetesArtifacts()

buildCascade(["stuff-raster-spade"])
