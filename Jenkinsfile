#!/usr/bin/env groovy
def getProjectName() {
  packageJson = readJSON file:'package.json'
  return packageJson.name
}

def String getDockerImageUrl() {
  readMavenPom = readMavenPom()

  dockerRegistry = "gcr.io/shared-218200"
  tagPrefix = "${readMavenPom.artifactId}:${SPADE_VERSION}"
  sh "echo $tagPrefix"

  return "${dockerRegistry}/nz.stuff/experience/${tagPrefix}"
}

def getLatestGitTag() {
  mavenPom = readMavenPom()
  majorVersion = mavenPom.version.split(".999")[0]
  tagPrefix = "${mavenPom.artifactId}-${majorVersion}"
  def mostRecentGitTag = sh (
    script: "git tag --list '${tagPrefix}.*' | sort  -t '.' -k1,1 -k2,2 -k3,3 -g | tail -n 1",
    returnStdout: true
  ).trim().tokenize('-').last()
  return mostRecentGitTag
}

def uploadKubernetesArtifacts() {
  practivImageForgeDinD() {
    // IMPORTANT: Only do this after you have incremented the git tag.
    latestGitTag = getLatestGitTag()
    echo "latestGitTag: ${latestGitTag}"
    updatePom(latestGitTag)
    mavenDeploy(latestGitTag)
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
            env.GIT_TAG = prepareVersion()
            env.SPADE_VERSION = "${GIT_TAG}".tokenize('-').last()
            env.DOCKER_URL = getDockerImageUrl()

            echo "project name: ${PROJECT_NAME}"
            echo "git tag: ${GIT_TAG}"
            echo "spade version: ${SPADE_VERSION}"
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
    stage('build image') {
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
            git tag -a -m'jenkins' ${GIT_TAG}
            git push https://${GIT_USERNAME}:${GIT_PASSWORD}@bitbucket.org/fairfax/${PROJECT_NAME}.git ${GIT_TAG}
            '''
          }
        }
      }
    }
  }
}

uploadKubernetesArtifacts()

buildCascade(["stuff-raster-spade"])
