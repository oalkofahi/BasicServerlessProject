import { DeleteItemCommand, DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


// This file has the handler for the GET request

export async function deleteSpace (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if((event.queryStringParameters) && ('id' in event.queryStringParameters)) {
        const spaceId = event.queryStringParameters['id']; // The id of the DynamoDB entry

        const deleteResult = await ddbClient.send(new DeleteItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id': {S: spaceId}
            }
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(`Item with id ${spaceId} deleted successfully`)
        }


    } else {
        return {
            statusCode: 404,
            body: JSON.stringify('Item not found!!')
        }
    }

}
