const Timeout = new Set();
const { MessageEmbed, Message, Client } = require("discord.js");
const { prefix, footerimage, footertext, color } = require("../../config.json");
const ms = require("ms");
const custom = require("../../models/custom");
/**
 * @param {Client} bot
 * @param {Message} message
 */
module.exports = async (bot, message) => {
  message.channel.messages.fetch();
  if (message.author.bot) return;

  if (!message.content.toLowerCase().startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (!message.guild) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = bot.commands.get(cmd);
  if (!command) command = bot.commands.get(bot.aliases.get(cmd));

  if (command) {
    if (command.timeout) {
      if (Timeout.has(`${message.author.id}${command.name}`)) {
        let Embed = new MessageEmbed()
          .setFooter(footertext, footerimage)
          .setDescription(`Tens de esperar ${ms(command.timeout)} entre cada utilização do comando ${command.name}`)
          .setAuthor("RVG  ≫  Cooldown", null, null)
          .setColor(color);
        message.channel.send(Embed)
      } else {
        command.run(bot, message, args, prefix);
        Timeout.add(`${message.author.id}${command.name}`);
        setTimeout(() => {
          Timeout.delete(`${message.author.id}${command.name}`);
        }, command.timeout);
      }
    } else {
      command.run(bot, message, args);
    }
  } else {
    let Embed = new MessageEmbed()
      .setDescription("Não entendi o comando: " + "``" + cmd + "``.\n" + "Faz ``" + prefix + "help`` para veres os comandos disponíveis!")
      .setFooter(footertext, footerimage)
      .setAuthor("RVG  ≫  Erro", null, null)
      .setColor(color);
    message.channel.send(Embed)

    custom.findOne(
      { Guild: message.guild.id, Command: cmd },
      async (err, data) => {
        if (err) throw err;
        if (data) return message.channel.send(data.Content);
        else return;
      }
    );
  }
};
