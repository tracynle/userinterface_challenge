//create your code for Lambda
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-west-1'});

const ses = new AWS.SES();

// api gateway stringifies the body
exports.handler = async (event, context) => {
    // extract from the body
    const { to, from, subject, text } = JSON.parse(event.body);
    console.log("EVENT:" + event);

    if (!to || !from || !subject || !text) {
        return _400({ message: "Missing parameter on request body" })
    }

    const emailParams = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Text: { Data: text }
            },
            Subject: { Data: subject }
        },
        //where you're sending the email from
        Source: from
    }
    try {
        await ses.sendEmail(emailParams).promise();

        const requestId = context.awsRequestId;

        await createMessage(requestId, text).then(() => {
            callback(null, {
                statusCode: 201,
                body: '',
                headers: {
                    'Access-Control-Allow-Origin': "*"
                }
            })
        }).catch((err) => {
            console.error(err)
        });

        // const request = ses.sendEmail(emailParams);
        // request.send();

        // ses.sendEmail(params, function(err, data) {
        //     if (err) console.log(err, err.stack); // an error occurred
        //     else     console.log(data);           // successful response
        // });

        return _200();
    } catch (error) {
        return _400({ message: 'Unable to send the email: ' + error + " email params:" + JSON.stringify(emailParams)});
    }
}

function createMessage(requestId, message) {
    const params = {
        TableName: 'Message',
        Item: {
            'messageId': requestId,
            'message': message
        }
    }
    return ddb.put(params).promise();
}

const _400 = (body) => {
    return {
        headers: {
            'Content-Type': 'applicaton/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 400,
        body: JSON.stringify(body) //return the string of data
    }
}

const _200 = () => {
    return {
        headers: {
            'Content-Type': 'applicaton/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin' : '*'
        },
        statusCode: 200,
        body: '' //returns the string of data
    }
    
}