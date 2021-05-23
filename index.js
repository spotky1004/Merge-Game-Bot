// discord
global.Discord = require("discord.js");
const bot = new Discord.Client();

// global
global.fs = require("fs");
global.D = require("break_eternity.js");
global.Spl = require("./library/spotkyLib");
global.Spdl = require("./library/spotkyDecimalLib");
global.notation = Spdl.notation;
global.emoji = require("./data/emoji")
global.MergeField = require("./class/mergeField");
global.botName = "Merge Bot (β)"

// import some datas
const command = require("./commandManager");
const mergeData = require("./data/mergDataManager");

let sessionData = {};

const prefix = "-"
bot.on("message", async (msg) => {
  // message work condition
  if (
    (
      msg.channel.id !== "844901937023025172" &&
      msg.guild.id !== "697389133361971312" &&
      msg.guild.id !== "845517416334229554"
    ) ||  // if channel isn't beta channel (#beta-channel)
    msg.author.bot ||  // return if author of message is bot
    msg.content.length > 1000 || // spam
    !msg.content.startsWith(prefix) // return if start of message isn't prefix
  ) return;

  const userId = msg.author.id;
  
  // parse message
  let msgParsed = {};
  msgParsed.raw = msg.content.substr(prefix.length);
  msgParsed.command = msgParsed.raw.toLowerCase().split(" ")[0];
  msgParsed.args = msgParsed.raw.toLowerCase().split(" ").slice(1);
  msgParsed.rawArg = msgParsed.raw.split(" ").slice(1).join(" ");

  const commamd = command[msgParsed.command];
  if (typeof commamd === "undefined") return; // return if user entered undefined command

  // check player
  let player = playerCheck(userId);
  if (typeof sessionData[userId] === "undefined") sessionData[userId] = {};
  if (sessionData[userId].waiting) return;
  sessionData[userId].waiting = true;

  const playingArea = player.playingArea;
    
  // exeute command
  const cmdOut = commamd({
      msg: msg,

      parsed: msgParsed,
      arg: msgParsed.args,
      raw: msgParsed.rawMsg,
      rawArg: msgParsed.rawArg,
      
      player: player
  }) ?? {};



  // send message
  let messageSent;
  if (typeof cmdOut.toSend !== "undefined") {
    if (Array.isArray(cmdOut.toSend)) {
      messageSent = [];
      for (let i = 0, l = cmdOut.toSend.length; i < l; i++) {
        await msg.channel.send(cmdOut.toSend[i])
        .then((msgSent) => messageSent.push(msgSent)).catch(err => console.log(err));
      }
    } else {
      await msg.channel.send(cmdOut.toSend)
      .then((msgSent) => messageSent = msgSent).catch(err => console.log(err));
    }
  }

  // editMessage
  const editTimeout = cmdOut.editTime ?? 750;
  if (typeof cmdOut.toEdit !== "undefined") {
    if (Array.isArray(cmdOut.toEdit)) {
      for (let i = 0, l = cmdOut.toEdit.length; i < l; i++) {
        if (typeof messageSent[i] === "undefined") continue;
        messageSent[i].edit(cmdOut.toEdit[i], { timeout: editTimeout });
      }
    } else {
      if (typeof messageSent !== "undefined") {
        messageSent.edit(cmdOut.toEdit, { timeout: editTimeout });
      }
    }
  }



  // revert playingArea to save form
  player[playingArea] = player[playingArea].toSaveForm();

  // save player's data
  fs.writeFileSync(`./UserData/${userId}.json`, JSON.stringify(player));

  sessionData[userId].waiting = false;
});

bot.on("ready", () => {
  bot.user.setPresence({
    status: 'online',
    activity: {
        name: 'Type \"-help\"! (βeta) | This bot\'s profile is temporary.',
        type: 'WATCHING',
    }
  });
  console.log("Bot ready!");
});


// functions
const defaultPlayer = require("./defaultPlayer");
function playerCheck(id) {
  const path = `./userData/${id}.json`;

  if (!fs.existsSync(path)) fs.writeFileSync(path, "{}");

  let player = require(`./UserData/${id}.json`);
  for (const key in defaultPlayer) {
    const defaultValue = defaultPlayer[key];
    let toFill = player[key] ?? defaultValue;
    
    if (defaultValue instanceof D) {
      player[key] = new D(toFill);
    } else if (Array.isArray(defaultValue)) {
      if (typeof toFill === "string") toFill = toFill.split(",");
      player[key] = [...toFill];
    } else if (typeof defaultValue === "number") {
      player[key] = Number(toFill);
    } else if (typeof defaultValue === "object" && defaultValue !== null) {
      player[key] = Spdl.copyObj(toFill);
    } else if (typeof defaultValue === "string") {
      player[key] = toFill;
    }
  }

  const playingArea = player.playingArea;
  player[playingArea] = new MergeField(player[playingArea], {x: player.shop_mapWidth, y: player.shop_mapHeight}, mergeData[playingArea], player);

  return player;
}


// login
bot.login(require("./token.json").token);