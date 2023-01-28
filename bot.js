const { Client, Intents, Collection, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const ayarlar = require("./ayarlar.json");
const db = require("orio.db")
const message = require("./events/message");
let prefix = ayarlar.prefix;
const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, DiscordAPIError } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

let sunucuID = ayarlar.sunucuID;
let AboneRolID = ayarlar.AboneRolID
let AboneSorumlusuRolID = ayarlar.AboneSorumlusuRolID
let AboneLogKanalID = ayarlar.AboneLogKanalID
let KacakRolID = ayarlar.KacakRolID

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
  require(`./komutcalistirici`)(client);
}); 

client.on("ready", () => {
  require("./events/eventLoader")(client);
  let commands = client.guilds.cache.get(sunucuID).commands;

  commands.create({
    name:"abone-sil",
    description:"Abone olan bir kullanıcının aboneliğini silersin.",
    options:[{
      name:"kullanıcı",
      description:"Aboneliğini kaldıracağın kullanıcıyı seçmelisin.",
      type:"USER",
      required:true
    }]
  })
  commands.create({
    name:"abone",
    description:"İstediğin bir kullanıcıya abone rolü verirsin.",
    options:[{
      name:"kullanıcı",
      description:"Abone rolü vermek istediğin kullanıcıyı seçmelisin.",
      type:"USER",
      required:true
    }]
  })

});

client.on("interactionCreate", async(interaction) => {
  const { commandName, options } = interaction;

  if(commandName == "abone-sil") {
    if(!interaction.member.roles.cache.get(AboneSorumlusuRolID)) {
      interaction.reply({content:`Bu komutu uygulayabilmek için gerekli yetkiye sahip değilsin!`, ephemeral:true})
      return
    }
    let kullanici = options.getUser("kullanıcı")
    let kontrol = db.has(`abone-${kullanici.id}`)
    if(!kontrol) {
      interaction.reply({content:`Bu kullanıcının zaten aboneliği yok!`, ephemeral:true})
      return
    }
    db.delete(`abone-${kullanici.id}`)
    interaction.guild.members.cache.get(kullanici.id).roles.remove(AboneRolID).catch(console.error)
    console.log(`[BRAVE ABONELİK SİSTEMİ] ${kullanici.username} Adlı kullanıcının aboneliği ${interaction.member.user.username} tarafından silindi.`)
    interaction.reply({content:`> ${kullanici} Adlı kullanıcının aboneliği silindi.`})
    return
  }
  if(commandName == "abone") {
    if(!interaction.member.roles.cache.get(AboneSorumlusuRolID)) {
      interaction.reply({content:`Bu komutu uygulayabilmek için gerekli yetkiye sahip değilsin!`, ephemeral:true})
      return
    }
    
    let kullanici = options.getUser("kullanıcı")
    if(interaction.guild.members.cache.get(kullanici.id).roles.cache.get(AboneRolID)) {
      interaction.reply({content:`Bu kullanıcı zaten abone rolüne sahip!`, ephemeral:true})
      return
    }
    interaction.guild.members.cache.get(kullanici.id).roles.add(AboneRolID).catch(console.error)
    interaction.reply({content: `> ${kullanici} Adlı kullanıcıya abone rolü verildi.`})
    interaction.guild.channels.cache.get(AboneLogKanalID).send({content: `<:onaytik:970454776301109249> ${kullanici} Adlı kullanıcıya, ${interaction.member} tarafından **ABONE** verildi.`})
    db.set(`abone-${kullanici.id}`, true)
    return
  }
  if(interaction.customId == "dogrulama_mesaj_dogrula") {
    if(interaction.member.roles.cache.has("954390392214782063")) {
      rol = "954390392214782063"
      interaction.member.roles.remove(rol).catch(console.error)
      await interaction.reply({content: "Doğrulama işlemi başarılı. Yönlendiriliyorsunuz... ", ephemeral: true})
    }
    else{
      await interaction.reply({content: "Hesabın hâli hazırda doğrulanmış!", ephemeral: true})
      return
    }
    
  }
})

client.on("guildMemberAdd", async(member) => {

  if(member.guild.id == "970315341488074762") {
   let sorgula = db.fetch(`abone-${member.id}`)
   if(!sorgula) {
    member.roles.add(KacakRolID)
    member.send(`https://tenor.com/view/f%C4%B1rat-sobutay-f%C4%B1rat-firat-sobutay-firat-oha-diyorum-gif-24874080`)
    oda = "1068258860336423053"
    client.channels.cache.get(oda).send({content:`> ${member} Adlı üye, abone rolü olmadan sunucuya giriş yaptı.`})
    return
   }
  }
})
client.on("guildMemberRemove", async(member) => {
  if(member.guild.id == "954385412531564584") {
    member.send({content:`**Ana sunucuda kalmazsan altyapı sunucusuna erişemezsin!**
    discord.gg/WM3urgCR58
    https://tenor.com/view/mengsedih-gif-23325538`})
    db.delete(`abone-${member.id}`)
    client.channels.cache.get("1068612850018431137").send(`${member} Adlı kullanıcı ana sunucudan çıkış yaptı.`)
  }
})

client.login(ayarlar.token);
