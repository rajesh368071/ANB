const read = require("xlsx");
const path = require("node:path");

const file_path = read.readFile(path.join(__dirname, "..", "test_data" ,"TestFlags.xlsx"));
const sheetDate = (sheet_name) => {
    const temp = read.utils.sheet_to_json(file_path.Sheets[sheet_name]);
    return temp;
}

/*console.log(sheetDate("flagsheet"));
const data = sheetDate("flagsheet");
console.log(data[0].ContactName);*/

module.exports = {
    sheetDate,
}