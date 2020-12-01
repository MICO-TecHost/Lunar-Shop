const { MessageEmbed } = require("discord.js");
const { color, title, footerimage, footertext } = require('../../config.json');

module.exports = {
  name: "volume",
  description: "Mudar o volume da música",
  run: (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Você não tem permissão para alterar o volume da música")
    }

    let embed = new MessageEmbed().setColor(color);


    const { channel } = message.member.voice;
    if (!channel) {
      embed.setAuthor("Precisas de estar num canal de voz.")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("O Bot não está a reproduzir nada")
      return message.channel.send(embed);
    }

    if (!args[0]) {
      embed.setAuthor(`O volume atual é ${serverQueue.volume}`)
      return message.channel.send(embed)
    }

    if (isNaN(args[0])) {
      embed.setAuthor("Use apenas numéros")
      return message.channel.send(embed)
    }

    if (args[0] > 200) {
      embed.setAuthor("Vais rebentar com os ouvidos se atingires o limite de 200 💀")
      return message.channel.send(embed)
    }

    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
    embed.setAuthor(title + "Volume", null, null)
    embed.setDescription(`Volume definido para \`${args[0]}\``)
    embed.setFooter(footertext, footerimage)
    message.channel.send(embed)
  }
};
