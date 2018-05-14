const net = require('net');

let clients = [];
function broadcast(message, sender) {
    clients.forEach(function (client) {
        // Don't want to send it to sender
        if (client === sender)
            return;
        else {
            client.write(message);
        }
    });
    // Log it to the server output too
    process.stdout.write(message + "\n")
}

const server = net.createServer((c) => {
    clients.push(c);
    console.log("client connected: " + clients.length);

    c.on('data', function (data) {
        broadcast(data, c);

    });
    c.on('close', function () {
        clients.splice(clients.indexOf(c), 1);
        //  broadcast(" left the chat.\n");
        console.log("One left from chat.\n");
    });

    c.on('error', (err) => {
        console.log(err);
    })
});
server.on('error', (err) => {
    console.log(err, "---------------");
});
server.listen(5000, () => {
    console.log('server bound');
});

process.on('SIGINT', function () {
    server.close();
});

