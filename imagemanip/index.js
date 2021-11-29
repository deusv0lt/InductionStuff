const { downloadImage, resize, saveToS3 } = require('./utils');

const bucket = 'imagemanip';

exports.handler = async (event) => {
  const buf = await downloadImage(event.url);
  const resized = await resize(buf, event.width, event.height);
  const key = await saveToS3(bucket, event.name, resized);
  return { key };
};
