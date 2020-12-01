const Discord = require("discord.js");
const { title, color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "penis",
  category: "fun",
  description: "Indica a latência do bot e a latência da API",
  timeout: 10000,
  run: async (bot, message, args) => {
    let user = message.mentions.users.first();
    let users = message.mentions.users;

    if (!user) {
      let Embed = new Discord.MessageEmbed()
        .setDescription('Tens de mencionar uma pessoa para poderes saber o tamanho do seu pénis!')
        .setFooter(footertext, footerimage)
        .setAuthor(title + 'Pénis', null, null)
        .setColor(color);
        message.channel.send(Embed);  
    } else {
      if (users.size != 1) {
        let Embed = new Discord.MessageEmbed()
          .setDescription('Só podes saber o tamanho do pénis de uma pessoa de cada vez!')
          .setFooter(footertext, footerimage)
          .setAuthor(title + 'Pénis', null, null)
          .setColor(color);
        message.channel.send(Embed);
        
      } else {
        let Embed = new Discord.MessageEmbed()
            .setFooter(footertext, footerimage)
            .setAuthor(title + 'Pénis')
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`Pénis do ${user}:\n8${"=".repeat(Math.floor(Math.random() * 16))}D`)
            .setColor(color);
        message.channel.send(Embed);
      }
    }
}}