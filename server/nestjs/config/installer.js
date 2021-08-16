var fs = require('fs');
var resolve = require('path').resolve;
var join = require('path').join;
var cp = require('child_process');
var os = require('os');
    
// get path
const paths = [resolve(__dirname, '../gateway/'), resolve(__dirname, '../microservices/')];

const installDeps = function (path) {
    fs.readdirSync(path).forEach(function(mod) {
        var modPath = join(path, mod);
        
        // ensure path has package.json
        if (!fs.existsSync(join(modPath, 'package.json'))) {
            return;
        }
    
        // npm binary based on OS
        var npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';
    
        // install folder
        cp.spawn(npmCmd, ['i'], {
            env: process.env,
            cwd: modPath,
            stdio: 'inherit'
        });
    })
}

paths.forEach((path) => installDeps(path));
    
