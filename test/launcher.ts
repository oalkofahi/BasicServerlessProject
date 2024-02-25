
// This is for general testing
//handler({} as any,{} as any);

import { handler } from "../src/services/spaces/handler";

// To test POST method
// handler({
//     httpMethod: 'POST',
//     body: JSON.stringify({
//         location: "JORDAN"
//     })
// } as any,{} as any);

// To test GET method
// removing the cast to any at the end enables autocomplete because the type becomes known
handler({
    httpMethod: 'GET',
    queryStringParameters: {
        id: '0d18f878-b7d3-46dc-b2da-ae22ce92bbcc'
    }
    // body: JSON.stringify({
    // })
} as any,{} as any);