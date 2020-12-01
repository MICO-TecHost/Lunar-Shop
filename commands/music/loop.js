const { MessageEmbed } = require("discord.js")
const { color } = require("../../config.json");

module.exports = {
  name: "loop",
  description: "Loop the Music",
  run: (client, message, args) => {
    let embed = new MessageEmbed()
      .setColor(color);
    const { channel } = message.member.voice;
    if (!channel) {
      embed.setAuthor("Precisas de estar num canal de voz.")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Não esta nada a tocar que eu pudesse dar loop")
      return message.channel.send(embed);
    }

    serverQueue.loop = !serverQueue.loop

    embed.setDescription(`:repeat: **|** Loop está agora **${serverQueue.loop ? "Ativado" : "Desativado"}**`)
    message.channel.send(embed)
  }
}