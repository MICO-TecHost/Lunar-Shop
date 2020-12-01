const { MessageEmbed } = require("discord.js")
const Genius = new (require("genius-lyrics")).Client("ZD_lLHBwRlRRfQvVLAnHKHksDHQv9W1wm1ZAByPaYo1o2NuAw6v9USBUI1vEssjq");
const { color, footertext, footimage, title } = require("../../config.json");

module.exports = {
  name: "lyrics",
  description: "Procurar as Lyrics das músicas",
  run: async (client, message, args) => {
    let embed = new MessageEmbed()
      .setDescription("A Procura das Lyrics ...")
      .setColor(color)

    if (!args.length) {
      return message.channel.send("Dê me o nome da música")
    }

    const msg = await message.channel.send(embed)
    try {
      const songs = await Genius.tracks.search(args.join(" "));
      const lyrics = await songs[0].lyrics();

      if (lyrics.length > 4095) {
        msg.delete()
        return message.channel.send('As Lyrics são muito longas para serem retornadas como embed');
      }
      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setColor(color)
          .setDescription(lyrics.trim());
        return msg.edit(lyricsEmbed);
      } else {
        // lyrics.length > 2048
        const firstLyricsEmbed = new MessageEmbed()
          .setColor(color)
          .setDescription(lyrics.slice(0, 2048));
        const secondLyricsEmbed = new MessageEmbed()
          .setColor(color)
          .setDescription(lyrics.slice(2048, lyrics.length));
        msg.edit(firstLyricsEmbed);
        message.channel.send(secondLyricsEmbed);
        return;
      }


    } catch (e) {

      embed.setDescription("Erro : " + e)
      msg.edit(embed)
      console.log(e);
    }


  }

}