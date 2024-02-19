import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";


// Instantiate a new app
const app = new App();

// Create an instance from our DataStack
new DataStack(app, 'DataStack');