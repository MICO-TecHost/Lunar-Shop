const Discord = require("discord.js");
const { formatDate } = require("../../functions");
const { color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "userinfo",
  category: "info",
  description: "Indica a latência do bot e a latência da API",
  timeout: 10000,
  run: async (bot, message, args) => {
    let user = message.mentions.users.first();
    let users = message.mentions.users;

    if (!user) {
      let Embed = new Discord.MessageEmbed()
        .setDescription('Tens de mencionar uma pessoa para poder mostrar os seus dados!')
        .setFooter(footertext, footerimage)
        .setAuthor("Mythic  ◆  Userinfo", null, null)
        .setColor(color);
        message.channel.send(Embed);  
    } else {
      if (users.size != 1) {
        let Embed = new Discord.MessageEmbed()
          .setDescription('Só podes ver os dados de uma pessoa de cada vez!')
          .setFooter(footertext, footerimage)
          .setAuthor("Mythic  ◆  Userinfo", null, null)
          .setColor(color);
        message.channel.send(Embed);
        
      } else {
        let Embed = new Discord.MessageEmbed()
            .setFooter(footertext, footerimage)
            .setAuthor(`Mythic  ◆  Userinfo  ◆  ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addField("Nome", user.username, true)
            .addField("Tag", "#" + user.discriminator, true)
            .addField("ID", user.id, true)
            .addField("Status", user.presence.status, true)
            .addField("Data de Criação", formatDate(user.createdAt), true)
            .addField("Juntou-se em", formatDate(message.guild.members.cache.get(user.id).joinedAt), true)
            .addField(`Cargos (${message.guild.members.cache.get(user.id).roles.cache.size - 1})`, message.guild.members.cache.get(user.id).roles.cache.map(r => r).join(" ").replace("@everyone", ""), false)
            .setColor(color);
        message.channel.send(Embed);
      }
    }
  }
};