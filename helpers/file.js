const fs = require('fs');
const path = require('path');

function write_file(file_type, data){
    file_name = "../public/" + file_type + ".txt";
    path_file = path.join(__dirname, file_name);
    fs.writeFile(path_file, data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
    return file_name;
}

function read_file(file){
    data = null;
    fs.readFile(file, function(err, buff) {
        data = buff.toString();
    })
    return data;
}

module.exports = { write_file, read_file };