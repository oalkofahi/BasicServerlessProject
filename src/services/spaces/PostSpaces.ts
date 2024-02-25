import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";


// This file has the handler for the POST request
// When creating a new entry in DynamoDB it needs to have and ID ==> we can use the uuid library to generate it

export async function postSpaces (event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    // Create the ID for the new item
    const randomID = v4();
    // Create the new item from the data received inside the event
    const item = JSON.parse(event.body);
    // Assign the generated id to the new item
    item.id = randomID;

    // make the call to DynamoDB
    // DON'T forget the await
    // The PutItemCommand requires an input (JSON format) with a Tablename and an Item
    // The table name was set in the environemtn of the Lambda in the LambdaStack file
    // To access the environment of the Lambda we use process.env
    const result = await ddbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: marshall(item)
        /* If we did not use the marshall function in the previous line
        // We need to put the item values in the proper format and specify the data types
        // S: defines a string type
        */
        // Item: {
        //     id: {
        //         S: randomID
        //     },
        //     location: {
        //         S: item.location
        //     }
        // }
    }));

    console.log(result);

    const response: APIGatewayProxyResult = {
        statusCode: 201,
        body: JSON.stringify({id: randomID})
    }

    return response;
}