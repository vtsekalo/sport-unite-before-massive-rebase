#!/usr/bin/env groovy
import org.jenkinsci.plugins.pipeline.modeldefinition.Utils
node {
  properties([
    pipelineTriggers([pollSCM('H/2 * * * *')]),
    [ $class: 'BuildDiscarderProperty',
      strategy: [
        $class: 'LogRotator',
        artifactDaysToKeepStr: '',
        artifactNumToKeepStr: '',
        daysToKeepStr: '',
        numToKeepStr: '10'
      ]
    ]
  ])
  application = 'FE-React-Platform'
  devBranch = 'develop'
  stage('Trigger dev') {
    echo "Triggering build of $application for branch $devBranch"
    build(
      job: "../build/be-frontend-build",
      parameters: [
        string(name: 'Application', value: application),
        string(name: 'Branch', value: devBranch),
        string(name: 'Version', value: 'SNAPSHOT'),
        string(name: 'Environment', value: 'dev'),
        booleanParam(name: 'Deploy', value: true)
      ]
    )
  }
}