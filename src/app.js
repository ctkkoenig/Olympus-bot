const Discord = require('discord.js');
require('dotenv').config();

const bot = new Discord.Client();
const prefix = '>>';

bot.once('ready', () => {
    console.log(`Bot is online!\nUser: ${bot.user.tag} | ID: ${bot.user.id}`);
});

bot.on('message', (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'announce') {
        if (!msg.member.roles) {
            return msg.reply('you don\'t have any roles to check permissions for!');
        }

        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.reply('you don\'t have permission to use this command!');
        }

        msg.delete().catch((err) => {
            msg.reply('missing `manage_messages` permission to delete command message!');
        });

        msg.channel.send(args.join(' '));
    }
});

bot.login(process.env.TOKEN);
