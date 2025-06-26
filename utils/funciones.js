function deleteItem (jsonData, idParam) {
    const newJsonData = json.filter(travel => travel.id != idParam);
}

function writeTravelsJSON (jsonData) {
    fs.writeFileSync(path.join(__dirname, "data", "travels.json"), JSON.stringify(jsonData, null, 2), "utf-8");
}

module.exports = {deleteItem, writeTravelsJSON}