pipeline {
     triggers{
         githubPush()
       }
     environment {
              MYTOOL_VERSION = '2.0.0'
     }
    agent {
       label 'ubuntu_164_agent'
    }
    stages {
       stage('Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [ [$class: 'LocalBranch', localBranch: "**"]], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'github', url: 'https://github.com/Qaroev/jenkins-app.git']]])
               }
            }
        }
        stage('Build Jenkinsapp UI') {
            steps {
                script {
                    docker.build('temp/temp')
                }
            }
        }
        stages {
                stage("test") {
                    steps {
                        parallel (
                            "Firefox" : {
                                sh "echo testing FFX"
                                sh "echo more steps"
                            },
                            "Chrome" : {
                                sh "echo testing Chrome"
                                sh "echo more steps"
                            }
                        }
                    )
                }
            }
       }
        stage('Publish and remove docker images') {
            steps {
                script {
                     try {
                            sh 'docker rm jenkinsapp${BUILD_NUMBER} --force'
                         } catch (exc) {

                         }
                            sh 'printenv | sort'
                            sh 'docker create --name jenkinsapp${BUILD_NUMBER} temp/temp'
                            sh 'docker cp jenkinsapp${BUILD_NUMBER}:./ng-app/dist/build-latest.zip .'
                            sh 'docker rm jenkinsapp${BUILD_NUMBER} --force'
                            sh 'docker rmi temp/temp --force'
                            sh 'curl -v --user bobojon:bobojon123! -T build-latest.zip -X PUT "http://3.126.195.89:8081/artifactory/generic-local/bobojon/${BRANCH_NAME}/jenkinsapp-${MYTOOL_VERSION}.${BUILD_NUMBER}.zip"'

                }
            }

        }
    }
}
