# How to setup infra

## Create project

```console
cd path/to/try-codebuild/infra
aws iam create-role --role-name SimenyanCodeBuildServiceRole --assume-role-policy-document file://create-role.json
aws iam put-role-policy --role-name SimenyanCodeBuildServiceRole --policy-name SimenyanCodeBuildServiceRolePolicy --policy-document file://put-role-policy.json
aws codebuild create-project --cli-input-json file://create-project.json
aws codebuild create-webhook --cli-input-json file://create-webhook.json
```

## Update project

```console
cd path/to/try-codebuild/infra
aws iam put-role-policy --role-name SimenyanCodeBuildServiceRole --policy-name SimenyanCodeBuildServiceRolePolicy --policy-document file://put-role-policy.json
aws codebuild update-project --cli-input-json file://create-project.json
aws codebuild update-webhook --cli-input-json file://create-webhook.json
```