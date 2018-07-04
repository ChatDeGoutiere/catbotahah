const Discord = require("discord.js");
const fs = require("fs-extra")

const client = new Discord.Client();
const weather = require('weather-js');
const YTDL = require("ytdl-core");
const queue = new Map();
const ms = require("ms");
var token = "NDQ0MTU4NDg3ODc0NzY0ODE1.DgwIbQ.yMaT5utg9267n4afofwLaMHBJOA";
var prefix = "/"; 
let xp = require("./xp.json");

client.on("ready" , () => {
    console.log("BOT : [ON]");
    client.user.setActivity("CatBot | /help | v. 1.1.5 | /install | " + client.guilds.size + " Serveurs | " + client.users.size + " Utilisateurs." , {
      'type' : 'STREAMING',
      'url' : "https://www.twitch.tv/supers_fanne"
    }
);
});

client.on('guildCreate', (guild) => {
var cc = new Discord.RichEmbed()
.setColor("#01DF01") 
.setDescription("**CatBot vous a rejoint avec succès ! ✅**")
.setFooter("Commandes principales : /install | /help") 
guild.owner.send(cc)
console.log(`CatBot a rejoint ${guild.name} qui a pour owner ${guild.owner.user.tag} et qui compte ${guild.memberCount} membres.`)
});



client.on(`guildMemberAdd`, member => {
var bvnembed = new Discord.RichEmbed()
  .setColor("#339999")
  .setTitle("Arrivée d'un nouveau membre.")
  .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "**Bienvenue à " + member.user.tag + " sur le serveur ! **")
  .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","--------------------------------------------------------")
  .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Arrivée d'un membre ➡ " + member.user.id);
member.guild.channels.find('name', 'bienvenue').send(bvnembed).catch();})

client.on(`guildMemberRemove`, member => {
  var leaveembed = new Discord.RichEmbed()
    .setColor("#339999")
    .setTitle("Départ d'un membre.")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "**Aurevoir " + member.user.tag + " ! Bonne continuation à toi ! **")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","--------------------------------------------------------")
    .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Départ d'un membre ➡ " + member.user.id);
  member.guild.channels.find('name', 'bienvenue').sendEmbed(leaveembed).catch();})
  

