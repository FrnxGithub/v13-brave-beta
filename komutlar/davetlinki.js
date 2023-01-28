const Discord = require("discord.js");
const { MessageActionRow, MessageButton, DiscordAPIError } = require('discord.js');



module.exports = {
    calistir: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return
        const button = new Discord.MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("LINK")
            .setLabel("Altyapı Sunucusu İçin Tıkla")
            .setURL("https://discord.gg/gR7tJYvV8s")
        )
        message.channel.send({components: [button]})

},

name: "davet",
description: "",
aliases: [],
kategori: "",
usage: "",
}