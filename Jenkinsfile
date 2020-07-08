#!/usr/bin/env groovy

import java.security.MessageDigest;

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

GString agentDefinition() {
  return '''
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins/kube-default: true
    app: jenkins
    component: agent
spec:
  containers:
    - name: jnlp
      image: jenkinsci/jnlp-slave
      resources:
        limits:
          cpu: 1
          memory: 1Gi
        requests:
          cpu: 1
          memory: 1Gi
      imagePullPolicy: Always
    - name: node
      image: node:10.15.3-alpine
      command:
        - sh
      tty: true
    - name: dind
      image: docker:19-dind
      securityContext:
        privileged: true
      volumeMounts:
        - name: dind-storage
          mountPath: /var/lib/docker
  volumes:
    - name: dind-storage
      emptyDir: {}

'''
}

GString agentLabel() {
  return 'stuff-experience-frontend-' + MessageDigest.getInstance("MD5").digest(agentDefinition().bytes).encodeHex().toString()
}

pipeline {
  agent {
    kubernetes {
      cloud 'Practiv BUILD'
      label agentLabel()
      defaultContainer 'dind'
      instanceCap 4
      idleMinutes 120
      yaml agentDefinition()
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
    stage('smoke test chrome') {
      steps {
        container("dind") {
          script {
            sh '''
            echo "docker version"
            docker version

            echo "Run smoke test"
            docker run --rm --env DOCKER_URL=${DOCKER_URL} --env SPADE_VERSION=${SPADE_VERSION} --env USE_LOCAL_BROWSER="true" -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.25.0-rc4-alpine up --build --exit-code-from browserstack
            docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.25.0-rc4-alpine down
            '''
          }
        }
      }
    }
    stage('smoke test top browsers') {
      when {
        branch 'master'
      }
      steps {
        container("dind") {
          withCredentials([usernamePassword(credentialsId: "browserstack-account", usernameVariable: 'BS_ACCOUNT', passwordVariable: 'BS_KEY')]) {
            script {
              catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                  sh '''
                  echo "docker version"
                  docker version

                  echo "Run smoke test"
                  docker run --rm --env DOCKER_URL=${DOCKER_URL} --env SPADE_VERSION=${SPADE_VERSION} --env BS_ACCOUNT=${BS_ACCOUNT} --env BS_KEY=${BS_KEY} --env USE_LOCAL_BROWSER="false" -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.25.0-rc4-alpine up --build --exit-code-from browserstack
                  docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.25.0-rc4-alpine down
                  '''
              }
              echo currentBuild.result
            }
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