client.on(`messageDelete`, message => {
  var msgdellogs_embed = new Discord.RichEmbed()
.setColor("#339999")
.setDescription("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
.addField(`Message :`, ` ${message.cleanContent} `)
.addField(`Auteur :`, `<@${message.author.id}>`)
.addField(`Salon :`, `${message.channel}`)
.addField("Par :", `${message.member.tag}`)
.addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","-------------------------------------")
.setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Suppression d'un  message ")
let logChannel = message.guild.channels.find('name', 'logs');
if (logChannel != undefined) {
    logChannel.send(msgdellogs_embed).catch();
}
})










client.on(`message`, async function(message)  {
  var authorid = message.author.id


if(message.content === prefix + "invite"){
  message.delete();
    var invite_embed = new Discord.RichEmbed()
    .setTitle("Voici le lien pour inviter ᴄᴀᴛʙᴏᴛ sur votre serveur : ")
    .setDescription("**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**")
    .addField("Cliquez ici pour accéder à la Page :","[--> :cat:](https://discordapp.com/api/oauth2/authorize?client_id=444158487874764815&permissions=2146958583&scope=bot)")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","------------------------------------------")
    .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Commande exécutée : /invite ")
    .setColor("#339999")
    message.author.send(invite_embed); 
    message.channel.send("**Le lien pour inviter ᴄᴀᴛʙᴏᴛ sur votre serveur vous a été envoyé par message privé, vérifiez qu'ils soient bien actifs.**").then(function (message) { message.react("📬") }) 
    console.log("La commande /invite a fonctionné et a été exécutée Par :"+message.author.username);
}






if(message.content === "listbot"){
  message.channel.send(client.guilds.size + " | " + client.users.size );
  }

if (message.content.startsWith(prefix+ "vcs")) { 
  message.delete();
  let argson = message.content.split(" ").slice(1);
  let vcsmsg = argson.join(" ")
  if(!message.guild.channels.find("name", "catvcs")) return message.reply(":x: **Vous devez créer le salon `catvcs` !** :x:");
  if(message.channel.name !== "catvcs") return message.reply(":x: **Veuillez exécuter cette commande dans la salon `catvcs` !** :x:");
  if(!vcsmsg) return message.reply(":x: **Veuillez indiquer un message à diffuser !** :x:");

  if(message.author.id === "390948313601671168"){
    var vcs_embed = new Discord.RichEmbed()
    .setColor('#339999')
    .setThumbnail(message.author.avatarURL)
    .setTitle("🌐 ᴄᴀᴛʙᴏᴛ 🌐")
    .addField(vcsmsg, "```▬▬▬▬▬⭐ ғση∂αтευя ⭐▬▬▬▬▬```")
    .setFooter(message.author.tag + " ➡ " + message.guild.name).setTimestamp()
    client.channels.findAll('name', 'catvcs').map(channel => channel.send(vcs_embed).catch());
    console.log(message.author.tag + " a envoyé un message VCS à partir du serveur " + message.guild.name + ". Il a écrit : " + vcsmsg)
  } else {
    if(message.author.id === "389367495766573056"){
      var vcs_embed = new Discord.RichEmbed()
      .setColor('#339999')
      .setThumbnail(message.author.avatarURL)
      .setTitle("🌐 ᴄᴀᴛʙᴏᴛ 🌐")
      .addField(vcsmsg, "```▬▬▬▬▬▬▬▬⭐ vιρ ⭐▬▬▬▬▬▬▬▬```")
      .setFooter(message.author.tag + " ➡ " + message.guild.name).setTimestamp()
      client.channels.findAll('name', 'catvcs').map(channel => channel.send(vcs_embed).catch());
      console.log(message.author.tag + " a envoyé un message VCS à partir du serveur " + message.guild.name + ". Il a écrit : " + vcsmsg)
  
      if(message.author.id === "394410098509873152"){
        var vcs_embed = new Discord.RichEmbed()
        .setColor('#339999')
        .setThumbnail(message.author.avatarURL)
        .setTitle("🌐 ᴄᴀᴛʙᴏᴛ 🌐")
        .addField(vcsmsg, "```▬▬▬▬▬▬⭐ ραятεηαιяε ⭐▬▬▬▬▬▬```")
        .setFooter(message.author.tag + " ➡ " + message.guild.name).setTimestamp()
        client.channels.findAll('name', 'catvcs').map(channel => channel.send(vcs_embed).catch());
        console.log(message.author.tag + " a envoyé un message VCS à partir du serveur " + message.guild.name + ". Il a écrit : " + vcsmsg)
      } else {
        if(message.author.id === "193092758267887616"){
          var vcs_embed = new Discord.RichEmbed()
          .setColor('#339999')
          .setThumbnail(message.author.avatarURL)
          .setTitle("🌐 ᴄᴀᴛʙᴏᴛ 🌐")
          .addField(vcsmsg, "```▬▬▬▬▬▬▬▬⭐ vιρ ⭐▬▬▬▬▬▬▬▬```")
          .setFooter(message.author.tag + " ➡ " + message.guild.name).setTimestamp()
          client.channels.findAll('name', 'catvcs').map(channel => channel.send(vcs_embed).catch());
          console.log(message.author.tag + " a envoyé un message VCS à partir du serveur " + message.guild.name + ". Il a écrit : " + vcsmsg)
        } else {

          if(message.author.id === "417795915810603019"){
            var vcs_embed = new Discord.RichEmbed()
            .setColor('#339999')
            .setThumbnail(message.author.avatarURL)
            .setTitle("🌐 ᴄᴀᴛʙᴏᴛ 🌐")
            .addField(vcsmsg, "```▬▬▬▬▬▬▬▬⭐ vιρ ⭐▬▬▬▬▬▬▬▬```")
            .setFooter(message.author.tag + " ➡ " + message.guild.name).setTimestamp()
            client.channels.findAll('name', 'catvcs').map(channel => channel.send(vcs_embed).catch());
            console.log(message.author.tag + " a envoyé un message VCS à partir du serveur " + message.guild.name + ". Il a écrit : " + vcsmsg)
          } else {
    
    
    
    var vcs_embed = new Discord.RichEmbed()
    .setColor('#339999')
    .setThumbnail(message.author.avatarURL)
    .setTitle("🌐 ᴄᴀᴛʙᴏᴛ 🌐")
    .addField(vcsmsg, "```▬▬▬▬⭐ υтιℓιsαтευя ⭐▬▬▬▬```")
    .setFooter(message.author.tag + " ➡ " + message.guild.name).setTimestamp()
    client.channels.findAll('name', 'catvcs').map(channel => channel.send(vcs_embed).catch());
    console.log(message.author.tag + " a envoyé un message VCS à partir du serveur " + message.guild.name + ". Il a écrit : " + vcsmsg)
  }
}
  }

}
  }
}

if (message.content.startsWith(prefix + "setBotOff")) {
  message.channel.send("**VERIFICATION**\n ```Pour accepter, entrez /accept !```");

  }

  if (message.content.startsWith(prefix + "accept")) {
    if(message.author.id == "390948313601671168"){
    console.log("BOT : [OFF]")
    client.destroy();
    process.exit()
  } else {
    message.channel.send("** VERIFICATION** \n ```Votre empreinte digitale ne correspond pas !```")
    
    }
  }
  
  if(message.content.startsWith(prefix + "ticket")){
    message.delete();
    var botrole = message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")
if(!botrole) return message.reply("**Je n'ai pas la permission de crée des channels !** :x:")

    var ticketargs = message.content.substr(8);
    if(!ticketargs) return message.channel.send(":x: **Sujet du Ticket invalide.** :x:")

    message.guild.createChannel("Ticket", "text", [{
      id: message.guild.id,
      deny: ["READ_MESSAGES"],
    }]).then(channel => {
      

    var ticket_embed = new Discord.RichEmbed()
    .setColor("#339999")
    .addField(" Ticket par " + message.author.tag +" :", ticketargs)
    .setFooter("ᴄᴀᴛʙᴏᴛ | Pour terminer : /finish").setTimestamp();
  channel.send(ticket_embed).catch();

})
    

    var ticketmsg = new Discord.RichEmbed()
    .setColor("#01DF01")
    .setDescription("** Ticket crée avec succès. ** ✅")
    .setFooter("Patientez le temps qu'un membre du staff prenne votre requête.")
    message.channel.send(ticketmsg).catch();
    }


if (message.content.startsWith(prefix + "id")) {
  message.delete();
  if(message.author.id == "390948313601671168"){
    if(!message.mentions.users.first()) return message.channel.send("Mentionne.")
    message.author.send(message.mentions.users.first().id + " | " + message.mentions.users.first().tag)
  }
}

if(message.content.startsWith(prefix + "finish")){
  message.delete();
  if(message.channel.name !== "ticket") return message.reply(":x: **Veuillez exécuter cette commande dans la salon `ticket` !** :x:");
  message.channel.delete().then(deleted => {
var ticket_finsh = new Discord.RichEmbed()
.setColor("#01DF01")
.setDescription("**Ticket terminé avec succès. ✅**")
message.author.send(ticket_finsh).catch();
  })
}

if(message.content.startsWith(prefix + "testduvcs")){
  var vcs_embed = new Discord.RichEmbed()
  .setColor('#339999')
  .setThumbnail(message.author.avatarURL)
  .setTitle("🌐 ᴄᴀᴛʙᴏᴛ 🌐")
  .addField("slt", "```▬▬▬▬▬⭐ ραятεηαιяε  ⭐▬▬▬▬▬```")
  .setFooter(message.author.tag + " ➡ " + message.guild.name).setTimestamp()
message.channel.send(vcs_embed).catch();
}
if(message.content === prefix + 'avatar') {
  message.delete();
let user = message.mentions.users.first() || message.author;

let embed = new Discord.RichEmbed()
.setAuthor(`${user.username}`)
.addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", ":cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: ")
.addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","**Voici ton Avatar :**")
.setImage (user.displayAvatarURL)
.setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Commande exécutée : /avatar ")
.setColor('#339999')
message.channel.send(embed)
console.log("La commande /avatar a fonctionné et a été exécutée Par :"+message.author.username);
}



if (message.content.startsWith(prefix + 'meteo'))  { 
  if(!message.guild) return;

weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { 
  if (err) message.channel.send(err);

  
  if (result === undefined || result.length === 0) {
      message.channel.send('**Non Trouver**') 
      return;
  }

  var current = result[0].current; 
  var location = result[0].location; 

  
  const embed = new Discord.RichEmbed()
      .setDescription(`**${current.skytext}**`) 
      .setAuthor(`Lieux ${current.observationpoint}`) 
      .setThumbnail(current.imageUrl) 
      .setColor(0x00AE86) 
      .addField('Fuseau horaire :🕕 ',`UTC${location.timezone}`, true)
      .addField('Degrès Celsus :',`${location.degreetype}°`, true)
      .addField('Témperature :🌡 ',`${current.temperature} C°`, true)
      .addField('Vent :💨 ',current.windspeed,true)
      .addField('Humidité : 💧', `${current.humidity}%`, true)
      
      message.channel.send({embed});
});
}


if(message.content.startsWith(prefix + "clear")) {
  message.delete();
let myrole = message.guild.member(client.user).hasPermission("MANAGE_MESSAGES");

if(!myrole){
return message.channel.send(":x: **Je n'ai pas la permission de gérer les messages !** :x:").then(msg => {msg.delete(15000)});
}
if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **Vous n'avez pas la permission de gérer les messages !** :x:");

var args = message.content.split(" ").slice(1)[0];
if(!args) return message.channel.send(":tools: **Comment utiliser ma commande =>** ```/clear <Nombre Entre 1 et 100> ``` **Permission requise ->** ```MANAGE_MESSAGES```  **Salon requis :** ```catlogs``` ")
  if(!message.guild.channels.find("name", "catlogs")) return message.reply(":x: **Vous devez créer le salon `catlogs` !** :x:");

if (isNaN(args)){  return message.channel.send(":x: **Tu dois préciser un nombre de message à supprimer et pas un autre caractère !** :x:") }
if(args < 1 || args > 101){  return message.channel.send(":x: **Tu dois préciser un nombre entre 1 à 100 !** :x:")  }
return message.channel.bulkDelete(Math.floor(args)).then(ok=>{
var clear_embed = new Discord.RichEmbed()
.setColor("#339999")
.addField("__Nombre de messages supprimés :__", args)
.setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Requête de " + message.author.tag).setTimestamp()
message.channel.send(clear_embed).then(msg => {msg.delete(5000)});

var clearlog_embed = new Discord.RichEmbed()
.setColor("#339999")
.addField("__Nombre de messages supprimés :__", args, true)
.addField("__Par :__ ", message.author.tag, true)
.addField("__Dans le salon__", message.channel.name, true)
.addField("__Grâce à__", client.user.tag, true)
.setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Commande exécutée : /clear").setTimestamp()
message.guild.channels.find('name', 'catlogs').send(clearlog_embed)
console.log(message.author.tag + " a supprimé " + args + " Messages sur le serveur " + message.guild.name + " Dans le salon " + message.channel.name)});
}


if(message.content.startsWith(prefix + "sondage")) {
  message.delete();
var args = message.content.substr(8);
if(!args) return message.channel.send(":x: **Tu dois préciser un sondage !** :x:").then(function (message) { message.react("❌") })
if(args < 1 || args > 201){  return message.channel.send(":x: **Le sondage ne doit pas dépasser les 200 caractères !** :x:").then(function (message) { message.react("❌") });  }
var sondage_embed = new Discord.RichEmbed()
.setColor("#339999")
.addField("__**Sondage :**__", args, true)
.setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Requête de " + message.author.tag).setTimestamp()
message.channel.send(sondage_embed).then(function (message) { message.react("❌"); {message.react("✅")} });

console.log(message.author.tag + " a lancé un sondage : " + args);
}


if(message.content.startsWith(prefix + "say")) {
  message.delete();
var args = message.content.substr(4);
if(!args) return message.channel.send(":x: **Tu dois préciser le texte que tu voudrais que le BOT dise à ta place !** :x:")
var say_embed = new Discord.RichEmbed()
.setColor("#339999")
.addField("__**Message :**__", args, true)
.setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Requête de " + message.author.tag).setTimestamp()
message.channel.send(say_embed)
console.log(message.author.tag + " ou " + message.author.id + " a dit : " + args)
}

if(message.content.startsWith(prefix + "csay")) {
  message.delete();
  if(message.author.id == "390948313601671168"){
    var args = message.content.substr(5);
if(!args) return message.channel.send(":x: **Tu dois préciser le texte que tu voudrais que le BOT dise à ta place !** :x:")
return message.channel.send(args);
  }
}



if(message.content.startsWith(prefix + "asay")) {
  message.delete();
  if(message.author.id == "390948313601671168"){
    var args = message.content.substr(5);
    if(!args) return message.channel.send(":x: **Tu dois préciser le texte que tu voudrais que le BOT dise à ta place !** :x:")
    var asay_embed = new Discord.RichEmbed()
    .setColor("#339999")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"," :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat:")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","__```ANNONCE IMPORTANTE```__")
    .addField(args, "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
    .addField(":cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat:","▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
    .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | ANNONCE IMPORTANTE").setTimestamp()
    message.channel.send(asay_embed)

  }else{
    return message.channel.send(":x: **Vous n'avez pas la permission !**:x:")
  }
      
}



if (message.content.startsWith(prefix + "setStatus")) {
  if(message.author.id == "390948313601671168") {
    var status = message.content.substr(13)
    client.user.setStatus(`${status}`)
    message.channel.send("**Maintenant, le BOT a pour statut :** __**`` " + status + " !``**__")
  } else {
    message.channel.send("** :x: Vous n'avez pas la permission d'exécuter cette commande ! :x:**")
  }
}

if (message.content.startsWith(prefix + "setGame")) {
  if (message.author.id === "390948313601671168") {
  var game = message.content.substr(8)
  client.user.setGame(game)
  message.channel.send("Jeu defini sur \n **" + game + "**")
  } else {
  message.reply(":x: **Vous n'avez pas la permission d'exécuter cette commande !** :x:")
  }
  }
  

        function play(connection, message) {
          var server = servers[message.guild.id];
             
             server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
             
             server.queue.shift();
             
             server.dispatcher.on("end", function() {
               var joinn = new Discord.RichEmbed()
               .setColor("#01DF01")
               .setDescription("** Musique terminée... ** ✅")   
               message.channel.send(joinn).catch();
              if (server.queue[0]) play(connection, message);
              else connection.disconnect();
             });
         }

         if (message.content.startsWith(prefix+ "play")) {
           message.delete();
           var args = message.content.substr(5)
          if (!args) return message.channel.send(":speaker:  **Merci d'indiquer un lien ``YOUTUBE`` d'une musique à jouer.**");               
            if(!message.member.voiceChannel) return message.channel.send(":x: **Je ne peux pas jouer de la musique. Connecte-toi à un channel et exécute /join.** :x:")            
            if(!message.guild.voiceConnection) return message.channel.send(":x: **Je ne peux pas jouer de la musique. Connecte-toi à un channel et exécute /join.** :x:")

            if(args < 25 || args > 150){  return message.channel.send(":x: **Lien ``YOUTUBE`` exigé !** :x:").then(function (message) { message.react("❌") });  }


            
            var servers = {};
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            
            var server = servers[message.guild.id];

            var joine_embed = new Discord.RichEmbed()
            .setColor("#01DF01")
            .setDescription("** Musique en cours... ** ✅")
            .setFooter("Lancement dans environ 8 secondes...")
            message.channel.send(joine_embed).catch();
            server.queue.push(args);
            
             
            if(message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
              play(connection, message) 
           });
            
          }

            if(message.content.startsWith(prefix + "join")){
              message.delete();
              if(!message.member.voiceChannel) {
                message.channel.send(":speaker: **Merci de te rendre dans un salon vocal où le bot a accès.**"); 
                return;
            }
            var join_embed = new Discord.RichEmbed()
            .setColor("#01DF01")
            .setDescription("** Connection exécutée avec succès.** ✅")
            message.channel.send(join_embed).catch();
                      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
              play(connection, message) 
           });


            }


