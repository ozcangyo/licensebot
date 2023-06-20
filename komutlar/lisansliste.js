// GYO WAS HERE :)
const { SlashCommandBuilder } = require('@discordjs/builders');
const mysql = require('mysql');
const config = require('../config.json');

const connection = mysql.createConnection({
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDatabase
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lisansliste')
        .setDescription('Lisansları listeler'),
    async execute(interaction) {
        connection.query('SELECT * FROM licenses', (error, results) => {
            if (error) {
                console.error(error);
                return interaction.reply({ content: 'Bir hata oluştu!', ephemeral: true });
            }

            if (results.length === 0) {
                return interaction.reply({ content: 'Kayıtlı lisans bulunamadı!', ephemeral: true });
            }

            let licenses = 'Lisanslar:\n';
            for (const result of results) {
                licenses += `IP: ${result.ip} | Sunucu İsmi: ${result.serverName} | Lisans Anahtarı: ${result.licenseKey}\n`;
            }

            interaction.reply({ content: licenses });
        });
    },
};
