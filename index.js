// GYO WAS HERE :)
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const client = new Client({ 
    intents: [
		GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

const config = require('./config.json');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./komutlar/${file}`);
    client.commands.set(command.data.name, command);
}

const commands = client.commands.map(command => command.data.toJSON());

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
    try {
        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands },
        );

        console.log('Komutlar başarıyla yüklendi!');
    } catch (error) {
        console.error(error);
    }
})();

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Bir hata oluştu!', ephemeral: true });
    }
});

client.login(config.token);
