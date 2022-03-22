const AWS = require("aws-sdk");
const fs = require('fs');
const path = require('path');

const galleryFile = fs.readFileSync(path.resolve(__dirname, '../src/components/data/gallery.json'), 'utf-8');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to GalleryImages table.");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const galleryImagesData =  JSON.parse(galleryFile)

galleryImagesData.forEach(function(galleryImage) {
  const className = galleryImage.class || "no-class";

  const params = {
    TableName: "Gallery",
    Item: {
      "src": galleryImage.src,
      "alt": galleryImage.alt,
      className,
    }
  };
  console.log(params)

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for gallery images",
                    galleryImage.src, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", galleryImage.src, "to table.")
  });
});