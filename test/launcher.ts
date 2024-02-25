
// This is for general testing
//handler({} as any,{} as any);

import { handler } from "../src/services/spaces/handler";

// To test POST method
handler({
    httpMethod: 'POST',
    body: JSON.stringify({
        location: "JORDAN"
    })
} as any,{} as any);