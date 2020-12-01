const { MessageEmbed } = require("discord.js");
const { color } = require('../../config.json');
const { footertext } = require('../../config.json');
const { footerimage } = require('../../config.json');
const api = require("imageapi.js");
module.exports = {
  name: "reddit",
  description: "Get a meme from a subreddit of your choice!",
  category: "fun",
  usage: "<subreddit>",
  run: async (bot, message, args) => {
    let Subreddit = message.content.slice(8);
    if (!Subreddit)
      return message.channel.send(`You did not specify your subreddit!`);
    try {
      let img = await api(Subreddit, true);
      const Embed = new MessageEmbed()
        .setTitle(`Imagem aleatória de r/${Subreddit}`)
        .setColor(color)
        .setImage(img)
        .setURL(`https://reddit.com/r/${Subreddit}`)
        .setFooter(footertext, footerimage  )
      message.channel.send(Embed);
    } catch (err) {
      message.channel.send(err);
    }
  },
};
