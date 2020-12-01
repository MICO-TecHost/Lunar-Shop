const Discord = require("discord.js");
const { title, color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "gay",
  category: "fun",
  description: "Indica a latência do bot e a latência da API",
  timeout: 10000,
  run: async (bot, message, args) => {
    let user = message.mentions.users.first();
    let users = message.mentions.users;

    if (!user) {
      let Embed = new Discord.MessageEmbed()
        .setDescription('Tens de mencionar uma pessoa para poderes saber se ela é gay ou não!')
        .setFooter(footertext, footerimage)
        .setAuthor(title + 'gay', null, null)
        .setColor(color);
        message.channel.send(Embed);  
    } else {
      if (users.size != 1) {
        let Embed = new Discord.MessageEmbed()
          .setDescription('Só podes saber se uma pessoa é gay de cada vez!')
          .setFooter(footertext, footerimage)
          .setAuthor(title + 'gay', null, null)
          .setColor(color);
        message.channel.send(Embed);
        
      } else {
        let Embed = new Discord.MessageEmbed()
          .setFooter(footertext, footerimage)
          .setAuthor(title + 'gay')
          .setThumbnail(user.displayAvatarURL())
          .setDescription(`O ${user} é **${Math.floor(Math.random() * 101)}%** gay!`)
          .setColor(color);
        message.channel.send(Embed);
      }
    }
}}