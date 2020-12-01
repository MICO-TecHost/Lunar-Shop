module.exports = async (bot) => {
  console.log("\nBot " + bot.user.username + " is online!\nDeveloped by MICO")

  const activities_list = [
    '!help', 
    `em ${bot.guilds.cache.size.toLocaleString()} servidores!`,
    '!help', 
    `em ${bot.guilds.cache.size.toLocaleString()} servidores!`
  ];

  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    bot.user.setActivity(activities_list[index], { type: 'WATCHING' });
  }, 10000)
};
