const net = require("net");
const raedline = require('readline');
const os = require ('os')

const PORT = 5000
const HOST = '10.91.236.144';

const client = new net.Socket();
const rl  = raedline.createInterface({
   input: process.stdin,
    output: process.stdout
})

function perguntar() {
    rl.question("digite sua menssagem(ou 'sair'para encerrar):",(msg)=>{
        if (msg.toLowerCase() == "sair") {
            client.end();
            rl.close();
            return;
        }
        client.write(`${os.userInfo().username}: ${msg}`);
    });
}

client.connect(PORT, HOST, () =>{
    console.log(`conectando ao servidor TCP!`);
    perguntar();
});
client.on("dat", (data) =>{
    console.log(`resposta do servidor:$(data.toString()}`)
});
client.on("close", () =>{
    console.log("Conexão encerrada pelo servidor.");
});