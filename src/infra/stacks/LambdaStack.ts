
import {Stack, StackProps} from 'aws-cdk-lib'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs/lib/construct'
import { join } from 'path'



// Extend the stack property interface so that we can pass the Dynamo table name to the lambda
interface LambdaStackProps extends StackProps {
    spacesTable: ITable
}

// Define a new Stack
// Note that the "export" keyword makes the class availble to classes in other modules
export class LambdaStack extends Stack {

    //LambdaIntegration is used to integrate an AWS Lambda function to an API Gateway method.
    public readonly spacesLambdaIntegration: LambdaIntegration

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)

        // Note that the connection between the lambda and its functionality is done in the handler and entry fields
        // Note how the handler can also use the environment variable we define here like the TABLE_NAME
        const spacesLambda = new NodejsFunction(this, 'SpacesLambda', {
           runtime: Runtime.NODEJS_20_X,
           handler: 'handler',
           entry: (join(__dirname, '..', '..', 'services', 'spaces', 'handler.ts')),
           environment: {
            TABLE_NAME: props.spacesTable.tableName
           }
        });

        // We need to mka eusre that our Lambda function has privelages to write to the DynamoDB table
        spacesLambda.addToRolePolicy( new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [props.spacesTable.tableArn],
            actions: [
                "dynamodb:PutItem",
				"dynamodb:DeleteItem",
				"dynamodb:GetItem",
				"dynamodb:Scan",
				"dynamodb:UpdateItem"
            ]
        }))

        this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda);
    }
}