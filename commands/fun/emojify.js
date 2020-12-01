const Discord = require("discord.js");
const { isNumeric, isLetter, num_to_word } = require("../../functions");
const { color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "emojify",
  category: "fun",
  description: "Indica a latência do bot e a latência da API",
  timeout: 5000,
  run: async (bot, message, args, prefix) => {
    let user = message.mentions.users.first();
    if (!message.content.substr(9).trim().length) {
      let Embed = new Discord.MessageEmbed()
          .setDescription("Tens de fornecer texto!")
          .setFooter(footertext, footerimage)
          .setAuthor("Mythic  ◆  Emojify", null, null)
          .setColor(color);
      message.channel.send(Embed);
    } else {
      const s = message.content.substr(prefix.length+7).split('');

      for (i = 0; i < s.length; i++) {
          if (s[i] == ' ') {
            s[i] = '  '

          } else if (isNumeric(s[i]) == true) {
            s[i] = `:${num_to_word(s[i])}:`

          }  else if (s[i] == 'ç' || s[i] == 'Ç') {
            s[i] = ':regional_indicator_c:'

          } else if (s[i] == 'é' || s[i] == 'É') {
            s[i] = ':regional_indicator_e:'

          } else if (s[i] == 'ì' || s[i] == 'Ì' || s[i] == 'í' || s[i] == 'Í') {
            s[i] = ':regional_indicator_i:'

          } else if (s[i] == "#") {
            s[i] = ':hash:';

          } else if (s[i] == "!") {
            s[i] = ':grey_exclamation:';

          } else if (s[i] == "?") {
            s[i] = ':grey_question:';

          } else if (isLetter(s[i]) == false) {
            s[i] = `${s[i]}`

          } else {
            s[i] = `:regional_indicator_${s[i].toLowerCase()}:`;
          }
      }
      message.channel.send(s.join(''))
    }
}};