//if (message.content.startsWith(prefix+ "skip")) {

  //var servers = []; //array
//var servers = {}; //objet

  //if(!message.member.voiceChannel) {
      //message.channel.send(":speaker: **Vous devez être dans un salon vocal**.");   
      //return;
  //}
  //var server = servers[message.guild.id];
  //message.channel.send(":loud_sound: **Passage à la musique suivante**");
  //if(server.dispatcher) server.dispatcher.end();
//}

if(message.content.startsWith(prefix + "stop")){
message.delete();
if(message.guild.voiceConnection){
  message.guild.voiceConnection.disconnect();
  var stop_embed = new Discord.RichEmbed()
  .setColor("#01DF01")
  .setDescription("** Déconnection exécutée avec succès.** ✅")
  message.channel.send(stop_embed).catch();
}
else
{
  var bidukee = new Discord.RichEmbed()
  .setColor("#B40404")
  .setDescription("** :x: Je ne me trouve dans aucun salon vocal.** :x:")
  message.channel.send(bidukee)
}
}

if(message.content.startsWith(prefix + "leave")){
  message.delete();
  if(message.guild.voiceConnection){
    message.guild.voiceConnection.disconnect();
    var stope_embed = new Discord.RichEmbed()
    .setColor("#01DF01")
    .setDescription("** Déconnection exécutée avec succès.** ✅")
    message.channel.send(stope_embed).catch();
  }
  else
  {
    var biduke = new Discord.RichEmbed()
    .setColor("#B40404")
    .setDescription("** :x: Je ne me trouve dans aucun salon vocal.** :x:")
    message.channel.send(biduke)
  }
  }
  
  if(message.content.startsWith(prefix + "stats")){
    message.delete();
var coucou = new Discord.RichEmbed()
.setDescription("**Statistiques du serveur : "+ message.guild.name) + "**"
.addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "__**```Membres```**__")
.addField("__Membres au total :__", message.guild.memberCount)  
.addField("__Humains :__", message.guild.members.filter(m => ! m.user.bot).size)
.addField("__BOT's :__", message.guild.members.filter(m => m.user.bot).size, true)
.addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "__**```Salons```**__")
.addField("__Salons au total :__", message.guild.channels.size, true)
.addField("__Salons textuels :__", message.guild.channels.filter(channel => channel.type === 'text').size, true)
.addField("__Salons vocaux :__", message.guild.channels.filter(channel => channel.type === 'voice').size, true)
.addField("__Catégories :__", message.guild.channels.filter(channel => channel.type === "category").size, true)
message.channel.send(coucou)
  }
  
  if(message.content === prefix + "oignon"){
    message.channel.send(" <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186>  <@446061218063581186> ")
  }

