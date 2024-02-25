
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getSpaces } from "./GetSpaces";


/*
- Lambda functions use context
- To use the same context over and over again, we need to have it defined outside the scope of the function
- With DynamoDB the context could be the connection to the DB
- ==> instead of creating multiple connections, use the same connection multiple times

*/

// define the DynamoDB client
// The dynamoDB client takes a configuration argument
const ddbClient = new DynamoDBClient({});

// The important part for a method handler Lambda function is to return an API proxy result
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: string;

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getSpaces(event, ddbClient);
                console.log(getResponse)
                return getResponse
            case 'POST':
                const postResponse = await postSpaces(event, ddbClient);
                return postResponse
            default:
                message = 'Method NOT implemented'
                return {
                    statusCode: 500,
                    body: JSON.stringify(message)
                }
        }

    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }

    }
}

export { handler }

