const Minesweeper = require('discord.js-minesweeper');

module.exports = {
  name: "minesweeper",
  description: "DM a user in the guild",
  category: "fun",
  run: async (bot, message, args) => {
    const minesweeper = new Minesweeper({
      returnType: 'emoji'
    });
    var mines = minesweeper.start()
    message.channel.send(mines)
  },
};
