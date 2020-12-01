const Discord = require("discord.js");
const weather = require('weather-js');
const { title, color, footertext, footerimage } = require('../../config.json');

module.exports = {
  name: "weather",
  category: "info",
  description: "Indica a latência do bot e a latência da API",
  timeout: 5000,
  run: async (bot, message, args) => {
    if (args.length < 1) {
      let Embed = new Discord.MessageEmbed()
        .setDescription('Tens de fornecer uma cidade!')
        .setFooter(footertext, footerimage)
        .setAuthor(`${title}Weather`, null, null)
        .setColor(color);
      message.channel.send(Embed); 
    } else {
      weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        if(result === undefined || result.length === 0) {
          let Embed = new Discord.MessageEmbed()
            .setDescription('Tens de fornecer uma cidade real!')
            .setFooter(footertext, footerimage)
            .setAuthor(`${title}Weather`, null, null)
            .setColor(color);
          message.channel.send(Embed);
        } else {
          var current = result[0].current;
          var location = result[0].location;

          let weatherinfo = new Discord.MessageEmbed()
            .setAuthor(`${title}Previsao meteorológica para ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(color)
            .addField('Fuso Horário', `UTC${location.timezone}`, true)
            .addField('Céu', current.skytext, true)
            .addField('Temperatura', `${current.temperature}°`, true)
            .addField('Vento', current.winddisplay, true)
            .addField('Sensação', `${current.feelslike}°`, true)
            .addField('Humidade', `${current.humidity}%`, true)
            .setFooter(footertext, footerimage)
          message.channel.send(weatherinfo)
        }

        
      })  
    }
  },
};