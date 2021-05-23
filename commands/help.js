function command({}) {
    let msg = new Discord.MessageEmbed()
        .setColor("#79b4fc")
        .setTitle(`Help`)
        .setDescription(`\`\`\`Welcome to ${botName}!\`\`\``)
        .setThumbnail("https://cdn.discordapp.com/avatars/844900969254223895/74d9e9d6ed2c3ecadabe95e0801cc15d.webp?size=512")
        .setTimestamp()
        .setFooter(botName);

    let fieldsToAdd = [];
    addHelpField(fieldsToAdd, "help", "Open this page.");
    addHelpField(fieldsToAdd, "move (direction)", "Move items on the board.\nYou can use `up/down/left/right` or `u/d/l/r`");
    addHelpField(fieldsToAdd, "remove (x) (y)", "Remove a item on the board.", true);
    addHelpField(fieldsToAdd, "undo", "Undo one turn", true);
    addHelpField(fieldsToAdd, "shop", "Open the Upgrade Shop");

    msg.addFields(...fieldsToAdd);
        
    return {
        toSend: msg
    }
}

function addHelpField(arr, name, description, inline=false) {
    arr.push({name: `\`\`\`${name}\`\`\``, value: description, inline: inline})
}

module.exports = command;