const fs = require('fs');
const { exec } = require("child_process");
require('dotenv').config()

const build = () =>{
    if (process.env.CNAME){
        fs.writeFileSync('./dist/CNAME', process.env.CNAME);
    }

    exec("webpack --mode production", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

module.exports = build();