require("dotenv").config();

const { Token, Atlas } = process.env;
const { connect } = require("mongoose");
const app_directorys = require("./app_external/js/app@directorys");
const {
  Client,
  Collection,
  Partials,
  GatewayIntentBits,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  partials: [User, Message, GuildMember, ThreadMember],
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
});

client.commands = new Collection();
client.cooldowns = new Collection();

try {
  client.login(Token).then(() => {
    connect(Atlas).then(() => console.log("Database | ✅"));
    app_directorys(client)
  })
} catch (err) {
  console.log(err);
}
