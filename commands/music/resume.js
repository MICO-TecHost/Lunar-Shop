const { MessageEmbed } = require("discord.js")
const { color } = require("../../config.json");

module.exports = {
  name: "resume",
  description: "Resume the Cureent Playing Song",
  execute(client, message, args) {
    let embed = new MessageEmbed()
      .setColor(color);

    const { channel } = message.member.voice;

    if (!channel) {
      embed.setAuthor("Precisas de estar num canal de voz.")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume()
      embed.setAuthor("✅ | A Retomar a música pausada")
      return message.channel.send(embed)
    }
    embed.setDescription("Não esta nada a tocar que eu pudesse retomar a música")
    message.channel.send(embed)

  }
}