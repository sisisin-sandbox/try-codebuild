# How to build

```
./zip-proj.sh
aws s3 cp MessageUtil.zip s3://codebuild-simenyan-input-bucket/
aws codebuild start-build --project-name codebuild-demo-project-simenyan
```

# How to setup infra

```
cd path/to/try-codebuild/infra
aws iam create-role --role-name SimenyanCodeBuildServiceRole --assume-role-policy-document file://create-role.json
aws iam put-role-policy --role-name SimenyanCodeBuildServiceRole --policy-name SimenyanCodeBuildServiceRolePolicy --policy-document file://put-role-policy.json
aws codebuild create-project --cli-input-json file://create-project.json
```


