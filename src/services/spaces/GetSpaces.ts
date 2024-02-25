import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


// This file has the handler for the GET request

export async function getSpaces (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    // With no ID provided we want to create a scan operation that returns all elements
    // check querystring parameters
    if(event.queryStringParameters) {
        // Look for id in query string
        if('id' in event.queryStringParameters) {
            const spaceId = event.queryStringParameters['id']
            // DON'T forget the await
            const getItemResponse = await ddbClient.send(new GetItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    'id' : {S: spaceId}
                }
            }))
            if(getItemResponse.Item) {
                // To remove the data types from the response, we can unmarshall the Item
                const unmarshalledItem = unmarshall(getItemResponse.Item)
                return {
                    statusCode: 200,
                    body: JSON.stringify(unmarshalledItem)
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
    // The following is to unmarshall each item in the result
    // The ? says if we have Items
    // map is similar to map in Python, we apply a function to each element in Items
    // It maps each item into an unmarshalled item
    const unmarshalledItems = result.Items?.map(item => unmarshall(item))
    console.log(result.Items);

    const response: APIGatewayProxyResult = {
        statusCode: 201,
        body: JSON.stringify(unmarshalledItems)
    }

    return response;
    }
}