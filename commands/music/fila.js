const { MessageEmbed } = require("discord.js");
const { footertext, footerimage, color, title } = require('../../config.json');

module.exports = {
  name: "fila",
  description: "Ver todas as musicas que estao na queue",
  run: (client, message, args) => {
    let embed = new MessageEmbed().setColor(color);
    const { channel } = message.member.voice;

    if (!channel) {
      embed.setAuthor("Precisas de estar num canal de voz.");
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Não há nada na fila");
      return message.channel.send(embed);
    }

    embed.setDescription(
      `${serverQueue.songs
        .map((song, index) => index + 1 + ". " + `\`${song.title}\``)
        .join("\n\n")}`,
      { split: true }
    );

    message.channel.send(embed);
  }
};
