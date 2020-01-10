import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import {LambdaStack} from '../lib/lambda-stack';
import {PipelineStack} from "../lib/pipeline-stack";

const accountId = '544126853651';
const region = 'us-west-2';
const instanceId = 'testdb';
const instanceARN = 'arn:aws:rds:us-west-2:544126853651:db:testdb';

const app = new cdk.App();
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    env: {
        account: accountId,
        region: region
    },
    instanceId: instanceId,
    instanceARN: instanceARN
});

new PipelineStack(app, 'PipelineStack', {
    env: {
        account: accountId,
        region: region
    },
    startUpLambdaCode: lambdaStack.startUpLambdaCode,
    shutDownLambdaCode: lambdaStack.shutDownLambdaCode,
});

app.synth();
