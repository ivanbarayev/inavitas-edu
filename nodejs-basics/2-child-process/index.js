const {spawn} = require('child_process');
const ls = spawn('cmd.exe', ['/c', 'dir']); //Windows
//const ls = spawn('cmd.exe', ['/c', 'explorer.exe']); //Windows
//const ls = spawn('ls', ['-lh', '/usr']); //Linux
ls.stdout.on('data', (data) => {
    console.log(`out : ${data}`);
})

ls.stderr.on('data', (data) => {
    console.log(`err : ${data}`);
})

ls.on('close', (code) => {
    `child_proc kapandi : ${code}`
})

ls.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
});
