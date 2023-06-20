// GYO WAS HERE :)
const { SlashCommandBuilder } = require('@discordjs/builders');
const { GatewayIntentBits } = require('discord.js');
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
        .setName('lisanssil')
        .setDescription('Lisansı siler')
        .addStringOption(option => option.setName('licensekey').setDescription('Lisans Anahtarı').setRequired(true)),
    async execute(interaction) {
        const member = interaction.member;
        if (!member.permissions.has(GatewayIntentBits.ADMINISTRATOR)) {
            return await interaction.reply({ content: 'Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz!', ephemeral: true });
        }

        const licenseKey = interaction.options.getString('licensekey');

        connection.query('DELETE FROM licenses WHERE licenseKey = ?', [licenseKey], (error, results) => {
            if (error) {
                console.error(error);
                return interaction.reply({ content: 'Bir hata oluştu!', ephemeral: true });
            }

            if (results.affectedRows === 0) {
                return interaction.reply({ content: 'Bu lisans anahtarı bulunamadı!', ephemeral: true });
            }

            interaction.reply({ content: 'Lisans başarıyla silindi!' });
        });
    },
};
