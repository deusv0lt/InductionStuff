const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();


exports.handler = (event, context, callback) => {
  console.log("Input to the lambda function", event);
  const body = JSON.parse(event.body);
  const shortURL =Math.random().toString(16).substr(2, 6);
  return dynamodb
    .putItem({
      TableName: "URL-Shortener",
      Item: {
        shortId: { S: shortURL },
        longURL: { S: body.longURL },
        owner: { S: "owner" }
      }
    })
    .promise()
    .then(data => {
      console.log("response post create", data);
      return `https://70kjgxiij1.execute-api.ap-south-1.amazonaws.com/URLShortener-GetLongURL?shortURL=${shortURL}`;
    })
    .catch(err => {
      console.error("error", err);
      return err;
    });
};
