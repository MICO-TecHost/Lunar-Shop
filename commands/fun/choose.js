const { MessageEmbed } = require("discord.js");
const { title, color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "choose",
  description: "Dá uma responsta aleatória!",
  category: "fun",
  run: async (bot, message, args) => {
    if (!args) {
      let Embed = new MessageEmbed()
        .setTitle('Mythic  ◆  Escolher')
        .setDescription('Tens de fornecer opções!')
        .setColor(color)
        .setFooter(footertext, footerimage)
      message.channel.send(Embed)
    } else {
      options = args.join(', ')

      let Embed = new MessageEmbed()
        .addField(`Opções do ${message.author.username}!`, options, false)
        .addField('Eu escolho:', args[Math.round(Math.random() * args.length)], false)
        .setFooter(footertext, footerimage)
        .setAuthor(title + 'Choose', null, null)
        .setColor(color);
      message.channel.send(Embed);
    }
  }
};
