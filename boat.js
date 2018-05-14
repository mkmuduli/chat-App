const net = require('net');

/* const client = net.createServer({ port: 5000 }, () => {
    console.log("connected to server :");
    client.write("love u")
}); */

const server = net.createServer((c) => {
    console.log("client connected");
    c.on("data", (data) => {
        console.log(data);
    })
    c.pipe(c);
})


server.on('error', (err) => {
    throw err;
});
server.listen(5000, () => {
    console.log('server bound');
});

server.on('data', (data) => {
    console.log(data.toString());
    client.end();
});