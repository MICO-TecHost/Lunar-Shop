const { MessageEmbed } = require("discord.js")
const { color } = require("../../config.json");

module.exports = {
  name: "np",
  description: "Recolhe o nome da musica que esta a dar",
  run: (client, message, args) => {
    let embed = new MessageEmbed()
      .setColor(color)

    const { channel } = message.member.voice;
    if (!channel) {
      embed.setAuthor("Precisas de estar num canal de voz")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("O bot não está reproduzir nada!")
      return message.channel.send(embed);
    }

    embed.setDescription(`**A TOCAR AGORA** - \`${serverQueue.songs[0].title}\``)
      .setThumbnail(serverQueue.songs[0].thumbnail)
    message.channel.send(embed)
  }
}