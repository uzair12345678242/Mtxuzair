module.exports.config = {
  name: "npm",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHANKAR",
  description: "",
  commandCategory: "user",
  usages: "npm",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require('axios');
  var cc = args.join(" ");

  // Checking if the user has provided a package name
  if (!cc) return api.sendMessage(`Please enter the name of the package you want to search for!`, event.threadID, event.messageID);

  // Making the API request using axios
  try {
    const res = await axios.get(`https://npm-packages-list-api.p.rapidapi.com/suggestions?q=${encodeURIComponent(cc)}`, {
      headers: {
        'x-rapidapi-host': 'npm-packages-list-api.p.rapidapi.com',
        'x-rapidapi-key': '6734af4409msh8d5419367b0d679p14dcb3jsn113f61b581db' // Your API Key
      }
    });

    // Extracting the response data
    const a = res.data[0].name;  // Name of the first suggested package
    const b = res.data[0].description;  // Description of the package
    const d = res.data[0].keywords;  // Keywords associated with the package

    // Sending the response back to the user
    if (!a || !b) return api.sendMessage(`Package does not exist or no data available`, event.threadID, event.messageID);
    return api.sendMessage({ body: `[💙]━━『 PACKAGE INFO 』━━[💙]\n\n==== Package: ${cc} ====\n→ Name: ${a}\n→ Description: ${b}\n→ Keywords: ${d ? d.join(', ') : 'No keywords'}` }, event.threadID, event.messageID);

  } catch (error) {
    console.error(error);
    return api.sendMessage(`There was an error retrieving the package data.`, event.threadID, event.messageID);
  }
};
