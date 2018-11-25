pipeline {
  agent {
    kubernetes {
      label 'Practiv BUILD'
      defaultContainer 'jnlp'
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

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '1'))
  }

  environment {
    PROJECT = "shared-218200"
    ARTIFACT_NAME = 'stuff-experience-frontend'
    IMAGE = "gcr.io/${PROJECT}/${ARTIFACT_NAME}"
    VERSION = "0.${env.BUILD_ID}"
  }

  triggers {
    pollSCM '*/1 * * * *'
  }

  stages {
     stage('Build and Publish Image') {
      when {
        anyOf {
          branch 'feature/*'
          branch 'master'
        }
      }
      steps {
        container('docker-client') {
          withCredentials([
            [$class: 'FileBinding', credentialsId: "gcr-service-account", variable: 'GCR_DOCKER_LOGIN'],
            string(credentialsId: 'kiwiops-ecr-token', variable: 'ECR_DOCKER_LOGIN')
          ]) {
            sh '''
            set +x
            sed -i "s,stuff-app-version,${VERSION}," src/app/app.component.html

            # login to ECR
            docker login -u AWS -p "${ECR_DOCKER_LOGIN}" https://513548267075.dkr.ecr.ap-southeast-2.amazonaws.com
            docker build -t ${IMAGE}:${VERSION} .

            # login to GCR
            docker login -u _json_key -p "$(cat ${GCR_DOCKER_LOGIN})" https://gcr.io
            docker push ${IMAGE}:${VERSION}
            '''
          }
        }
      }
    }
  }
}
