const Discord = require("discord.js");
const { formatDate } = require("../../functions");
const { title, color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "serverinfo",
  category: "info",
  description: "Mostra informação sobre o servidor!",
  timeout: 10000,
  run: async (bot, message, args) => {
    let Embed = new Discord.MessageEmbed()
      .setFooter(footertext, footerimage)
      .setAuthor(title + 'Servidor', null, null)
      .setThumbnail(message.guild.iconURL())
      .addField("Nome", message.guild.name, true)
      .addField("Data de Criação", formatDate(message.guild.createdAt), true)
      .addField("Dono", '<@435911756469239808>', true)
      .addField("Região", message.guild.region, true)
      .addField("Membros", message.guild.memberCount, true)
      .addField("Bots", message.guild.members.cache.filter(member => member.user.bot === true).size, true)
      .setColor(color);

    cargos = message.guild.roles.cache.map(r => r).join(" ").replace("@everyone", "")

    if (cargos.length > 1024) {
        Embed.addField(`Cargos (${message.guild.roles.cache.size - 1})`, 'Demasiados cargos para exibir!')
    } else {
        Embed.addField(`Cargos (${message.guild.roles.cache.size - 1})`, cargos)
    }
    
  message.channel.send(Embed);
}};