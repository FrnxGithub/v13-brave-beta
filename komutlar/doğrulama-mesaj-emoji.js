const Discord = require("discord.js");
const { MessageActionRow, MessageButton, DiscordAPIError } = require('discord.js');
const { link } = require("snekfetch");



module.exports = {
    calistir: async (client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return

        message.delete()

        const embed = new Discord.MessageEmbed()
        .setColor("#37383f")
        .setAuthor({name: "Brave Studios'a hoş geldin", iconURL:"https://cdn.discordapp.com/emojis/1065318299874897940.gif?size=44&quality=lossless"})
        .setDescription(`Sunucuya tam erişim elde etmek için aşağıdaki
         doğrulama işlemini tamamlamanız gerekiyor.
         
         <:onaytik:970454776301109249> **Emojisine** tıkla ve **başla**.
         `)
        .setThumbnail("https://images-ext-2.discordapp.net/external/VbxN5Q0KuLGSXlLnNzfrwL8oGbJbWv8qXYCjp7teWyk/%3Fwidth%3D328%26height%3D328/https/images-ext-2.discordapp.net/external/4atn2ZUEEGYsx-WE0yX6V_DEk6RecoNAPZlu9xiv-eM/%253Fwidth%253D410%2526height%253D410/https/images-ext-2.discordapp.net/external/MXQoecH_l_TDo8KBSTCtqVr-_IuZMCJyBou2OR6i-3s/https/i.ibb.co/gSfnDYh/icon.png")
        .setImage("https://images-ext-2.discordapp.net/external/DDvxcT1aVxriQfQ7x7tL7WDf8RIE1NUEvEra7LFdGxk/%3Fwidth%3D600%26height%3D6/https/images-ext-2.discordapp.net/external/t2WkQ-mOyyHxOrWUmMw815bu_OEvjWcbdc_R-ogcyD4/https/i.ibb.co/2ckD5SY/footer-gradient.png?width=480&height=5")

        

            message.channel.send({embeds:[embed]})

    },

    name: "doğrula-mesaj-emoji",
    description: "Emojili Doğrulama mesajını göndertirsin.",
    aliases: ["dme"],
    kategori: "",
    usage: "",
}