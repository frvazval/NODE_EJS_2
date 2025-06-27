const fs = require('node:fs');
const path = require('node:path');

function deleteItem (jsonData, idParam) {
   return newJsonData = jsonData.filter(travel => travel.id != idParam);
}

function writeTravelsJSON (jsonData) {    
    fs.writeFileSync(path.join(__dirname, "..", "data", "travels.json"), JSON.stringify(jsonData, null, 2), "utf-8");
}

module.exports = {deleteItem, writeTravelsJSON}