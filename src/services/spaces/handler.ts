
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getSpaces } from "./GetSpaces";
import { updateSpace } from "./UpdateSpace";
import { deleteSpace } from "./deleteSpace";
import { JsonError, MissingFieldError } from "../shared/Validator";


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
            case 'PUT':
                const updateResponse = await updateSpace(event, ddbClient);
                console.log(updateResponse)
                return updateResponse
            case 'POST':
                const postResponse = await postSpaces(event, ddbClient);
                return postResponse
            case 'DELETE':
                const delResponse = await deleteSpace(event, ddbClient);
                console.log(delResponse)
                return delResponse
            default:
                message = 'Method NOT implemented'
                return {
                    statusCode: 500,
                    body: JSON.stringify(message)
                }
        }

    } catch (error) {
        console.log(error)
        if(error instanceof MissingFieldError) {
            return {
                statusCode: 404,
                body: JSON.stringify(error.message)
            }
        }
        if(error instanceof JsonError) {
            return {
                statusCode: 404,
                body: JSON.stringify(error.message)
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }

    }
}

export { handler }


