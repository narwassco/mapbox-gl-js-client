const fs = require('fs');
const { exec } = require("child_process");
const config = require('./src/config');

const build = () =>{
    if (config.cname){
        fs.writeFileSync('./dist/CNAME', config.cname);
    }

    exec("webpack", (error, stdout, stderr) => {
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