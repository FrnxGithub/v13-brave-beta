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
         
         <:yuvarlak:1068266665881645188> ` + "`" + "Doğrula" + "`" + ` Butonuna tıkla ve başla.
         <:yuvarlak:1068266665881645188> ` + "`" + "Kurallar" + "`" + ` Butonuna tıkla ve kuralları öğren.`)
        .setThumbnail("https://images-ext-2.discordapp.net/external/VbxN5Q0KuLGSXlLnNzfrwL8oGbJbWv8qXYCjp7teWyk/%3Fwidth%3D328%26height%3D328/https/images-ext-2.discordapp.net/external/4atn2ZUEEGYsx-WE0yX6V_DEk6RecoNAPZlu9xiv-eM/%253Fwidth%253D410%2526height%253D410/https/images-ext-2.discordapp.net/external/MXQoecH_l_TDo8KBSTCtqVr-_IuZMCJyBou2OR6i-3s/https/i.ibb.co/gSfnDYh/icon.png")
        .setImage("https://images-ext-2.discordapp.net/external/DDvxcT1aVxriQfQ7x7tL7WDf8RIE1NUEvEra7LFdGxk/%3Fwidth%3D600%26height%3D6/https/images-ext-2.discordapp.net/external/t2WkQ-mOyyHxOrWUmMw815bu_OEvjWcbdc_R-ogcyD4/https/i.ibb.co/2ckD5SY/footer-gradient.png?width=480&height=5")

        url = "https://discord.com/channels/954385412531564584/954471811003875468"
        const buton = new Discord.MessageActionRow()
        .addComponents(
          new MessageButton()
            .setStyle("SUCCESS")
            .setLabel("Doğrula")
            .setCustomId("dogrulama_mesaj_dogrula"),
          new MessageButton()
            .setStyle("LINK")
            .setLabel("Kurallar")
            .setURL(url)
        )

            message.channel.send({embeds:[embed], components:[buton]})

    },

    name: "doğrula-mesaj",
    description: "Doğrulama mesajını göndertirsin.",
    aliases: ["dm"],
    kategori: "",
    usage: "",
}