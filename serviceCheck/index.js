const isUp = require("is-up");
const aws = require("aws-sdk");
const ses = new aws.SES({ region: "us-west-2" });
exports.helloFromLambdaHandler = async (event) => {

  const status = await isUp(event.url);
  if (status==true){
    const upDown = "up";
  }
  
    const upDown = "down";
  
     const params = {
    Destination: {
      ToAddresses: ["sohan.manju@antstack.io"]
    },
    Message: {
      Body: {
        Text: { Data: `The Website or Service is  ${upDown}` },
      },

      Subject: { Data: "Service Status" },
    },
    Source: "sohan.manju@antstack.io",
  };
  console.log(status);
  return ses.sendEmail(params).promise()

};



