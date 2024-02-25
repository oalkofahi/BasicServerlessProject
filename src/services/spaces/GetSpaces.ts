import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


// This file has the handler for the GET request

export async function getSpaces (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    // With no ID provided we want to create a scan operation that returns all elements
    // check querystring parameters
    if(event.queryStringParameters) {
        console.log('QueryString found')
        // Look for id in query string
        if('id' in event.queryStringParameters) {
            const spaceId = event.queryStringParameters['id']
            console.log(`id is: ${spaceId}`)
            // DON'T forget the await
            const getItemResponse = await ddbClient.send(new GetItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    'id' : {S: spaceId}
                }
            }))
            console.log('got response')
            if(getItemResponse.Item) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(getItemResponse.Item)
                }
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify(`No item found with Id: ${spaceId}`)
                }

            }
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify('Id required')
            }
        }
    } else {
        // make the call to DynamoDB
    // DON'T forget the await
    // The ScanCommand requires an input (JSON format) with a Tablename
    // Check other possible inputs like Filter expressions by Ctrl+Click on the ScanCommand
    const result = await ddbClient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME
    }));

    console.log(result.Items);

    const response: APIGatewayProxyResult = {
        statusCode: 201,
        body: JSON.stringify(result.Items)
    }

    return response;
    }
}