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
        .setName('lisansekle')
        .setDescription('Lisans ekler')
        .addStringOption(option => option.setName('ip').setDescription('Sunucu IP adresi').setRequired(true))
        .addStringOption(option => option.setName('sunucuismi').setDescription('Sunucu İsmi').setRequired(true))
        .addStringOption(option => option.setName('licensekey').setDescription('Lisans Anahtarı').setRequired(true)),
    async execute(interaction) {
        const member = interaction.member;
        if (!member.permissions.has(GatewayIntentBits.ADMINISTRATOR)) {
            return await interaction.reply({ content: 'Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz!', ephemeral: true });
        }

        const ip = interaction.options.getString('ip');
        const serverName = interaction.options.getString('sunucuismi');
        const licenseKey = interaction.options.getString('licensekey');

        connection.query('SELECT * FROM licenses WHERE licenseKey = ?', [licenseKey], (error, results) => {
            if (error) {
                console.error(error);
                return interaction.reply({ content: 'Bir hata oluştu!', ephemeral: true });
            }

            if (results.length > 0) {
                return interaction.reply({ content: 'Bu lisans anahtarı zaten mevcut!', ephemeral: true });
            }

            connection.query('INSERT INTO licenses (ip, serverName, licenseKey) VALUES (?, ?, ?)', [ip, serverName, licenseKey], (error) => {
                if (error) {
                    console.error(error);
                    return interaction.reply({ content: 'Bir hata oluştu!', ephemeral: true });
                }

                interaction.reply({ content: 'Lisans başarıyla eklendi!' });
            });
        });
    },
};
