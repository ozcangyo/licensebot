// GYO WAS HERE :)

const fs = require('fs');
const { Collection } = require('discord.js');

module.exports = (client) => {
    client.commands = new Collection();

    const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./komutlar/${file}`);
        client.commands.set(command.name, command);
    }

    client.on('messageCreate', message => {
        if (!message.content.startsWith('/')) return;

        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);

        if (!command) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Bir hata oluştu!');
        }
    });
};
