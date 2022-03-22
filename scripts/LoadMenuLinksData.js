const AWS = require("aws-sdk");
const fs = require('fs');
const path = require('path');

const menuLinksFile = fs.readFileSync(path.resolve(__dirname, '../src/components/data/menuLinks.json'), 'utf-8');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to MenuLinks table.");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const menuLinksData = JSON.parse(menuLinksFile)

menuLinksData.forEach(function(menuLink) {
  const params = {
    TableName: "MenuLinks",
    Item: {
      "class": menuLink.class,
      "href": menuLink.href,
      "text": menuLink.text
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for menu links",
      menuLink.text, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", menuLink.text, "to table.")
  });
});