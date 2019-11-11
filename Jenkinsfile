#!/usr/bin/env groovy
import java.security.MessageDigest

GString yamlString() {
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
    - name: practiv-maven
      command:
        - cat
      image: docker.ci.shift21.ffx.nz/io.practiv/build/practiv-build-maven-seeded:3.2
      imagePullPolicy: IfNotPresent
      env:
        - name: QT_QPA_PLATFORM
          value: offscreen
        - name: DOCKER_HOST
          value: tcp://localhost:2375
      securityContext:
        runAsUser: 10000
        fsGroup: 10000
      resources:
        limits:
          cpu: 2
          memory: 4Gi
        requests:
          cpu: 250m
          memory: 1Gi
      tty: true
    - name: docker-client
      image: docker:18.06.0-ce
      env:
        - name: DOCKER_HOST
          value: 'tcp://localhost:2375'
      resources:
        requests:
          cpu: 100m
          memory: 512Mi
      command:
        - cat
      tty: true
    - name: dind-daemon
      image: docker:18.06.0-ce-dind
      resources:
        requests:
          cpu: 100m
          memory: 512Mi
      securityContext:
        privileged: true
      volumeMounts:
        - name: dind-storage
          mountPath: /var/lib/docker
  dnsPolicy: ClusterFirst
  imagePullSecrets:
    - name: docker.ci.shift21.ffx.nz
  restartPolicy: Never
  securityContext: {}
  terminationGracePeriodSeconds: 30
  volumes:
    - name: dind-storage
      emptyDir: {}
'''
}
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

GString yamlHash() {
  return MessageDigest.getInstance("MD5").digest(yamlString().bytes).encodeHex().toString()
}

pipeline {
  agent {
    kubernetes {
      cloud 'Practiv BUILD'
      defaultContainer 'jnlp'
      label yamlHash()
      yaml yamlString()
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
    stage("pre-prepare") {
      steps {
        script {
          System.setProperty("org.jenkinsci.plugins.durabletask.BourneShellScript.LAUNCH_DIAGNOSTICS", true);
        }
      }
    }
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
