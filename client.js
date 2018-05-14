const readline = require('readline');
if (!process.argv[2]) {
    process.argv[2] = "Anonymous"
}

const net = require('net');
let rl = null;

const client = net.createConnection({ port: 5000 }, () => {
    console.log(`connected to server as '${process.argv[2]}'`);
    // client.write("love u");
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (input) => {
        //console.log(input.toString());
        client.write(input.toString() + ": by " + process.argv[2])
    });

});
client.on("connect", () => {
    //  console.log(process.argv[2]);
    client.name = process.argv[2]
})

client.on('data', (data) => {
    console.log(data.toString());
    //  client.end();
});
client.on('close', function () {
    rl.close();
    client.end();
    //  clients.splice(clients.indexOf(c), 1);
    //   broadcast(" left the chat.\n");
    console.log("close");
});

process.on('SIGINT', function () {
    client.write(process.argv[2] + " left the chat.\n")
    client.destroy();
});