if(message.content.startsWith(prefix + "install")){
  message.delete();
  var botrole = message.guild.member(client.user).hasPermission("ADMINISTRATOR");
if(!botrole) return message.reply("**Merci de me mettre la permission Administrateur afin que j'installe les prérequis, et de me la laisser.** :x:")
  var memberR = message.member.hasPermission("ADMINISTRATOR")
  if(!memberR) return message.reply("**Vous n'avez pas la permission ! **:x:")

  message.guild.createChannel('ᴄᴀᴛʙᴏᴛ', 'category')
  .then(category => {
      message.guild.createChannel("catvcs", "text")
      .then(text => {
          text.setParent(category);
      })
message.guild.createChannel('catlogs', 'text',
[{
  id: message.guild.id,
  deny: ['SEND_MESSAGES'],
  allow: ['READ_MESSAGES']
}])       .then(text => {
  text.setParent(category);
})

message.guild.createChannel('bienvenue', 'text',
[{
  id: message.guild.id,
  deny: ['SEND_MESSAGES'],
  allow: ['READ_MESSAGES']
}]
)        .then(text => {
  text.setParent(category);
})

   
message.guild.createChannel('logs', 'text'
[{
  id: message.guild.id,
    deny: ['SEND_MESSAGES'],
  allow: ['READ_MESSAGES']
}])      .then(text => {
  text.setParent(category);
})

message.guild.createChannel('report', 'text'
[{
  id: message.guild.id,
  deny: ['SEND_MESSAGES'],
  allow: ['READ_MESSAGES']
}])      .then(text => {
  text.setParent(category);
})
message.guild.createChannel('CatMusic', 'voice')      .then(text => {
  text.setParent(category);
})

  });
  var install0_embed = new Discord.RichEmbed()
  .setColor("#01DF01")
  .setDescription("**Installation exécutée à 25%.** ")

  var install1_embed = new Discord.RichEmbed()
  .setColor("#01DF01")
  .setDescription("**Installation exécutée à 50%.** ")

  var install2_embed = new Discord.RichEmbed()
  .setColor("#01DF01")
  .setDescription("**Installation exécutée à 75%.** ")

  var install3_embed = new Discord.RichEmbed()
  .setColor("#01DF01")
  .setDescription("**Installation exécutée à 100% !** ")


  
  
   message.channel.send(install0_embed).then(message => message.edit(install1_embed)).then(message => message.edit(install2_embed)).then(message => message.edit(install3_embed)).then;
}
var fs = require('fs-extra');
let afk = JSON.parse(fs.readFileSync("./data/afks.json", "utf8"));
if (message.content.startsWith(prefix + "remafk")){
if (afk[message.author.id]) {
delete afk[message.author.id];
if (message.member.nickname === null) {
    const embed = new Discord.RichEmbed()
.setColor("#01DF01")
    .setDescription("AFK enlevé avec succès. ✅")
    message.channel.send(embed);
}else{
    const embed = new Discord.RichEmbed()
    .setColor("#01DF01")
    .setDescription("AFK enlevé avec succès. ✅")
    message.channel.send(embed);
}
fs.writeFile("./data/afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
}else{
    const embed = new Discord.RichEmbed()
    .setColor("#B40404")
   .setDescription("Tu n'es pas AFK ! ❌")
    message.channel.send(embed);
}
}


if (message.content.startsWith(prefix + "afk")){
if (afk[message.author.id]) {
    const embed = new Discord.RichEmbed()
    .setColor("#01DF01")
    .setDescription("AFK activé avec succès. ✅")
    message.channel.send(embed);
  }else{
  let args1 = message.content.split(" ").slice(1);
  if (args1.length === 0) {
 afk[message.author.id] = {"reason" : true};
 message.delete();
const embed = new Discord.RichEmbed()
.setColor("#01DF01")
.setDescription("AFK activé avec succès. ✅")
message.channel.send(embed);
}else{
afk[message.author.id] = {"reason" : args1.join(" ")};
message.delete();
const embed = new Discord.RichEmbed()
.setColor("#01DF01")
.setDescription("AFK enlevé avec succès. ✅")
message.channel.send(embed);
}
fs.writeFile("./data/afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
}
}
    
    var mentionned = message.mentions.users.first();
    let user = message.mentions.users.first();
if(message.mentions.users.size > 0) {
if (afk[message.mentions.users.first().id]) {
if (afk[message.mentions.users.first().id].reason === true) {
    const embed = new Discord.RichEmbed()
    .setColor("#B40404")
    .setDescription("Ce joueur est AFK !")
message.channel.send(embed);
}else{
    const embed = new Discord.RichEmbed()
    .setColor("#B40404")
    .setDescription("Ce joueur est AFK !")
    message.channel.send(embed);
}
}
}

if(message.content.startsWith(prefix + "testeuh")){
  message.delete();
  var install0_embed = new Discord.RichEmbed()
  .setColor("#01DF01")
  .setDescription("**Installation exécutée à 25%.** ")

  var install12_embed = new Discord.RichEmbed()
  .setColor("#01DF01")
  .setDescription("**Installation exécutée à 50%.** ")

  var install2_embed = new Discord.RichEmbed()
  .setColor("#01DF01")
  .setDescription("**Installation exécutée à 75%.** ")

  var install3_embed = new Discord.RichEmbed()
  .setColor("#01DF01")
  .setDescription("**Installation exécutée à 100% !** ")


  
  
   message.channel.send(install0_embed).then(message => message.edit(install1_embed)).then(message => message.edit(install2_embed)).then(message => message.edit(install3_embed)).then;

}

if(message.content.startsWith(prefix + "mute")){
  message.delete();
  let tomute = message.guild.member(message.mentions.users.first())
  if(!tomute) return message.channel.send(":tools: **Comment utiliser la commande :** ```/mute <Mention> <Temps> ``` :tools: **Permission requise :** ```MANAGE_ROLES``` :tools: **Exemple :** ```/mute @Noob#0001 1month / 31d / 744h / 44640m / 2678400s ```")
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("** Vous n'avez pas la permission d'exécuter cette commande ! **:x:")
  if(tomute.hasPermission("KICK_MEMBERS")) return message.reply(" **Vous ne pouvez pas réduire au silence un membre du Staff !** :x:")
  if(!message.guild.channels.find("name", "catlogs")) return message.reply(" **Vous devez créer le salon `catlogs` !** :x:");
  let mutetime = message.content.split(" ").slice(2).join(" ");
  if(!mutetime) return message.channel.send(":x: **Merci d'indiquer un temps voulu !** :x:")
  let muterole = message.guild.roles.find("name", "CatMuted")
  if(!muterole){
    try{
      muterole = message.guild.createRole({
        name: "CatMuted",
        color: "#339999",
        permissions: [],
        position: 31,
      })
      message.guild.channels.forEach(async (channel, id) => {
         channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  (tomute.addRole(muterole));

  var mute_embed = new Discord.RichEmbed()
  .setColor("#B40404")
  .setTitle("Mute")
  .addField("Joueur : ", `<@${tomute.id}>`)
  .addField("Modérateur : ", `<@${message.member.id}>`)
  .addField("Temps : ", ms(ms(mutetime)), true)
  .setFooter("ᴄᴀᴛʙᴏᴛ | Réduction au silence d'un membre du serveur " + message.guild.name + ".")
  message.channel.send(mute_embed);

  var mute_log = new Discord.RichEmbed()
  .setColor("#B40404")
  .setTitle("Mute")
  .addField("Joueur : ", `<@${tomute.id}>`)
  .addField(`Modérateur : `, `<@${message.member.id}>`)
  .addField(`Temps : `, ms(ms(mutetime)), true)
  .setFooter("ᴄᴀᴛʙᴏᴛ | Réduction au silence d'un membre du serveur " + message.guild.name + ".")
message.guild.channels.find("name", "catlogs").send(mute_log).catch();


  setTimeout(function(){
tomute.removeRole(muterole.id);
message.channel.send(` ** <@${tomute.id}> peut désormais reparler ! Attention la prochaine fois.** :white_check_mark: `);
  }, ms (mutetime));
}

if (message.content.startsWith(prefix + "eval")) {
  const config = require('./config.json');
  if(config.maintainers.indexOf(message.author.id)> -1 ) {
      var util = require("util");
      let args = message.content.split(" ").slice(1); 	
      let code = args.join(' ');
try {
let ev = eval(code)
    let str = util.inspect(ev, {
      depth: 1
    })
    if(str.length > 1800) {
      str = str.substr(0, 1800)
      str = str + "..."
    }
    message.delete();	
message.react("✅");
message.channel.send("", { embed: {	
  color: 16758725,			
fields: [{				
name: ':inbox_tray: **Input**',			
  value: '\`\`\`' + code + '\`\`\`'					
},{			
  name: ':outbox_tray: **Output**',	
      value: '\`\`\`' + str + '\`\`\`'	
    }],	
  footer: {			
text: `request by @${message.author.username}`		}			}});}	catch (err) {		message.react("❌");
message.channel.send("", { embed: {	
  color: 16758725,			
fields: [{				
name: ':inbox_tray: **Input**',			
  value: '\`\`\`' + code + '\`\`\`'					
},{			
  name: ':outbox_tray: **Output**',	
      value: '\`\`\`' + err + '\`\`\`'	
    }],	
  footer: {			
          text: `request by @${message.author.username}`		}			}});		}	}else{
              return message.reply("Tu n'est pas **l'Owner**")
          }
}

if(message.content.startsWith(prefix + "addrole")){
  message.delete();
  let rMember = message.guild.member(message.mentions.users.first());
  if(!rMember) return message.reply(":tools: **Comment utiliser la commande :** ```/addrole <Mention> <Role>``` :tools: **Permission requise :** ```MANAGE_ROLES```");
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("** Vous n'avez pas la permission d'exécuter cette commande ! **:x:")
  let role = message.content.split(" ").slice(2).join(" ");
  if(!role) return message.reply(" **Merci d'entrer un rôle ``VALIDE`` !** :x:")
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply(" **Le rôle entré n'est pas valide !** :x:")

  if(rMember.roles.has(gRole.id));
  (rMember.addRole(gRole.id));

 
    rMember.send(`**Le rôle ${gRole.name} vous a bien été attribué !** :white_check_mark: `)  
  message.channel.send(`**Bravo à <@${rMember.id}> ! Il a bien reçu le rôle ${gRole.name} ! :white_check_mark:** `)
}

if(message.content.startsWith(prefix + "createchannel")){
  message.delete();
  var type = message.content.split(" ").slice(1)[0];
  if(!type) return message.reply("Non.")
  var name = message.content.split(" ").slice(2).join(" ");
  if(!name) return message.reply("Non..")
  if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("NAN !")
  message.guild.createChannel(name, type);
  var createchann_embed = new Discord.RichEmbed()
  .setColor("#01DF01")
.setDescription("**Création exécutée avec succès.** ✅")
message.channel.send(createchann_embed).catch();
}


if(message.content.startsWith(prefix + "removerole")){
  let rMember = message.guild.member(message.mentions.users.first());
  if(!rMember) return message.reply(":tools: **Comment utiliser la commande :** ```/removerole <Mention> <Role>``` :tools: **Permission requise :** ```MANAGE_ROLES```");
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply(" ** Vous n'avez pas la permission d'exécuter cette commande ! **:x:")
  let role = message.content.split(" ").slice(2).join(" ");
  if(!role) return message.reply(":x: **Merci d'entrer un rôle ``VALIDE`` !** :x:")
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply(":x: **Le rôle entré n'est pas valide !** :x:")

  if(rMember.roles.has(gRole.id));
  (rMember.removeRole(gRole.id));

 
    rMember.send(`**Le rôle ${gRole.name} vous a bien été enlevé. !** :white_check_mark: `)  
  message.channel.send(` **Le rôle ${gRole.name} lui a bien été enlevé !** :white_check_mark: `)
}

  if (message.content.startsWith(prefix + "createrole")) {
    message.delete();
    let rName = message.content.split(" ").slice(1)[0];
    let rColor = message.content.split(" ").slice(2).join(" ");
    if (!rName) return message.reply(":tools: **Comment utilisez ma commande ?** ```/createrole <Nom> <Couleur>``` **Permission requise :** ```MANAGE_ROLES``` :warning: **Le nom du rôle nedoit être écrit qu'en un seul et unique mot ! :warning: **")
    if (!rColor) return message.reply("**Merci d'entrer le ``#TAG`` de la couleur voulue pour ce rôle.** :x:")
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("**Vous n'avez pas la permission ! ** :x:")
    let role = message.guild.roles.find("name", rName)
    if (!role) {
      try {
        role = message.guild.createRole({
          name: rName,
          color: rColor
        });
      } catch (e) {
      }
    }
    let crole_embed =new Discord.RichEmbed()
    .setColor("#339999") 
    .addField("Nom du rôle : ", rName, true)
     .addField("Couleur du rôle :", rColor, true)
     .addField("Status du rôle :", "Crée avec succès ✅")
     .setFooter("Requête de " + message.author.tag).setTimestamp()
     message.channel.send(crole_embed);
     console.log("Le rôle " + rName + " avec la couleur " + rColor + " a été crée sur le serveur " + message.guild.name + " par " + message.author.tag);
  }

  

  if(message.content.startsWith(prefix + "chien")) {
    message.delete();
    let urlList = [
      'https://cdn.discordapp.com/attachments/444172474373111818/454909820781330433/chien_5.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909825386807302/chien_7.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909824178716672/chien_6.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909829270470656/chien_8.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909838460321792/chien_10.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909832433238029/chien_9.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909843283771393/chien1.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454920935544455168/chien_2.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454920973951696896/chien_4.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454920952938233866/chien_3.jpeg',
    ];

    let randomUrl = (urlList[Math.floor(Math.random() * urlList.length)])
    var cat_embed = new Discord.RichEmbed()
    .setColor("#339999")
    .setTitle("Voici un chien")
    .setImage(randomUrl)
    .setFooter("Requête de " + message.author.tag)
    message.channel.send(cat_embed).catch();
    console.log("La commande /chien a fonctionné et a été exécutée Par :"+message.author.username);
  }

  if(message.content.startsWith(prefix + "chat")) {
    message.delete();
    let urlList1 = [
      'https://cdn.discordapp.com/attachments/444239531630395400/453889574838730754/chat-chante.jpg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909762057011210/chat_3.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909760697925642/chat_2.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909764825120779/chat_5.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909763566829578/chat_4.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909766242795530/chat_6.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909767845019659/chat_7.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909769971531787/chat_8.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909773268254730/chat_10.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909774715289602/chat1.jpeg',
      'https://cdn.discordapp.com/attachments/444172474373111818/454909771867226112/chat_9.jpeg',
    ];

    let randomUrl1 = (urlList1[Math.floor(Math.random() * urlList1.length)])
    var dog_embed = new Discord.RichEmbed()
    .setColor("#339999")
    .setTitle("Voici un chat")
    .setImage(randomUrl1)
    .setFooter("Requête de " + message.author.tag)
    message.channel.send(dog_embed).catch();
    console.log("La commande /chat a fonctionné et a été exécutée Par :"+message.author.username);
  }

  if (message.content.startsWith(prefix + "combat")) {
    if(!message.mentions.users.first()) {
      return message.channel.send(":tools: **Comment utiliser ma commande =>** ```/combat <@utilisateur>``` ")}
      let urlList2 = [
        'https://cdn.discordapp.com/attachments/444172474373111818/454967574636003338/fight_8.gif',
        'https://cdn.discordapp.com/attachments/444172474373111818/454967612775071744/fight_3.gif',
        'https://cdn.discordapp.com/attachments/444172474373111818/454967637567471616/fight1.gif',
        'https://cdn.discordapp.com/attachments/444172474373111818/454967690419765249/fight_9.gif',
        'https://cdn.discordapp.com/attachments/444172474373111818/454967726331527178/fight_6.gif',
        'https://cdn.discordapp.com/attachments/444172474373111818/454967768647860224/fight_7.gif',
        'https://cdn.discordapp.com/attachments/444172474373111818/454967804387655683/fight_10.gif',
        'https://cdn.discordapp.com/attachments/444172474373111818/454967819117920256/fight_5.gif',
        'https://cdn.discordapp.com/attachments/444172474373111818/454967742357831700/fight_2.gif',
        'https://cdn.discordapp.com/attachments/444172474373111818/454967724024528906/fight_4.gif',
      ];

      let randomUrl2 = (urlList2[Math.floor(Math.random() * urlList2.length)])
      var fight_embed = new Discord.RichEmbed()
      .setColor("#339999")
      .setTitle("Combat lancé par " + message.author.tag)
      .setImage(randomUrl2)
      .setFooter("<@" + message.author.id + ">" + " VS " + message.mentions.users.first())
      message.channel.send(fight_embed).catch();  
      console.log("La commande /combat a fonctionné et a été exécutée Par :"+message.author.username);
}

  if (message.content.startsWith(prefix+ "nsfw")) {
    message.delete(message.author);
    if(!message.guild.channels.find("name", "nsfw")) return message.reply(":x: **Vous devez créer le salon `nsfw` !** :x:");
    if(message.channel.name !== "nsfw") return message.reply(":x: **Veuillez exécuter cette commande dans la salon `nsfw` !** :x:");
  
    let urlList3 = [
      'http://imgur.com/SBbyJZ8.gif',
      'https://78.media.tumblr.com/6706c5e266928d8110da11bb244bc20a/tumblr_nmwopzOrTt1tzmxtzo1_500.gif',
      'https://cdn.discordapp.com/attachments/455017232154755072/455017984600309761/2NRTBIG.jpg',
      'http://imgur.com/cDMInxI.gif',
      'https://78.media.tumblr.com/858b2aa67850b68509b16e5b4db8eb8e/tumblr_nn2p63QtSf1t39maqo1_500.gif',
      'https://78.media.tumblr.com/8b5e0420f9f574139964cfb91bb22a1d/tumblr_n3c029egSU1sfkfqio3_400.gif',
      'https://78.media.tumblr.com/63d2e7a5ad510bd5562f3b11ec8aeda4/tumblr_n7l9tafxU81revz5to1_500.gif',
      'http://imgur.com/3IQlDUn.gif',
      'https://78.media.tumblr.com/a3fc0459056ee268889427afaa4873b2/tumblr_n3g8dk7OVb1rnnw2ro1_500.gif',
      'https://78.media.tumblr.com/acdd22d00efe5636255f91eed8c00d63/tumblr_n4aoglNICi1qd5ic3o1_500.gif',
      'https://78.media.tumblr.com/15ee43be12bd548853573410bc2c4732/tumblr_o208fqtepF1s1qf6no6_400.gif',
      'https://78.media.tumblr.com/64591d33baa055ca41d17ca3912559e3/tumblr_n7hx132YXi1r9snzco1_400.gif',
      'https://cdn.discordapp.com/attachments/455017232154755072/455018451845644318/j3KdaH2.jpg',
      'https://78.media.tumblr.com/08c1868b788badc7ad9751e8ebf1873c/tumblr_ovwtq0gYxa1rylulro1_500.gif',
      'https://78.media.tumblr.com/858b2aa67850b68509b16e5b4db8eb8e/tumblr_nn2p63QtSf1t39maqo1_500.gif',
      'https://78.media.tumblr.com/354d34a212c4f8b37ad8433fe8fe5a80/tumblr_nvy1dk6k8Z1tlxyuno1_500.gif',
      'https://78.media.tumblr.com/8b060268a42ff9f3b8a9566f4ae231ff/tumblr_nyfkte5NRg1ui0i0eo1_500.gif',
      'https://cdn.discordapp.com/attachments/455017232154755072/455018250237902858/kxWrQVH.jpg',
      'http://imgur.com/7Kume3H.gif',
      'https://78.media.tumblr.com/7edd3194048c2d41a80435fddc585451/tumblr_p9lenn4tZj1rat4opo1_540.gif',
      'https://78.media.tumblr.com/a61cee7d4fee897666e79250e7768f4d/tumblr_nz99v5D6wJ1u9j6sno1_500.gif',
      'http://imgur.com/RZFmOtJ.gif',
      'http://imgur.com/mCFuGzn.gif',
      'https://78.media.tumblr.com/29e0eed2bab99ae58c75195e740815b7/tumblr_nz4jhylgC11tvbwtwo1_500.gif',

      
    ];

    let randomUrl3 = (urlList3[Math.floor(Math.random() * urlList3.length)])
    var nsfw_embed = new Discord.RichEmbed()
    .setColor('#339999')
    .setTitle("NSFW")
    .setImage(randomUrl3)
    .setFooter("Requête de  "  +  message.author.tag)
    console.log(message.author.tag + " a utilisé la commande /nsfw sur le serveur "  + message.guild.name);
    message.guild.channels.find('name', 'nsfw').send(nsfw_embed)
  }
  
  




if (message.content.startsWith(prefix + "setBotActif")) {
message.delete();
if(message.author.id == "390948313601671168"){
client.user.setStatus('online')
message.channel.send("Statut changé en mode _en ligne_ ");
console.log("Statut changé en mode en ligne.")
} else {
message.channel.send(":x: **Tu n'as pas la permission d'effectuer cette commande !** :x:")
}}

if (message.content.startsWith(prefix + "setBotNpd")) {
  message.delete();
if(message.author.id == "390948313601671168"){
client.user.setStatus('dnd')
message.channel.send("Statut changé en mode _ne pas déranger_ ");
console.log("Statut changé en mode ne pas déranger.")
} else {
message.channel.send(":x: **Tu n'as pas la permission d'effectuer cette commande !** :x:")
}}

if (message.content.startsWith(prefix + "setBotInactif")) {
  message.delete();
if(message.author.id == "390948313601671168"){
client.user.setStatus('idle')
message.channel.send("Statut changé en mode _inactif_ ");
console.log("Statut changé en mode inactif.")
} else {
message.channel.send(":x: **Tu n'as pas la permission d'effectuer cette commande !** :x:")
}}

if (message.content.startsWith(prefix + "setBotInvisible")) {
  message.delete();
if(message.author.id == "390948313601671168"){
client.user.setStatus('invisible')
message.channel.send("Statut changé en mode _invisible_ ");
console.log("Statut changé en mode invisible.")
} else {
message.channel.send(":x: **Tu n'as pas la permission d'effectuer cette commande !** :x:")
}   
}

if(message.content.startsWith(prefix + "8ball")) {
  message.delete();
  var args = message.content.substr(6)
  if(!args) return message.reply(":x: **Merci de bien vouloir poser une question complète.** :x:");
  var replies = ["Oui.",
  "Non.",
  "Peut-être.",
  "Je ne sais pas.",
  "Demande-moi Plus tard.",
  "Cherche par toi-même.",
  "Arrête de poser des questions connes, on dirait que la connerie c'est de génération en génération chez toi."];
  var result = replies[Math.floor(Math.random()*replies.length)];
 var question = message.content.split(" ").slice(1).join(" ");

 var ballembed = new Discord.RichEmbed()
 .setTitle("Question posée par " + message.author.tag)
 .setColor("#339999")
 .setDescription("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
 .addField("**Question** :arrow_down_small:", question)
 .addField("**Réponse** :arrow_down_small:", result)
 .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","-----------------------------------------")
 .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Commande exécutée : /8ball")
message.channel.send(ballembed);
console.log(message.author.tag + " a posé une question : " + question + " et a obtenu la réponse : " + result);
}

/*if(message.content.startsWith(prefix + "help")){
  var helpmachin = new Discord.RichEmbed()
  .setColor("#B40404")
.setDescription(":warning: **Commande en maintenance ** :warning:")
message.channel.send(helpmachin)
}*/

if(message.content === prefix + "help"){
  message.delete();
    var catbot_embed = new Discord.RichEmbed()                                 
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"," :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat:")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","__```ᴄᴀᴛʙᴏᴛ```__")
    .addField("**:question: ``/нεℓρ``**", "*Affiche le menui d'aide.*")
    .addField("**:tickets:``/ιηvιтε``**","*Vous permet d'ajouter ᴄᴀᴛʙᴏᴛ sur votre serveur.*")
    .addField("**:clipboard: ``/sυρρσят``**","*Vous permet de rejoindre le Serveur Discord officiel de ᴄᴀᴛʙᴏᴛ.*")
    .addField("**:restroom: ``/ραятεηαιяεs``**","*Affiche la liste des partenariats de ᴄᴀᴛʙᴏᴛ*")
    .setColor("#339999")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","---------------------------------------")
    .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Page d'aide : ᴄᴀᴛʙᴏᴛ | Retour -> 🔙")

    var mod_embed = new Discord.RichEmbed()
    .setColor("#339999")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"," :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat:")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","__```Aide-Staff```__")
    .addField(":link: **``/яερσят``**","*Permet de signaler un joueur ou un bug afin d'aider les membres du Staff.*")
    .addField(":link: **``/тιcкεт``**","*Permet de créer un Ticket de support pour quelconque question...*")
    .addField(":link: **``/яερσят``**","*Permet de terminer un ticket.*")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","__```Modération```__")
    .addField("💢``/ωαяη``","*Vous permet d'avertir un utilisateur de votre serveur.*")
    .addField("**:x: ``/кιcк``**","*Vous permet d'exclure un utilisateur de votre serveur.*")
    .addField("**:no_entry_sign: ``/вαη``**","*Permet de bannir un Utilisateur de votre serveur.*")
    .addField(":dash: **``/cℓεαя``**","*Permet de supprimer le nombre de message indiqué entre 1 et 100.*")
    .addField(":mute: /мυтε","*Permet de réduire un membre du serveur au silence sur un temps défini. [En DEV.]*")
    .addField(":mute: /cмυтε","*Permet de réduire un membre du serveur au silence sur le salon actuel uniquement et sur un temps infini.*")
    .addField(":loud_sound: /cυηмυтε","*Permet de rendre la parole dans le salon actuel à la personne réduite au silence.*")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","---------------------------------------")
    .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Page d'aide : Modération | Retour -> 🔙")

    var admin_embed = new Discord.RichEmbed()
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"," :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat:")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","__```Administration```__")
    .addField(":new: /α∂∂яσℓε","*Permet d'ajouter le rôle souhaité à la personne mentionnée.*")
    .addField(":back:  /яεмσvεяσℓε","*Permet d'enlever le rôle souhaité à la personne mentionnée.*")
    .addField(":tada:   /cяεαтεяσℓε","*Permet de crée un rôle avec le nom et la couleur souhaitée.*")
    .addField(":tools: /ιηsтαℓℓ", "*Permet d'installer les prérequis du BOT.*")
    .addField(":tada:   /cяεαтεcнαηηεℓ","*Permet de crée un channel du nom et du type défini.*")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","---------------------------------------")
    .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Page d'aide : Administration | Retour -> 🔙")
    .setColor("#339999")
    message.author.send(help_embed).catch(); 

    var fun_embed = new Discord.RichEmbed()  
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"," :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat:")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","__```Fun | Autre```__")
    .setColor("#339999")
    .addField("✅ ``/sαү``","*Permet de faire dire au BOT le Texte entré.*")
    .addField(":frame_photo: **``/αvαтαя``**","*Permet d'afficher ta photo de profil en plus grande.*")
    .addField(":thinking: ``/sση∂αgε``","*Permet de créer un sondage.*")
    .addField(":globe_with_meridians: ``/vcs``","*Vous permet d'envoyer un message inter-serveurs possédant ᴄᴀᴛʙᴏᴛ.*")
    .addField(":repeat: ``/8вαℓℓ``", "*Posez une question et ᴄᴀᴛʙᴏᴛ vous répondra.*")
    .addField(":cat: ``/ᴄнαт``","*Affiche aléatoirement une photo d'un chat.*")
    .addField(" :dog: ``/ᴄнιεη``","*Affiche aléatoirement une photo d'un chien.*")
    .addField(":punch: /ᴄᴏмвαт","*Vous permet de vous battre avec l'utilisateur mentionné.*")
    .addField(":underage: /ηsғω","*Affiche des images pornographiques.*")
    .addField(":speech_balloon: /мsg","*Vous permet d'envoyer un message privé à la personne mentionnée.*")
    .addField(":raised_back_of_hand: /ριℓε-ғαᴄε","***Joue au jeu célèbre ``Pile ou Face``.***")
    .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Page d'aide : Fun | Retour -> 🔙")

    var music_embed = new Discord.RichEmbed()
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"," :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat:")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","__```Musique```__")
    .addField(":play_pause:  /נᴏιη","*Vous permet de connecter le BOT à votre channel.*")
    .addField(":play_pause:  ``/ρℓαү``","*Vous permet d'écouter de la musique en entrant un lien ``YOUTUBE``.*")
    .addField(":stop_button:  ``/sтσρ``","*Vous permet d'arrêter la musique en cours.* ")
    .addField(" :stop_button: /ℓεαvε","*Vous permet de déconnecter le BOT.*")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","__```Informations```__")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"," :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: ")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","---------------------------------------")
    .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Page d'aide : Musique | Retour -> 🔙")
    .setColor("#339999")
    
    var help_embed = new Discord.RichEmbed()
    .setTitle("Administrateurs : Pensez à installer les prérequis : /install")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"," :cat: :cat:  :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat:")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","__```Page d'aide```__")
    .addField("   α∂мιηιsтяαтιση ", "``Réagir avec`` :tools:")
    .addField("   мσ∂éяαтιση ","``Réagir avec`` :gear: ")
    .addField("  ғυη | αυтяε "," ``Réagir avec`` :tada:")
    .addField("   мυsιqυε ","``Réagir avec`` :loud_sound:")
    .addField("  ιηғσямαтισηs sυя ᴄᴀᴛʙᴏᴛ", "``Réagir avec`` :cat: ")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","-----------------------------")
    .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Commande exécutée : /help | Retour -> 🔙")
    .setColor("#339999")
    console.log("La commande /help a fonctionné et a été exécutée Par :"+message.author.username);

    const ok = await message.channel.send(help_embed).catch();
await ok.react("⚒")
await ok.react("⚙") 
await ok.react("🎉")
await ok.react("🔊")
await ok.react("🐱")
    
    const theri = ok.createReactionCollector((reaction, user) => user.id === message.author.id);

    theri.on('collect', async(reaction) => {



        if (reaction.emoji.name === "⚒") {
ok.edit(admin_embed);
ok.clearReactions();
await ok.react("🔙")
}

        if (reaction.emoji.name === "⚙") {

          await ok.edit(mod_embed)
          await ok.clearReactions();
          await ok.react("🔙")

      }

      if (reaction.emoji.name === "🎉") {

        await ok.edit(fun_embed)
        await ok.clearReactions();
        await ok.react("🔙")


    }


        if (reaction.emoji.name === "🔊") {

          await ok.edit(music_embed)
          await ok.clearReactions();
          await ok.react("🔙")

        }

        if (reaction.emoji.name === "🐱") {

          await ok.edit(catbot_embed)
          await ok.clearReactions();
          await ok.react("🔙")


        }
        if (reaction.emoji.name === "🔙") {

          await ok.edit(help_embed);
          await ok.clearReactions();
          await ok.react("⚒")
await ok.react("⚙") 
await ok.react("🎉")
await ok.react("🔊")
await ok.react("🐱")
        }


        })

        




      

     }
  

