require("dotenv").config();

const { Token, Atlas } = process.env;
const { connect } = require("mongoose");
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
  client.login(Token).then(connect(Atlas)).then(console.log("Database ✅"));
} catch (err) {
  console.log(err);
}
