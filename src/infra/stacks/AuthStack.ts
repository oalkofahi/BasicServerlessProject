
import {CfnOutput, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib'
import { Construct } from 'constructs/lib/construct'
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

// Define a new Stack
// Note that the "export" keyword makes the class availble to classes in other modules
export class AuthStack extends Stack {

    public userPool: UserPool;
    private userPoolClient: UserPoolClient;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.createUserPool();
        this.createUserPoolClient();

    }


    private createUserPool(){
        this.userPool = new UserPool(this, 'SpacesUserPool', {
            removalPolicy: RemovalPolicy.DESTROY,
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true
            }
        });

        new CfnOutput(this, 'SpacesUserPoolId', {
            value: this.userPool.userPoolId
        })
    }
    private createUserPoolClient(){
        this.userPoolClient = this.userPool.addClient('SpacesUserPoolClient', {
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true
            }
        });

        // this.userPoolClient.addToRolePolicy( new PolicyStatement({
        //     effect: Effect.ALLOW,
        //     resources: [props.spacesTable.tableArn],
        //     actions: [
        //         "dynamodb:PutItem",
        //         "dynamodb:DeleteItem",
        //         "dynamodb:GetItem",
        //         "dynamodb:Scan",
        //         "dynamodb:UpdateItem"
        //     ]
        // }))

        new CfnOutput(this, 'SpacesUserPoolClientId', {
            value: this.userPoolClient.userPoolClientId
        })
    }
}