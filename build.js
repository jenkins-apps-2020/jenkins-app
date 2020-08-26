var fs = require('fs-extra');
var JSSoup = require('jssoup').default;

try {
    process.chdir('dist');
    console.log('New directory: ' + process.cwd());
} catch (err) {
    console.log('chdir: ' + err, process.cwd());
}

/*Write FrogE html file*/
let soup = new JSSoup(fs.readFileSync('index.html'));

let result = soup.prettify();
const pat = /(<\/!doctype>|<\/base>|<\/meta>|<\/link>)\n?/gmi;
result = result
    .replace(pat, '')
    .replace('<base href="/">', '<base href="">')
    .replace('<!doctype>', '<!DOCTYPE html>');

fs.writeFileSync("index.html", result);
fs.renameSync('index.html', 'JenkinsApp.html');

let buildProps = {
    "name": "jenkinsApp",
    "time": Math.round((new Date()).getTime() / 1000)
};
if (process.env && process.env["buildNumber"] !== "") {
    buildProps.version = process.env["ng2Version"] + '.' + process.env["buildNumber"];
    fs.writeFileSync('package.json', JSON.stringify(buildProps));
}
