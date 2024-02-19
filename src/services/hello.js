
// For this to be executable by API Gateway it needs to have a statusCode and a body
exports.main = async function(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(`Hello World Woooo Hoooo!!! I can read from ${process.env.TABLE_NAME}`)
    }
}