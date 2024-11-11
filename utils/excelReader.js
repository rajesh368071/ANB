const read = require("xlsx");

const file_path = read.readFile('../Project/test_data/TestFlags.xlsx');
const sheetDate = (sheet_name) => {
    const temp = read.utils.sheet_to_json(file_path.Sheets[sheet_name]);
    return temp;
}
//const data = sheetDate("flagsheet");
//console.log(sheetDate("flagsheet"));

//console.log(data[1]['flag']);

module.exports = {
    sheetDate,
}