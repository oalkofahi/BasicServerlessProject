
import {Stack, StackProps} from 'aws-cdk-lib'
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs/lib/construct'
import { join } from 'path'

// Define a new Stack
// Note that the "export" keyword makes the class availble to classes in other modules
export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        new LambdaFunction(this, 'HelloLambda', {
           runtime: Runtime.NODEJS_20_X,
           handler: 'hello.main',
           code: Code.fromAsset(join(__dirname, '..', '..', 'services'))
        })
    }
}