pipeline {
    agent any
    tools {
        maven 'MAVEN_HOME'
    }
    stages {
        stage('Git Clone & Clean') {
            steps {
                echo "=== Cleaning workspace and cloning repository ==="
                // Remove old project folder if exists
                bat 'rmdir /s /q MavenJavenProject || exit 0'
                // Clone repo
                bat 'git clone https://github.com/Sandeepsagar-7/MavenJavenProject.git'
                // Clean Maven project
                bat 'mvn clean -f MavenJavenProject/pom.xml'
            }
        }
        stage('Install') {
            steps {
                echo "=== Installing dependencies ==="
                bat 'mvn install -f MavenJavenProject/pom.xml -B'
            }
        }
        stage('Test') {
            steps {
                echo "=== Running tests ==="
                bat 'mvn test -f MavenJavenProject/pom.xml -B'
            }
        }
        stage('Package') {
            steps {
                echo "=== Packaging application ==="
                bat 'mvn package -f MavenJavenProject/pom.xml -B'
            }
        }
        stage('Archive Artifact') {
            steps {
                echo "=== Archiving generated artifacts ==="
                archiveArtifacts artifacts: 'MavenJavenProject/target/*.jar', fingerprint: true
            }
        }
    }
    post {
        always {
            echo "=== Pipeline finished ==="
        }
    }
}
