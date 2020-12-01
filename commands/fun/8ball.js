const { MessageEmbed } = require("discord.js");
const { title, color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "8ball",
  description: "Dá uma responsta aleatória!",
  category: "fun",
  run: async (bot, message, args) => {
    let question = message.content.substr(bot.prefix.length + 6);
    if (!question) {
      let Embed = new MessageEmbed()
        .setTitle('Mythic  ◆  8Ball')
        .setDescription('Tens de fornecer uma pergunta!')
        .setColor(color)
        .setFooter(footertext, footerimage)
      return message.channel.send(Embed)
    }
    else {
      let answers = [
        "Sim",
        "Não",
        "Talvez",
        "Não me apetece responder",
        "Óbvio",
        "Nunca"
      ];

      if (!question.endsWith('?')) question = question + '?'

      let answer = answers[Math.floor(Math.random() * answers.length)];
      let Embed = new MessageEmbed()
        .addField(`Questão de ${message.author.username}:`, question, false)
        .addField('Resposta:', answer, false)
        .setFooter(footertext, footerimage)
        .setAuthor(title + '8ball', null, null)
        .setColor(color);
      message.channel.send(Embed);
    }
  },
};
