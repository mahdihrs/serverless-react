const AWS = require("aws-sdk");
const fs = require('fs');
const path = require('path');

const hotelInfoFile = fs.readFileSync(path.resolve(__dirname, '../src/components/data/hotel-info.json'), 'utf8');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to Accessibility table.");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const accessibilitiesData = JSON.parse(hotelInfoFile).accessibility;

accessibilitiesData.forEach(function(accessibililty) {
  const params = {
    TableName: "Accessibility",
    Item: {
      "name": accessibililty.name
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for accessibility",
                    accessibililty.name, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", accessibililty.name, "to table.")
  })
});