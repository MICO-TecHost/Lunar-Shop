const { MessageEmbed } = require("discord.js");
const { color } = require("../../config.json");

module.exports = {
  name: "drop",
  description: "Drop The Song From Queue",
  run: (client, message, args) => {
    let embed = new MessageEmbed().setColor(color);
    const { channel } = message.member.voice;
    if (!channel) {
      embed.setAuthor("Precisas de estar num canal de voz.");
      return message.channe.send(embed);
    }

    const serverQueue = client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("A Lista está vazia");
      return message.channel.send(embed);
    }

    if (isNaN(args[0])) {
      embed.setAuthor("Use apenas numéros")
      return message.channel.send(embed)
    }

    if (args[0] > serverQueue.songs.length) {
      embed.setAuthor("Incapaz de encontrar esta música")
      return message.channel.send(embed)
    }

    serverQueue.songs.splice(args[0] - 1, 1)
    embed.setDescription(`**Passou ${args[0]} música(s) a frente**`)
    return message.channel.send(embed)
  }
};
