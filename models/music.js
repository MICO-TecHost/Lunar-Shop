const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require("discord.js")
const { QUEUE_LIMIT, color, footerimage, footertext, title } = require("../config.json");

module.exports = {
  async play(song, message) {
    const queue = message.client.queue.get(message.guild.id);
    let embed = new MessageEmbed()
      .setColor(color);

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      embed.setAuthor("As músicas da fila acabaram!")
      return queue.textChannel
        .send(embed)
        .catch(console.error);
    }

    try {
      var stream = await ytdlDiscord(song.url, {
        highWaterMark: 1 << 25
      });
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      if (error.message.includes === "copyright") {
        return message.channel.send("ESTE VÍDEO CONTÉM CONTEÚDO DE COPYRIGHT");
      } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
      .play(stream, { type: "opus" })
      .on("finish", () => {
        if (queue.loop) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", console.error);

    dispatcher.setVolumeLogarithmic(queue.volume / 100); //VOLUME
    embed.setDescription(`🎶  **|**  A Tocar: **[${song.title}](${song.url})**`)
      .setThumbnail(song.thumbnail)

    queue.textChannel
      .send(embed)
      .catch(err => message.channel.send("INCAPAZ DE TOCAR MUSICA"));
  }
};
