
import {Stack, StackProps} from 'aws-cdk-lib'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs/lib/construct'


interface ApiStackProps extends StackProps {
    spacesLambdaIntegration: LambdaIntegration
}

// Define a new Stack
// Note that the "export" keyword makes the class availble to classes in other modules
export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props)

        const api = new RestApi(this, 'SpacesApi');
        const spacesResources = api.root.addResource('spaces')
        spacesResources.addMethod('GET', props.spacesLambdaIntegration) // integrates the Lambda with the GET
        spacesResources.addMethod('POST', props.spacesLambdaIntegration) // integrates the Lambda with the POST
    }
}