const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('ready', async () => {

    console.log(`${client.user.tag} is online!`);

    const channel = await client.channels.fetch(process.env.CHANNEL_ID);

    async function sendNews() {

        try {

            const response = await axios.get(
                'https://fortnite-api.com/v2/news'
            );

            const news = response.data.data.br.motds[0];

            const embed = new EmbedBuilder()
                .setTitle(news.title)
                .setDescription(news.body)
                .setImage(news.image)
                .setColor('Purple')
                .setFooter({ text: 'Fortnite News' });

            await channel.send({ embeds: [embed] });

        } catch (error) {

            console.error(error);

        }

    }

    sendNews();

    setInterval(sendNews, 3600000);

});

client.login(process.env.DISCORD_TOKEN);