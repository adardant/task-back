pipeline {  //execute le pipeline sur le premier noeu jenkins dispo
  agent any  //exe le pipeline ou le stage sur nimp quel noeu jenkins dispo
  tools{
    nodejs 'default-nodejs'
  }
  stages{
    stage("install dependency"){
      steps{
        script{
          sh 'npm install'
        }
      }
    }
    stage("test"){
      steps{
        script{
          sh 'npm run test' // ou ng test ou npm test
        }
      }
    }
    stage("start"){
      steps{
        script{
          sh 'node app.js' // ou ng test ou npm test
        }
      }
    }
  }
}

