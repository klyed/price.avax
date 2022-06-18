var express = require("express"),
app = express(),
server = require("http").createServer(app),
helmet = require('helmet'),
log = require('fancy-log');
const axios = require('axios');
const fs = require('fs');

const coinGecko = `https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd`;

app.use(helmet({contentSecurityPolicy: false}));

let clientIp;
let port = 1337;

function httpRedirect(req, res, next){
  clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.header('Access-Control-Allow-Origin', '*');
  log(`CONNECT: ${clientIp} Connected to Server`);
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect('http://127.0.0.1:1337');
  }else{
    next();
  }
}
//set routes to public static files
app.use("/", httpRedirect, express.static(__dirname + "/client"));

server.listen(port);
log(`WEB: Price.Avax v0.0.1 Online - Port: ${port}`);




const fetchPrices = async () => {
  const response = await axios.get(coinGecko); //'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd'
  console.log(`Fetching AVAX Price from CoinGecko.com...`)
  console.log(response.data);
  var price = response.data['avalanche-2']['usd'];
  if(price > 0) {
      fs.writeFileSync("./client/api/price.json", `[{"price":${price}}]`);
      console.log(price);
  } else {
    console.log(`Price Not Found!`);
  }
};

fetchPrices();

setInterval(function () {
  fetchPrices();
}, 5000);
