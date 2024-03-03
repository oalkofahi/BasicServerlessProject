
import { Amplify } from 'aws-amplify';
import { signIn, SignInOutput, type SignInInput } from 'aws-amplify/auth';
import { fetchAuthSession } from "aws-amplify/auth";
import { CfnOutput } from 'aws-cdk-lib';

const awsRegion = 'us-east-1'

// With Amplify V6, this seems to be good
Amplify.configure({
    Auth: {
      Cognito: {
        userPoolClientId: '5pubont2rtu3ead47gfv3umav1',
        userPoolId: 'us-east-1_FhsmcbBm6',

      }
    }
  });

export class AuthService {
    private signInOutput: SignInOutput;
    public async login({ username, password }: SignInInput) {
        try {
            //const { isSignedIn, nextStep } = await signIn({ username, password });
            this.signInOutput  = await signIn({ username, password , options: {

                authFlowType: 'USER_PASSWORD_AUTH'

            }});

            var cognitoTokens = (await fetchAuthSession()).tokens;
            let rawToken = cognitoTokens?.idToken?.toString();
            //let payload = cognitoTokens?.idToken?.payload;
            console.log(rawToken)
            //console.log(payload)

            return this.signInOutput;
        } catch (error) {
            console.log('error signing in', error);
        }

    }


}

