function log(msg) {
    console.log('[LOG] :: ' + msg);
}

const config = require('./config');
const token = config.bot.token;

const Eris = require('eris');
const { CommandClient } = require('eris');
const client = new CommandClient(`Bot ${token}`, {
    intents: ['guilds', 'guildMembers', 'guildPresences', 'guildMessages'],
    maxShards: 'auto',
    restMode: true,
    getAllUsers: true,
    autoreconnect: true,
});

client.on('ready', async () => {
    await client.bulkEditCommands([
        {
            name: 'test',
            description: 'A test command!',
            type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
        },
    ]);

    client.editStatus('online', { name: 'My Discord Bot!', type: 1 });
    log(`✅ Logged in as ${client.user.username}#${client.user.discriminator}!`);
});

client.on('interactionCreate', async (interaction) => {
    if (interaction?.data?.name === 'test') {
            await interaction.createMessage({
                content: 'hello world!',
            });
    }
});

client.connect();
