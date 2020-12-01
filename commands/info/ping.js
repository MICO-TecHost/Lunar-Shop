const Discord = require("discord.js");
const { title, color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "ping",
  category: "info",
  description: "Indica a latência do bot e a latência da API",
  timeout: 10000,
  run: async (bot, message) => {
    message.channel.send(`🏓 Pinging....`).then((message) => {
      const _ = new Discord.MessageEmbed()
        .setTitle(title + 'Ping')
        .setDescription(
          `🏓 Pong!\nLatência: \`${Math.floor(
            message.createdTimestamp - message.createdTimestamp
          )}ms\`\nlatência da API: \`${Math.round(bot.ws.ping)}ms\``
        )
        .setColor(color)
        .setFooter(footertext, footerimage)
      message.edit(_);
      message.edit("\u200B");
    });
  },
};