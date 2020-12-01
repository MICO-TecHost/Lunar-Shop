const { MessageEmbed } = require("discord.js")
const { color } = require("../../config.json");

module.exports = {
  name: "jump",
  description: "Saltar para a musica que quiser",
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
      embed.setAuthor("There is nothing playing that i could loop")
      return message.channel.send(embed);
    }
    if (!args[0]) {
      embed.setAuthor(`Por favor escolha o número da música`)
      return message.channel.send(embed)
    }

    if (isNaN(args[0])) {
      embed.setAuthor("Use apenas numéros")
      return message.channel.send(embed)
    }

    if (serverQueue.songs.length < args[0]) {
      embed.setAuthor("Incapaz de encontrar esta música na fila")
      return message.channel.send(embed)
    }
    serverQueue.songs.splice(0, Math.floor(parseInt(args[0]) - 1))
    serverQueue.connection.dispatcher.end()

    embed.setTitle(`Saltou para a música número - ${args[0]}`)
    message.channel.send(embed)

  }
}