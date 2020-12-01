const Discord = require("discord.js");
const figlet = require('figlet');
const { title, color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "ascii",
  category: "fun",
  description: "Indica a latência do bot e a latência da API",
  timeout: 5000,
  run: async (bot, message, args, prefix) => {
    const text = message.content.substr(prefix.length + 6);

    if (!text) {
      let Embed = new Discord.MessageEmbed()
        .setDescription("Tens de fornecer texto!")
        .setFooter(footertext, footerimage)
        .setAuthor(`${title}Ascii`, null, null)
        .setColor(color);
      message.channel.send(Embed);
    } else {
      figlet.text(text, function (err, ascii) {
        if (ascii.length > 2000) {
          let Embed = new Discord.MessageEmbed()
            .setDescription('O texto que introduziste fica demasiado grande em ascii!')
            .setFooter(footertext, footerimage)
            .setAuthor(`${title}Ascii`, null, null)
            .setColor(color);
          message.channel.send(Embed);
        } else {
          message.channel.send('```' + ascii + '```')
        }
      })
    }
  }
};