import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";


// Instantiate a new app
const app = new App();

// Create an instance from our DataStack
const dataStack = new DataStack(app, 'DataStack');

// The datastack defines a DynamoDB table that gets passed to the Lambda
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    spacesTable: dataStack.spacesTable
});

// The lambda defines a LambdaIntegration that gets passed to the API gateway
new ApiStack(app, 'ApiStack', {
    spacesLambdaIntegration: lambdaStack.spacesLambdaIntegration
})