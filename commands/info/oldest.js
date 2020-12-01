const { formatDate } = require("../../functions");
const { MessageEmbed } = require("discord.js");
const { color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "oldest",
  category: "info",
  description: "Mostra a conta mais velha do servidor!",
  run: async (bot, message, args) => {
    let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => a.user.createdAt - b.user.createdAt)
      .first();
    const Embed = new MessageEmbed()
      .setTitle('Mythic  ◆ Oldest')
      .setColor(color)
      .setFooter(footertext, footerimage)
      .setDescription(
        `**${mem.user.username}** é o utilizador mais velho da **${message.guild.name}**!\n
        Data de criação da conta: \`${formatDate(mem.user.createdAt)}\``
      );
    message.channel.send(Embed);
  },
};
