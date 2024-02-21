
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

    public readonly helloLambdaIntegration: LambdaIntegration

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)

        const helloLambda = new NodejsFunction(this, 'HelloLambda', {
           runtime: Runtime.NODEJS_20_X,
           handler: 'handler',
           entry: (join(__dirname, '..', '..', 'services', 'hello.ts')),
           environment: {
            TABLE_NAME: props.spacesTable.tableName
           }
        });

        helloLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: [
                's3:ListAllMyBuckets',
                's3:ListBucket'
            ],
            resources: ["*"]
        }));

        this.helloLambdaIntegration = new LambdaIntegration(helloLambda);
    }
}