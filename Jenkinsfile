#!/usr/bin/env groovy
def getProjectName() {
  packageJson = readJSON file:'package.json'
  return packageJson.name
}

def String getDockerImageUrl() {
  readMavenPom = readMavenPom()

  dockerRegistry = "gcr.io/shared-218200"
  projectVersion = "${SPADE_VERSION}".tokenize('-').last()
  tagPrefix = "${readMavenPom.artifactId}-${projectVersion}"

  return "${dockerRegistry}/nz.stuff/experience/${tagPrefix}"
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
    stage('setup env') {
      steps {
        container('jnlp') {
          checkoutWithTags()
          script {
            env.PROJECT_NAME = getProjectName()
            env.SPADE_VERSION = prepareVersion()
            env.DOCKER_URL = getDockerImageUrl()
            echo "git tag: ${SPADE_VERSION}"
            echo "docker url: ${DOCKER_URL}"
          }
        }
      }
    }
    stage('install') {
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
    stage('test') {
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
    stage('build Image') {
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
    stage('smoke test') {
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
    stage('push image to GCR') {
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
    stage('push tag') {
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
