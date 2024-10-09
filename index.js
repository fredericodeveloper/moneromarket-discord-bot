const Discord = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log('The bot is ready.');
});

client.on('messageCreate', async (message) => {
    if (message.author.id === client.user.id) return;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = message.content.match(urlRegex);

    if (matches) {
        for (const match of matches) {
            const basedomain = new URL(match).hostname;

            if (basedomain === 'moneromarket.io' || basedomain === 'www.moneromarket.io') {
                try {
                    const response = await axios.get(match);

                    if (response.status !== 200) return;

                    const $ = cheerio.load(response.data);
                    const images = $('img.mini-img');
                    const h3Element = $('h3').first();
                    const usdValue =  $('span.usd-badge').first();
                    const xmrValue =  $('span.xmr-badge2').first();
                    const desc =  $('pre.mm-desc').first();

                    if (images.length > 0) {
                        const embed = new Discord.EmbedBuilder()
                            .setTitle(h3Element.text())
                            .setDescription(`<@${message.author.id}>\nPrice: ${usdValue.text()} / ${xmrValue.text().replace(/\n/g, '')}`) // Customize as needed
                            .setImage(images.first().attr('src'))
                            .setFooter({ text: desc.text() });

                        const button = new ButtonBuilder()
                            .setLabel('Go To Product')
                            .setURL(match)
                            .setStyle('Link');

                        const row = new ActionRowBuilder().addComponents(button);

                        await message.channel.send({ embeds: [embed], components: [row] });
                        await message.delete(); // Delete the original message
                    }
                } catch (error) {
                    console.error('Error fetching the URL:', error);
                }
            }
        }
    }
});

console.log(process.env.TOKEN)

client.login(process.env.TOKEN);