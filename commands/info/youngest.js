const { formatDate } = require("../../functions");
const { MessageEmbed } = require("discord.js");
const { color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "youngest",
  category: "info",
  description: "Mostra a conta mais nova do servidor!",
  run: async (bot, message, args) => {
    let mem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => b.user.createdAt - a.user.createdAt)
      .first();
      const Embed = new MessageEmbed()
      .setTitle('Mythic  ◆  Youngest')
      .setColor(color)
      .setFooter(footertext, footerimage)
      .setDescription(
        `**${mem.user.username}** é o utilizador mais novo da **${message.guild.name}**!\n
        Data de criação da conta: \`${formatDate(mem.user.createdAt)}\``
      );
    message.channel.send(Embed);
  },
};
