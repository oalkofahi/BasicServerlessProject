
// For this to be executable by API Gateway it needs to have a statusCode and a body
// This the Old implementation using JS
// exports.main = async function(event, context) {
//     return {
//         statusCode: 200,
//         body: JSON.stringify(`Hello World Woooo Hoooo!!! I can read from ${process.env.TABLE_NAME}`)
//     }
// }
// We can rewrite using TS

import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from 'uuid'
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

// Initialize S3 client
const s3Client = new S3Client({});

async function handler(event: APIGatewayProxyEvent, context: Context) {
    const command = new ListBucketsCommand({});
    const listBucketsResult = (await s3Client.send(command)).Buckets

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(`Hello world!!, here are your buckets: ${JSON.stringify(listBucketsResult)}`)
    }

    console.log(event);

    return response;
}

export { handler }

