node {
        stage('Checkout SCM') {
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [],userRemoteConfigs: [[url: 'https://github.com/Qaroev/jenkins-app.git']]])

        }

        stage('Build dockerfile') {
         docker.build('temp/temp')
        }

        stage('Publish build-info') {
            sh 'docker create --name jenkinsapp temp/temp'
            sh 'docker cp jenkinsapp:./dist/build-latest.zip .'
            sh 'docker cp jenkinsapp:./coverage/index.html .'
            sh 'docker rm jenkinsapp --force'
            sh 'docker rmi temp/temp --force'
            sh 'curl -v --user ${'bobojon'}:${'bobojon123!'} -T build-latest.zip -X PUT "http://3.126.195.89:8081/artifactory/generic-local/bobojon/${BRANCH_NAME}/jenkinsapp.zip"'
        }

}