if (message.content.startsWith(prefix + "cmute")) {
  if (message.channel.type === "dm") return;
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**:x: Vous n'avez pas la permission ! :x:**").catch(console.error);
  if(message.mentions.users.size === 0) {
    return message.channel.send("**:x: Merci de mentionner un utilisateur ``VALABLE`` ! :x:**");
  }
  let muteMember = message.guild.member(message.mentions.users.first());
  if(!muteMember) {
    return message.channel.send("**:x: Utilisateur mentionné invalide. :x:**");
  }
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
    return message.reply("**:x: Je n'ai pas la permission ! :x:**").catch(console.error);
  }
  message.channel.overwritePermissions(muteMember, { SEND_MESSAGES: false }).then(member => {
    var ticket_finsh = new Discord.RichEmbed()
    .setColor("#01DF01")
    .setDescription("**Réduction au silence exécutée avec succès. ✅**")
    message.channel.send(ticket_finsh).catch();
      })};


    if (message.content.startsWith(prefix + "cunmute")) {
      if (message.channel.type === "dm") return;
      if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**:x: Vous n'avez pas la permission ! :x:**").catch(console.error);
      if(message.mentions.users.size === 0) {
        return message.channel.send("**:x: Merci de mentionner un utilisateur ``VALABLE`` ! :x:**");
      }
      let muteMember = message.guild.member(message.mentions.users.first());
      if(!muteMember) {
        return message.channel.send("**:x: Utilisateur mentionné invalide. :x:**");
      }
      if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
        return message.reply("**:x: Je n'ai pas la permission ! :x:**").catch(console.error);
      }
      message.channel.overwritePermissions(muteMember, { SEND_MESSAGES: null }).then(member => {
        var ticket_finsh = new Discord.RichEmbed()
        .setColor("#01DF01")
        .setDescription("**Parole rendue avec succès. ✅**")
        message.channel.send(ticket_finsh).catch();
    })};
      

    if(message.content === prefix + "support"){
  message.delete();
    var support_embed = new Discord.RichEmbed()
    .setTitle("Voici le lien pour rejoindre le Support de ᴄᴀᴛʙᴏᴛ : ")
    .setDescription("**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**")
    .addField("Cliquez ici pour accéder à la Page :","[--> :cat: ](https://discord.gg/yPxW4YF)")
    .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","--------------------------------------------")
    .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Commande exécutée : /support ")
    .setColor("#339999")
    message.author.send(support_embed); 
    message.channel.send("**Le lien pour rejoindre le support de ᴄᴀᴛʙᴏᴛ vous a été envoyé par message privé, vérifiez qu'ils soient bien actifs.**").then(function (message) { message.react("📬") }) 
    console.log("La commande /support a fonctionné et a été exécutée Par :"+message.author.username);
}

