
import { Stack, StackProps } from 'aws-cdk-lib'
import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, MethodOptions, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { IUserPool } from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs/lib/construct'


interface ApiStackProps extends StackProps {
    spacesLambdaIntegration: LambdaIntegration,
    userPool: IUserPool;
}

// Define a new Stack
// Note that the "export" keyword makes the class availble to classes in other modules
export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props)

        const api = new RestApi(this, 'SpacesApi');

        // Create an authorizer using a Cognito user pool
        const authorizer = new CognitoUserPoolsAuthorizer(this, 'SpacesApiAuthorizer', {
            cognitoUserPools: [props.userPool],
            //identitySource: 'method.request.header.Authorizer'
            identitySource: 'method.request.header.Authorizer'
        });

        // Attach to our API
        authorizer._attachToApi(api);

        // Create method options to pass to our API methods
        const optionsWithAuth: MethodOptions = {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: {
                //authorizerId: authorizer.authorizerId
                authorizerId: authorizer.authorizerId
            }
        }
        // Pass the created options to each method
        const spacesResources = api.root.addResource('spaces')
        spacesResources.addMethod('GET', props.spacesLambdaIntegration, optionsWithAuth) // integrates the Lambda with the GET
        spacesResources.addMethod('POST', props.spacesLambdaIntegration, optionsWithAuth) // integrates the Lambda with the POST
        spacesResources.addMethod('PUT', props.spacesLambdaIntegration, optionsWithAuth) // integrates the Lambda with the PUT
        spacesResources.addMethod('DELETE', props.spacesLambdaIntegration, optionsWithAuth) // integrates the Lambda with the DELETE
    }
}