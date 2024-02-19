import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";


// Instantiate a new app
const app = new App();

// Create an instance from our DataStack
new DataStack(app, 'DataStack');
new LambdaStack(app, 'LambdaStack');