if(message.content === prefix + "partenaires"){
  message.delete();
  var partenaires_embed = new Discord.RichEmbed()  
  .setTitle("Voici la liste des Partenaires de ᴄᴀᴛʙᴏᴛ :")
  .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",":cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat: :cat:")
  .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","```FoxBot :```")
  .addField("**Bot crée par ElectroDark, serveur avec un staff organisé de A à Z, des animations, des développeurs, membres Actifs, voici le lien :**","https://discord.gg/uFV3Ygy")
  .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬","-----------------------------------------------")
  .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Commande exécutée : /partenaires")
  .setColor("#339999")
  message.author.send(partenaires_embed); 
  message.channel.send("**La liste des partenaires de ᴄᴀᴛʙᴏᴛ vous a été envoyée par message privé, vérifiez qu'ils soient bien actifs.**").then(function (message) { message.react("📬") }) 
console.log("La commande /partenaires a fonctionné et a été exécutée Par :"+message.author.username);
}       



if(message.content === "Bonjour"){
  message.channel.send("Bonjour ! Ca va ?");
  }

  if(message.content === "Yo"){
    message.channel.send("Bonjour ! Ca va ?");
    }

    if(message.content === "Yo !"){
      message.channel.send("Bonjour ! Ca va ?");
      }

if(message.content === "Bonjour !"){
  message.channel.send("Bonjour ! Ca va ?");
  }

