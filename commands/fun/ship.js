const { title, color, footertext, footerimage } = require('../../config.json');
const Canvas = require('canvas');
const Discord = require("discord.js");

module.exports = {
   name: "ship",
   description: "DM a user in the guild",
   category: "fun",
   timeout: 5000,
   run: async (bot, message, args) => {
      if (message.mentions.members.size != 2) {
         if (message.mentions.members.size > 2) {
            let Embed = new Discord.MessageEmbed()
               .setDescription('Só podes Shippar dois usuários de cada vez!')
               .setFooter(footertext, footerimage)
               .setAuthor(title + "Ship", null, null)
               .setColor(color);
            message.channel.send(Embed)
         } else {
            let Embed = new Discord.MessageEmbed()
               .setDescription('Precisas de mencionar dois usuários')
               .setFooter(footertext, footerimage)
               .setAuthor(title + "Ship", null, null)
               .setColor(color);
            message.channel.send(Embed)
         }
      } else {
         let canvas = Canvas.createCanvas(384, 128);
         let ctx = canvas.getContext('2d');
         
         let membro1 = message.mentions.members.first()
         let membro2 = message.mentions.members.last()
   
         const amor = Math.floor(Math.random() * 100);
         const loveIndex = Math.floor(amor / 10);
         const lovelvl = "█".repeat(loveIndex) + ".".repeat(10 - loveIndex);

         let nomeFin1 = membro1.user.username.length;
         let nomeFin2 = membro2.user.username.length;

         let calc1 = nomeFin1 - 3
         let calc2 = nomeFin2 - 3

         if (amor > 60) {
            nomeship = membro1.user.username.slice(0, 3) + membro2.user.username.slice(0, 3);
         } else if (amor >= 40) {
            nomeship = membro1.user.username.slice(0, calc1) + membro2.user.username.slice(0, calc2);
         } else {
            nomeship = membro1.user.username.slice(calc1, nomeFin1) + membro2.user.username.slice(calc2, nomeFin2);
         }

         if (amor > 90) {
            emoticon = ("images/heart.png");
         } else if (amor > 65) {
            emoticon = ("images/apaixonado.png");
         } else if (amor >= 40) {
            emoticon = ("images/tantofaz.png");
         } else {
            emoticon = ("images/chora.png");
         }


         if (amor > 90) {
            desc = (":sparkling_heart: **Será que vai acontecer?** :sparkling_heart:\n``" + membro1.user.username + "``\n``" + membro2.user.username + "``\n :smiling_face_with_3_hearts: ``" + nomeship + "`` Este é o casal perfeito. Parece que foram feitos um para o outro :smiling_face_with_3_hearts:");
         } else if (amor >= 70) {
            desc = (":sparkling_heart: **Será que vai acontecer?** :sparkling_heart:\n``" + membro1.user.username + "``\n``" + membro2.user.username + "``\n :wink: ``" + nomeship + "`` As possibilidades de ter este casal são muito altas :wink:");
         } else if (amor >= 50) {
            desc = (":sparkling_heart: **Será que vai acontecer?** :sparkling_heart:\n``" + membro1.user.username + "``\n``" + membro2.user.username + "``\n :no_mouth: ``" + nomeship + "`` Se os dois quiserem muito talvez funcione :no_mouth:");
         } else if (amor >= 35) {
            desc = (":sparkling_heart: **Será que vai acontecer?** :sparkling_heart:\n``" + membro1.user.username + "``\n``" + membro2.user.username + "``\n :frowning2: ``" + nomeship + "`` Acho que não iria funcionar como casal :frowning2:");
         } else {
            desc = (":sparkling_heart: **Será que vai acontecer?** :sparkling_heart:\n``" + membro1.user.username + "``\n``" + membro2.user.username + "``\n :sob: ``" + nomeship + "`` Eu queria muito dizer que é possível, mas... :sob:");
         }

         const emote = await Canvas.loadImage(emoticon)
         const foto1 = await Canvas.loadImage(membro1.user.displayAvatarURL({ format: "png" }))
         const foto2 = await Canvas.loadImage(membro2.user.displayAvatarURL({ format: "png" }))

         ctx.drawImage(emote, 125, 0, 128, 128)
         ctx.drawImage(foto1, -10, 0, 128, 128)
         ctx.drawImage(foto2, 260, 0, 128, 128)

         const amorat = new Discord.MessageAttachment(canvas.toBuffer(), 'chances-image.png')

         let loveEmbed = new Discord.MessageEmbed()
            .setDescription("**" + amor + "%** [`" + lovelvl + "`]")
            .attachFiles([amorat]).setImage('attachment://chances-image.png')
            .setFooter(footertext, footerimage)
            .setAuthor(title + "Ship", null, null)
            .setColor(color);
         message.channel.send(desc, loveEmbed)
}
   
  }
};