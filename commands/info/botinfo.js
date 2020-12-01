const { MessageEmbed, version: djsversion } = require('discord.js');
const { title, color, footertext, footerimage } = require('../../config.json');
const { version } = require('../../package.json');
const { formatBytes, formatDate } = require("../../functions");
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

module.exports = {
  name: "botinfo",
  category: "info",
  description: "Indica a latência do bot e a latência da API",
  timeout: 5000,
  run: async (bot, message) => {
    const core = os.cpus()[0];
    
    let Embed = new MessageEmbed()
      .setTitle(title + 'BotInfo')
			.setThumbnail(bot.user.displayAvatarURL())
			.setColor(color)
			.addField('Geral', [
				`**Bot** > ${bot.user.tag} (${bot.user.id})`,
				`**Comandos** > ${bot.commands.size}`,
				`**Servidores** > ${bot.guilds.cache.size.toLocaleString()} `,
				`**Uilizadores** > ${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**Canais** > ${bot.channels.cache.size.toLocaleString()}`,
				`**Data de Criação** > ${formatDate(bot.user.createdAt)}`,
				`**Node.js** > ${process.version}`,
				`**Version** > v${version}`,
				`**Discord.js** > v${djsversion}`,
				'\u200b'
			])
			.addField('Developer', [
				'**Discord** > <@391706038698508299>',
				`**Steam** > [(Clica aqui)](http://steamcommunity.com/profiles/76561198985255524)`,
				`**Site** > [(Clica aqui)](http://micodesignservice.com)`,
			])
			.setFooter(footertext, footerimage);
		message.channel.send(Embed);
	},
};