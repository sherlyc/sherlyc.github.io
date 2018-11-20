pipeline {
  agent {
    kubernetes {
      label 'mypod'
      defaultContainer 'gradle'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    some-label: some-label-value
spec:
  containers:
  - name: docker-client
    image: docker
    env:
    - name: DOCKER_HOST
      value: 'tcp://localhost:2375'
    command:
    - cat
    tty: true
  - name: docker
    image: docker:dind
    tty: true
    securityContext:
      privileged: true
"""
    }
  }

  environment {
        PROJECT = "shared-218200"
        ARTIFACT_NAME = 'stuff-reference-frontend'
        IMAGE = "gcr.io/${PROJECT}/${ARTIFACT_NAME}"
        VERSION = "0.${env.BUILD_ID}"
    }
  stages {

     stage('Build and Publish Image') {
      when {
        anyOf {
          branch 'CON-93-ci-cd'
        }
      }
      steps {
        container('docker-client') {
          withCredentials([[$class: 'FileBinding', credentialsId: "gcr-service-account", variable: 'DOCKER_LOGIN']]) {
            sh '''
            docker build -t ${IMAGE}:${VERSION} .
            docker login -u _json_key -p "$(cat ${DOCKER_LOGIN})" https://gcr.io
            docker push ${IMAGE}:${VERSION}
            '''
          }
        }
      }
    }
  }
}
