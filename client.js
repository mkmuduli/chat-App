const net = require('net');

const client = net.createConnection({ port: 5000 }, () => {
    console.log("connected to server :");
    client.write("love u")
});

// client.on('data', (data) => {
//     console.log(data.toString());
//     //  client.end();
// });