const { title, color, footertext, footerimage } = require('../../config.json');
const { removereaction } = require("../../functions");
const Discord = require("discord.js");

module.exports = {
   name: "help",
   description: "DM a user in the guild",
   category: "info",
   timeout: 5000,
   run: async (bot, message, args, prefix) => {
      const ajuda = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(title + "Help")
      .setDescription("Reage de acordo com o que procuras!\n\n📚 - Informações\n\n🎵 - Música\n\n⚔️ - Administrativos\n\n🎊 - Diversão")  
      .setFooter(footertext, footerimage)
    
      message.channel.send(ajuda).then(msg => {
         msg.react('📚').then(r => {
            msg.react('🎵').then(r => {
               msg.react('⚔️').then(r => {
                  msg.react('🎊')
               })
            })
         }) 

      const notauthorFilter = (reaction, user) => reaction.emoji.name != '📚' && reaction.emoji.name != '🎵' && reaction.emoji.name != '⚔️' && reaction.emoji.name != '🎊' && user.id != bot.user.id;
      const notauthor = msg.createReactionCollector(notauthorFilter);

      notauthor.on('collect', reaction => {
         reaction.remove()
      })

      const notemojiFilter = (reaction, user) => reaction.emoji.name != '📚' && reaction.emoji.name != '🎵' && reaction.emoji.name != '⚔️' && reaction.emoji.name != '🎊' && user.id != bot.user.id;
      const notemoji = msg.createReactionCollector(notemojiFilter);

      notemoji.on('collect', user => {
         removereaction(msg, user.id)
      })
    
      const infFilter = (reaction, user) => reaction.emoji.name === '📚' && user.id === message.author.id;
      const mscFilter = (reaction, user) => reaction.emoji.name === '🎵' && user.id === message.author.id;
      const admFilter = (reaction, user) => reaction.emoji.name === '⚔️' && user.id === message.author.id;
      const funFilter = (reaction, user) => reaction.emoji.name === '🎊' && user.id === message.author.id;
    
      const inf = msg.createReactionCollector(infFilter);
      const msc = msg.createReactionCollector(mscFilter);
      const adm = msg.createReactionCollector(admFilter);
      const fun = msg.createReactionCollector(funFilter);
      
      let descinf = ''
      bot.commands.forEach(command => {
         if (command.category == 'info') {
            descinf += `**${prefix+command.name}** > ${command.description}\n`
         }
      });

      let descadm = ''
      bot.commands.forEach(command => {
         if (command.category == 'moderation') {
            descadm += `**${prefix+command.name}** > ${command.description}\n`
         }
      });

      let descfun = ''
      bot.commands.forEach(command => {
         if (command.category == 'fun') {
            descfun += `**${prefix+command.name}** > ${command.description}\n`
         }
      });


      inf.on('collect', reaction => {
         ajuda.setTitle("Comandos informativos!")
         ajuda.setDescription(descinf)
         removereaction(msg, message.author.id)
         msg.edit(ajuda)
      })

      msc.on('collect', reaction => {
         ajuda.setTitle("Comandos de Música!")
         ajuda.setDescription(`**${prefix}play ou p [title/url]** > \`Comando para por música do youtube\`\n**${prefix}skip** > \`Comando para dar skip para a próxima música\`\n**${prefix}disconnect** > \`Comando para dar disconnect ao bot do canal de voz\`\n**${prefix}loop** > \`Comando para repetir a música infinitamente\` \n**${prefix}volume** > \`Comando para mudar o volume da música\` \n **${prefix}stop** > \`Comando para parar a música\` \n **${prefix}resume** > \`Comando para continuar a música\` \n **${prefix}np** > \`Comando para ver que música esta a reproduzir o bot\` \n **${prefix}lyrics [title]** > \`Comando para ver as lyrics de uma música\` \n **${prefix}fila** > \`Comando para ver a lista de músicas que o bot vai reproduzir\` \n **${prefix}jump** > \`Comando para saltar para o número da música que o utilizador quiser\` \n **${prefix}drop** > \`Igual ao Jump so que so muda de música quando a música que estiver a ser reproduzida acabar\``)
         removereaction(msg, message.author.id)
         msg.edit(ajuda)
      })
    
      adm.on('collect', reaction => {
         ajuda.setTitle("Comandos de Administração!")
         ajuda.setDescription(descadm)
         removereaction(msg, message.author.id)
         msg.edit(ajuda)
      })
    
      fun.on('collect', reaction => {
         ajuda.setTitle("Comandos de Diversão!")
         ajuda.setDescription(descfun)
         removereaction(msg, message.author.id)
         msg.edit(ajuda)
      })
   })  
   }
};