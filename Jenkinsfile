#!/usr/bin/env groovy
import org.apache.maven.model.Model
def String getDockerImageUrl() {
  // Get project name, organisation group from package.json
  packageJson = readJSON file:'package.json'
  organisationGroup = packageJson.name.split('-')[1]
  projectName = packageJson.name
  echo "organisationGroup : ${organisationGroup}, with projectName: ${projectName}"

  // Get Version(this version need to be the same as previous step: buildImage())
  readMavenPom = readMavenPom()
  contractVersion = readMavenPom.version.split(".999")[0]
  tagPrefix = "${readMavenPom.artifactId}-${contractVersion}"
  projectVersion = getProjectVersion()
  echo "derivedTag: ${derivedTag}, and project verion: ${projectVersion}"

  dockerRegistry = "gcr.io/shared-218200"
  return "${dockerRegistry}/nz.stuff/${organisationGroup}/${projectName}:${projectVersion}"
}

def String getProjectVersion() {
  // Get Last Git Tag
  derivedTag = sh (
    script: "git tag --list '${tagPrefix}.*' | sort  -t '.' -k1,1 -k2,2 -k3,3 -g | tail -n 1",
    returnStdout: true
  ).trim()
  echo "derivedTag: ${derivedTag}"
  projectVersion = derivedTag.tokenize('-').last()
  return projectVersion
}
buildImage()
pipeline {
  agent {
    kubernetes {
      cloud 'Practiv BUILD'
      defaultContainer 'dind'
      yamlFile 'experience-build.yaml'
    }
  }

  stages {
    stage('Prepare'){
      when {
        branch 'master'
      }
      steps {
        container('jnlp') {
          checkoutWithTags()
          script {
            env.DOCKER_URL = getDockerImageUrl()
            env.SPADE_VERSION = getProjectVersion()
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
          withCredentials([
            string(credentialsId: "gcr-service-account", variable: 'DOCKER_LOGIN'),
          ]) {
            sh '''
            set +x
            docker login https://gcr.io -u _json_key -p "${DOCKER_LOGIN}"
            set -x
            echo "build image: ${DOCKER_URL}"
            docker build . -t ${DOCKER_URL} --build-arg spade_version=${SPADE_VERSION}
            docker push ${DOCKER_URL}
            '''
          }
        }
      }
    }
  }
}
buildCascade(["stuff-raster-spade"])
