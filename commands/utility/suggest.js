const Discord = require("discord.js");
const { title, color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "sugerir",
  category: "utility",
  description: "Indica a latência do bot e a latência da API",
  timeout: 5000,
  run: async (bot, message, args, prefix) => {
    let text = message.content.substr(prefix.length+7);

    if (!text) {
      let Embed = new Discord.MessageEmbed()
        .setDescription('Tens de intrduzir uma sugestão!')
        .setFooter(footertext, footerimage)
        .setAuthor(title + "Sugestões", null, null)
        .setColor(color);
      message.channel.send(Embed)
    } else {
      let Embed = new Discord.MessageEmbed()
        .addField(`Sugestão do ${message.author.username}:`, text + `\nEscreve \`${prefix}sugerir (sugestão)\` para fazer um sugestão!`, false)
        .setFooter(footertext, footerimage)
        .setAuthor(title + "Sugestões", null, null)
        .setColor(color);
      await message.channel.send(Embed).then(msg => {
        msg.react('✅').then(() => {
          msg.react('❎')
        })
      })
    }
  }
}