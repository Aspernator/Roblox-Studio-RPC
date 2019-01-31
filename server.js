//Made by Aspernator
//Plugin is required for this to work https://www.roblox.com/library/2789574867/Studio-RPC

var RPC = require("discord-rpc");
var express = require("express");
var app = express();

var clientId = '539030212650991616';
var scopes = ['rpc', 'rpc.api', 'messages.read'];
 
RPC.register(clientId);

var client = new RPC.Client({ transport: 'ipc' });

client.on('ready', () => {
  console.log('discord logged in as ', client.user.username);
});

var presenceText = "";
var presenceStart = new Date();
var lastPresence = new Date();

app.get("/updatePresence/:msg/:timestamp",function(req,res){
  if (presenceText != req.params.msg) {
    presenceStart = new Date();
  }
  presenceText = req.params.msg;
  lastPresence = new Date();
  
  res.send("OK");
})

setInterval(function(){
  if ((new Date())-lastPresence > 7500) {
    client.clearActivity();
  } else {
    if (presenceText != "") {
      client.setActivity({
        details: "Developing",
        state: presenceText,
        startTimestamp: presenceStart,
        largeImageKey: "icon",
        largeImageText: "Roblox Studio",
        instance: false,
      }).catch(console.error);
    }
  }
},2500);

client.login({ clientId, scopes }).catch(console.error);
app.listen(3000,function(){
  console.log("web running");
})