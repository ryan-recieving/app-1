const { Client } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 */

module.exports = async (client) => {
  // Commands
  let loaded_commands = 0;
  let loaded_events = 0;

  let app_commands = [];
  for (const folder of fs.readdirSync("./src/app_commands")) {
    const app_command_files = fs
      .readdirSync(`./src/app_commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of app_command_files) {
      const app_command = require(`../../app_commands/${folder}/${file}`);
      client.commands.set(app_command.data.name, app_command);
      app_commands.push(app_command.data.toJSON());
      loaded_commands += 1
      continue;
    }
  }
  client.application.commands.set(app_commands)
  // Events
  for (const file of fs
    .readdirSync("./src/app_events")
    .filter((file) => file.endsWith(".js"))) {
    const event = require(`../../app_events/${file}`);
    if (event.data.rest) {
      if (event.data.once) {
        client.rest.once(event.data.name, (...args) =>
          event.data.callback(...args, client)
        );
      } else {
        client.rest.on(event.data.name, (...args) =>
          event.data.callback(...args, client)
        );
      }
    } else {
      if (event.data.once) {
        client.once(event.data.name, (...args) =>
          event.data.callback(...args, client)
        );
      } else {
        client.on(event.data.name, (...args) =>
          event.data.callback(...args, client)
        );
      }
    }
    loaded_events += 1
  }
  console.log(`Successfully Ported ${loaded_commands} Slash Commands | ✅`)
  console.log(`Successfully Ported ${loaded_events} Events | ✅`)
};
