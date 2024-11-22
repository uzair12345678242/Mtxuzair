    if (!permission.includes(event.senderID)) return api.sendMessage("[ DEV MODE ] This command is for Developers only 💻", event.threadID, event.messageID);
  const { readdirSync } = global.nodemodule["fs-extra"];
  const { threadID, messageID } = event;

  var moduleList = args.splice(1, args.length);

  switch (args[0]) {
    case "count":
    case "c": {
    let commands = client.commands.values();
    let infoCommand = "";
    api.sendMessage("[ 𝗖𝗠𝗗 ] - Currently includes " + client.commands.size + " Commands available 💌"+ infoCommand, event.threadID, event.messageID);
    break;
  }
      case "load":
      case "l": {
          if (moduleList.length == 0) return api.sendMessage("[ 𝗖𝗠𝗗 ] » Module name cannot be left blank ⚠️", threadID, messageID);
          else return loadCommand({ moduleList, threadID, messageID });
      }
      case "unload":
      case "ul": {
          if (moduleList.length == 0) return api.sendMessage("[ 𝗖𝗠𝗗 ] » Module name cannot be left empty ⚠️", threadID, messageID);
          else return unloadModule({ moduleList, threadID, messageID });
      }
      case "loadAll":
      case "all":  {
          moduleList = readdirSync(__dirname).filter((file) => file.endsWith(".js") && !file.includes('example'));
          moduleList = moduleList.map(item => item.replace(/\.js/g, ""));
          return loadCommand({ moduleList, threadID, messageID });
      }
      case "unloadAll":
      case "uall":  {
          moduleList = readdirSync(__dirname).filter((file) => file.endsWith(".js") && !file.includes('example') && !file.includes("command"));
          moduleList = moduleList.map(item => item.replace(/\.js/g, ""));
          return unloadModule({ moduleList, threadID, messageID });
      }
      case "info":
      case "i":  {
          const command = global.client.commands.get(moduleList.join("") || "");

          if (!command) return api.sendMessage("[ 𝗖𝗠𝗗 ] » The module you entered does not exist ⚠️", threadID, messageID);

          const { name, version, hasPermssion, credits, cooldowns, dependencies } = command.config;

          return api.sendMessage(
              "=== " + name.toUpperCase() + " ===\n" +
              "- Created by: " + credits + "\n" +
              "- Version: " + version + "\n" +
              "- Requires permissions: " + ((hasPermssion == 0) ? "User" : (hasPermssion == 1) ? "Administrator" : "Bot operator" ) + "\n" +
              "- Timeout: " + cooldowns + " seconds(s)\n" +
              `- Required packages: ${(Object.keys(dependencies || {})).join(", ") || "None"}`,
              threadID, messageID
          );
      }
      default: {
          return global.utils.throwError(this.config.name, threadID, messageID);
      }
  }
    }
