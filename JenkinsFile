pipeline {
  agent any

  environment {
        DOCKER_LOGIN = credentials('gcr-service-account')
        PROJECT = "shared-218200"
        ARTIFACT_NAME = 'stuff-reference-frontend'
        IMAGE = "gcr.io/${PROJECT}/${ARTIFACT_NAME}"
        VERSION = "0.${env.BUILD_ID}"
    }

   stage('Build and Publish Image') {
        when {
            anyOf {
                branch 'CON-93-ci-cd'
            }
        }
        steps {
            container('gradle') {
              sh '''
                      docker build -t ${IMAGE}:${VERSION} --file application/Dockerfile application/
                      docker login -u _json_key -p "$(cat ${DOCKER_LOGIN})" https://gcr.io
                      docker push ${IMAGE}:${VERSION}
                  '''
            }
        }
   }
}
