import cloudform, { CodeBuild, IAM, S3 } from 'cloudform';

export default cloudform({
  Description: 'try-codebuild-template',
  Resources: {
    CodeBuild: new CodeBuild.Project({
      Name: 'codebuild-demo-project-simenyan',
      Source: new CodeBuild.Project.Source({
        Type: 'GITHUB',
        Location: 'https://github.com/sisisin-sandbox/try-codebuild',
      }),
      Artifacts: new CodeBuild.Project.Artifacts({
        Type: 'S3',
        Location: 'codebuild-simenyan-output-bucket',
      }),
      Environment: new CodeBuild.Project.Environment({
        Type: 'LINUX_CONTAINER',
        Image: 'aws/codebuild/java:openjdk-8',
        ComputeType: 'BUILD_GENERAL1_SMALL',
      }),
      ServiceRole: 'arn:aws:iam::383466607609:role/SimenyanCodeBuildServiceRole',
      Triggers: new CodeBuild.Project.ProjectTriggers({ Webhook: true }),
    }),
    ArtifactPutRole: new IAM.Role({
      RoleName: 'SimenyanCodeBuildServiceRole',
      Policies: [
        new IAM.Role.Policy({
          PolicyName: 'SimenyanCodeBuildServiceRolePolicy',
          PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Sid: 'CloudWatchLogsPolicy',
                Effect: 'Allow',
                Action: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                Resource: ['*'],
              },
              {
                Sid: 'S3PutObjectPolicy',
                Effect: 'Allow',
                Action: ['s3:PutObject'],
                Resource: ['*'],
              },
            ],
          },
        }),
      ],
      AssumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: 'codebuild.amazonaws.com',
            },
            Action: 'sts:AssumeRole',
          },
        ],
      },
    }),
    ArtifactS3: new S3.Bucket({
      BucketName: 'codebuild-simenyan-output-bucket',
    }),
  },
});
