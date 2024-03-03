import { DynamoDBClient, GetItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


// This file has the handler for the GET request

export async function updateSpace (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if((event.queryStringParameters) && ('id' in event.queryStringParameters) && (event.body)) {
        // First convert body from string to JSON object
        const parsedBody = JSON.parse(event.body)
        const spaceId = event.queryStringParameters['id']; // The id of the DynamoDB entry
        // Take the first key of the body ==> if the body has multiple fields we are ignoring the rest
        const requestBodyKey = Object.keys(parsedBody)[0]; // an entry could have many values, we are getting the key (attribute name) for the first value
        // Now get the value for the 1st key
        const requestBodyValue = parsedBody[requestBodyKey];

        // Now we have all the needed info to update
        // To avoid conflicting fields to be updated with DynamoDB reserved keywords, we can use UpdateExpression
        // Note that  ReturnValues: 'UPDATED_NEW' will return to us any newly updated value
        const updateResult = await ddbClient.send(new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id': {S: spaceId}
            },
            UpdateExpression: 'set #zzzNew = :new',
            ExpressionAttributeValues: {
                ':new': {
                    S: requestBodyValue
                }
            },
            ExpressionAttributeNames: {
                '#zzzNew': requestBodyKey
            },
            ReturnValues: 'UPDATED_NEW'
        }));
        return {
            statusCode: 204,
            body: JSON.stringify(updateResult.Attributes)
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify('Problem with event args')
        }
    }
}