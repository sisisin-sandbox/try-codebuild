# How to setup infra

## Create project

```console
cd path/to/try-codebuild/infra
aws cloudformation create-stack --capabilities CAPABILITY_NAMED_IAM --stack-name SimenyanTryCodebuildStack --template-body "$(npx cloudform index.ts)"
```

## Update project

```console
cd path/to/try-codebuild/infra
aws cloudformation update-stack --capabilities CAPABILITY_NAMED_IAM --stack-name SimenyanTryCodebuildStack --template-body "$(npx cloudform index.ts)"
```
