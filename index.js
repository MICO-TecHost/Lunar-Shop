const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const prefix = config.prefix;
const bot = new Discord.Client({
  disableMentions: "everyone",
  partials: ["REACTION"],
});
bot.queue = new Map();
bot.vote = new Map();
bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Discord.Collection();
bot.events = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
const token = require(`./token.json`);

["command", "server"].forEach((handler) => {
  require(`./handlers/${handler}`)(bot, prefix);
});

bot.on("ready", async () => {
  require("./events/client/ready")(bot);
});

bot.on("message", async (message) => {
  require("./events/guild/message")(bot, message);
});

bot.on("messageUpdate", async (oldMessage, newMessage) => {
  require("./events/guild/messageUpdate")(oldMessage, newMessage);
});

bot.on("messageDelete", async (message) => {
  require("./events/guild/messageDelete")(message);
});

bot.on("messageReactionAdd", (reaction, user) => {
  require("./events/guild/messageReactionAdd")(reaction, user);
});

bot.on("messageReactionRemove", (reaction, user) => {
  require("./events/guild/messageReactionRemove")(reaction, user);
});

bot.login(token.Token);