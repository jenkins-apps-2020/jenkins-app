node{
    stage('Checkout SCM') {
  checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [ [$class: 'LocalBranch', localBranch: "**"]], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'github', url: 'https://github.com/Qaroev/jenkins-app.git']]])
    }

    stage('Build dockerfile') {
     docker.build('temp/temp')
    }

    stage('Publish build-info') {
     try {
        sh 'docker rm jenkinsapp --force'
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