if(message.content === "Ca va ?"){
  message.channel.send("Oui et toi ?");
  }

  if(message.content === "Ca va"){
    message.channel.send("Oui et toi ?");
    }


    if(message.content === "cv"){
      message.channel.send("Oui et toi ?");
      }

      if(message.content === "cv ?"){
        message.channel.send("Oui et toi ?");
        }

        if(message.content === "test"){
            message.delete();
  if(message.author.id == "390948313601671168"){
          message.channel.send(":tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n :tada: \n ");
        }
      }

if(message.content === "Miaou"){
  message.channel.send("Miaou ? Je suis bien là, je n'ai pas crash ! :D");
  }

  if(message.content === "cc"){
    message.channel.send("Coucou ! Ca va ?")
    }

    if(message.content.startsWith(prefix + "report")){
      message.delete();
      var reportargs = message.content.substr(7);
      if(!reportargs) return message.channel.send(":x: **Merci d'indiquer :** \n ``Pseudo + TAG + ID + Raison`` \n **Ou** \n ``Détail du bug + Heure + Serveur``  :x:")
      if(!message.guild.channels.find("name", "report")) return message.reply(":x: **Vous devez créer le salon `report` et y mettre la permission pour que ᴄᴀᴛʙᴏᴛ puisse y écrire dedans !** :x:");
      var report_embed = new Discord.RichEmbed()
      .setColor("#B40404")
      .setTitle("Report")  
      .addField("__Par : __","<@" + message.author.id + ">")
      .addField("__**Pour : **__ ", reportargs, true)
      .setFooter("ᴄᴀᴛʙᴏᴛ | Report " + message.guild.name + ".")
      message.guild.channels.find('name', 'report').send(report_embed).catch();
      console.log(message.author.tag + " ou " + message.author.id + " a report : " + reportargs + "  | sur le serveur : " + message.guild.name);
      message.channel.send("__**Report envoyé avec succès !**__").then(function (message) { message.react("✅") })

      var reportlogs_embed = new Discord.RichEmbed()
      .setColor("#B40404")
      .setTitle("Report")  
      .addField("__Par : __","<@" + message.author.id + ">")
      .addField("__**Pour : **__ ", reportargs, true)
      .setFooter("ᴄᴀᴛʙᴏᴛ | Report " + message.guild.name + ".")
      message.guild.channels.find('name', 'catlogs').send(reportlogs_embed).catch();
  }

  if(message.content.startsWith(prefix + "msg")){
    message.delete();
    let msgdest = message.mentions.users.first()
    if(!msgdest) return message.channel.send(":tools: **Comment utiliser ma commande ->** ```/msg <@utilisateur> <Message>```  :tools: **Requis ->** ```Il faut que le destinataire ait activé les Messages Privés.```")
    let msgmsg = message.content.split(" ").slice(2).join(" ");
    if(!msgmsg) return message.channel.send("** :x: Merci d'entrer un texte à envoyer.** :x:")

    var msg_embed = new Discord.RichEmbed()
    .setColor("#339999")
    .setTitle("🌐 ᴄᴀᴛʙᴏᴛ 🌐")
    .addField(msgmsg, "⭐▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬⭐")
    .setFooter(message.author.tag + " ➡ " + message.guild.name).setTimestamp()
    message.mentions.members.first().send(msg_embed)

            if(message.mentions.users.first().presence.status === "online"){
              var status = '<:online:445241902363574272>';
          }else if(message.mentions.users.first().presence.status === "invisible"){
              var status = '<:invisible:445241902527414292>';
          }else if(message.mentions.users.first().presence.status === "idle"){
              var status = '<:idle:445241902078623746>';
          }else{
              var status = '<:dnd:445241902334345216>';
          }

    var msgdest_embed = new Discord.RichEmbed()
    .setColor("#339999")
    .addField("Status du message : ", " :ok:")
    .addField("Status du Destinataire : ", status)
    .setFooter("dnd ➡ Ne pas déranger | online ➡ Actif | invisible ➡ Invisible | idle ➡ Inactif")
    message.channel.send(msgdest_embed).then(function (message) { message.react("✅") })
    console.log(message.author.tag + " a envoyé un message à partir du serveur " + message.guild.name + ". Il a écrit : " + msgmsg + " à " + msgdest)
 

  }
  if(message.content === "te"){
    message.channel.send('<:invisible:445241902527414292:>')
  }

  if(message.content.startsWith(prefix + "pile-face")){
    message.delete();
    var replies = ["Pile", "Face"];
    var result = replies[Math.floor(Math.random()*replies.length)];
  
   var ballembed = new Discord.RichEmbed()
   .setColor("#339999")
   .addField("__Pile ou Face ?__ ", ":arrow_right: " + result)
   .setFooter("ᴄᴀᴛʙᴏᴛ, 2018 | Requête de : " + message.author.tag)
  message.channel.send(ballembed);
  
  }

      if(message.content.startsWith(prefix + 'ban')){
        message.delete();
        if (message.channel.type === "dm") return;
                if(!message.mentions.users.first()){
          return message.channel.send(":tools: **Comment utiliser ma commande ->** ```/ban <@utilisateur> <raison>```  **Permission requise ->** ```BAN_MEMBERS```**Salons requis ->** ```catlogs```");
        }
          if(!message.guild.channels.find("name", "catlogs")) return message.reply(":x: **Vous devez créer le salon `catlogs` !** :x:");

        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))  return message.reply("**:x: Vous n'avez pas la permission !** :x:").catch(console.error);
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
          return message.reply("**:x: Je n'ai pas la permission pour bannir. :x:**").catch(console.error);
          
        }
        var reason = message.content.split(" ").slice(2).join(" ");
        if(!reason){
             return message.channel.send(":x: **Vous devez indiquer une raison valable !** :x:")
         };
        var member = message.mentions.users.first();             
        message.guild.members.get(member.id).ban(); {
          var mentionned = message.mentions.users.first();
          var getvalueof;
          if(mentionned){
              var getvalueof = mentionned;
          } else {
              var getvalueof = message.author;
          }
        message.client.users.get(getvalueof.id).send("**Tu as été Banni du serveur **" +  message.guild.name + "** Pour la raison** " + reason)
        var ban_embed = new Discord.RichEmbed()
        var ticket_finsh = new Discord.RichEmbed()
        .setColor("#01DF01")
        .setDescription("**Bannissement exécuté avec succès. ✅**")
        message.channel.send(ticket_finish).catch();

        var banlog_embed = new Discord.RichEmbed()
        .setColor("#B40404")
        .addField("**Bannissement du joueur **", message.mentions.users.first(), true)
        .addField("**Bannissement exécuté Par **", message.author.tag, true)
        .addField("**Raison du bannissement : **", reason, true)
        .setImage("https://cdn.discordapp.com/attachments/424936338031116308/454634287484895232/BAN.gif")
        .setFooter("ᴄᴀᴛʙᴏᴛ | Bannissement d'un membre du serveur " + message.guild.name + ".")
        message.guild.channels.find('name', 'catlogs').send(banlog_embed).catch();
console.log(message.mentions.users.first() + "`` a été banni Par ``  <@" + message.author.id+"> ``Pour la raison`` **" + reason + " sur le serveur " + message.guild.name);
         

      }
      };

    
    
      if(message.content.startsWith(prefix + 'kick')){
        message.delete();
      if (message.channel.type === "dm") return;
      if(!message.guild.channels.find("name", "catlogs")) return message.reply(":x: **Vous devez créer le salon `catlogs` !** :x:");
      if(!message.mentions.users.first()){
        return message.channel.send(":tools: **Comment utiliser ma commande =>** ```/kick <@utilisateur> <raison>```  **Permission requise ->** ```KICK_MEMBERS``` **Salon requis ->** ```catlogs```");
      }
      if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))  return message.reply("**:x: Vous n'avez pas la permission !** :x:").catch(console.error);
      if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
        return message.reply("**:x: Je n'ai pas la permission pour exclure. :x:**").catch(console.error);
        
      }
      var reason = message.content.split(" ").slice(2).join(" ");
      if(!reason){
           return message.channel.send(":x: **Vous devez indiquer une raison valable !** :x:")
       };
      var member = message.mentions.users.first();             
      message.guild.members.get(member.id).kick(); {
        var mentionned = message.mentions.users.first();
        var getvalueof;
        if(mentionned){
            var getvalueof = mentionned;
        } else {
            var getvalueof = message.author;
        }
        message.client.users.get(getvalueof.id).send("**Tu as été exclu du serveur **" +  message.guild.name + "** Pour la raison** " + reason)

        var ticket_finsh = new Discord.RichEmbed()
        .setColor("#01DF01")
        .setDescription("**Exclusion exécutée avec succès. ✅**")
        message.channel.send(ticket_finish).catch();

        var kicklog_embed = new Discord.RichEmbed()
        .setColor("#B40404")
        .addField("**Exclusion du joueur **", message.mentions.users.first(), true)
        .addField("**Exclusion exécutée Par **", message.author.tag, true)
        .addField("**Raison de l'exclusion : **", reason, true)
        .setFooter("ᴄᴀᴛʙᴏᴛ | Exclusion d'un membre du serveur " + message.guild.name + ".")
        message.guild.channels.find('name', 'catlogs').send(kicklog_embed).catch();

        console.log(message.mentions.users.first() + "`` a été exclu Par ``  <@" + message.author.id+"> ``Pour la raison`` **" + reason + " sur le serveur " + message.guild.name);

      }
    }

    if(message.content.startsWith(prefix + 'warn')){
      message.delete();
      if(!message.guild.channels.find("name", "catlogs")) return message.reply(":x: **Vous devez créer le salon `catlogs` !** :x:");
       var botrole = message.guild.member(client.user).hasPermission("KICK_MEMBERS");
    var memberrole = message.guild.member(message.author).hasPermission("KICK_MEMBERS");
    var reportmember = message.member.id;
    if(!message.mentions.users.first())
    return message.channel.send(":tools: **Comment utiliser ma commande =>** ```/warn <@utilisateur> <raison>``` **Permission requise ->** ```KICK_MEMBERS``` **Salon requis ->** ```logs``` ")
    var member = message.mentions.users.first();
    var reason = message.content.split(" ").slice(2).join(" ");
    if(!botrole){
        return message.channel.send(":x: **Je n'ai pas la permission ``KICK_MEMBERS`` pour avertir cet utilisateur !:x: **")
      };
        if(!memberrole){
            return message.channel.send(":x: **Tu n'as pas la permission ``KICK_MEMBERS`` pour avertir cet utilisateur !** :x:")
        };
        if(!reason){
            return message.channel.send(":x: **Vous devez indiquer une raison valable !** :x:").catch()
        };
    if(memberrole){
        if(botrole){
          if(message.guild.member(message.mentions.users.first())){
                eval(message.guild.member(message.mentions.users.first()))
                message.guild.member(message.mentions.users.first()).send("Tu as été averti sur le serveur " +  message.guild.name + " par le modérateur <@" + message.author.id+"> pour la raison : \n " + reason )
              
                
                var ticket_finsh = new Discord.RichEmbed()
                .setColor("#01DF01")
                .setDescription("**Avertissement exécuté avec succès. ✅**")
                message.channel.send(ticket_finish).catch();

                var warnlog_embed = new Discord.RichEmbed()
                .setColor("#B40404")
                .addField("**Avertissement du joueur **", message.mentions.users.first(), true)
                .addField("**Avertissement exécuté Par **", message.author.tag, true)
                .addField("**Raison de l'avertissement : **", reason, true)
                .setFooter("ᴄᴀᴛʙᴏᴛ | Avertissement d'un membre du serveur " + message.guild.name + ".")
                message.guild.channels.find("name", "catlogs").send(warnlog_embed)

                console.log(message.mentions.users.first() + "`` a été averti Par ``  <@" + message.author.id+"> ``Pour la raison`` **" + reason + " sur le serveur " + message.guild.name);
                }
            }}
          }

         
        


    if(message.content.startsWith(prefix + "prefix")){
      var fs = require('fs');
      var args = message.content.substr(8);
      if(!args) return message.reply("**Tu n'as pas défini un préfixe ``VALABLE`` !** :x:");

      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

      prefixes[message.guild.id] = {
        prefixes: args
      };
      

      fs.writeFile("./prefixes.json", JSON.stringify(prefixes), err => {
        if (err) console.log(err)
      });
      let prefixembed = new Discord.RichEmbed()
      .setColor("#339999")
      .setTitle("Prefixe")
      .setDescription(`Le nouveau préfixe est __** ${args} **__ !`)
      message.channel.send(prefixembed).catch();
    }


      


              
              
              
    });

client.login(token)