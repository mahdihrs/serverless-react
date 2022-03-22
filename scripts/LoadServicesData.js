const AWS = require("aws-sdk");
const fs = require('fs');
const path = require('path');

const hotelInfoFile = fs.readFileSync(path.resolve(__dirname, '../src/components/data/hotel-info.json'), 'utf8');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to Accessibility table.");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const servicesData = JSON.parse(hotelInfoFile).services_amenities;

servicesData.forEach(function(service) {
  const params = {
    TableName: "Service",
    Item: {
      "name": service.name
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for service",
                    service.name, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", service.name, "to table.")
  })
});