const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();

exports.handler = async event => {
  console.log("Input to the lambda function", event);
 dynamodb
    .getItem({
      TableName: "URL-Shortener",
      Key: {
        shortId: { S: event.queryStringParameters.shortURL}
      }
    })
    .promise()
    .then(response => {
      console.log("response from DDB", response);
      return {
        statusCode: 302,
        headers: {
          Location: response.Item.longURL.S
        }
      };
    })
    .catch(err => {
      console.error("error while fetching data from DDB", err);
      return err;
    });
};
