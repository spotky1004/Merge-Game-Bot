const items = require("../data/shopItems");

function command({player, arg}) {
    let msg = new Discord.MessageEmbed()
        .setColor("#fcfa79")
        .setTitle(`Upgrade Shop  ·  ${player.gold.toLocaleString()} ${emoji.gold}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/845517416334229557/845524222826250280/output-onlinegiftools_2.gif")
        .setDescription("```Upgrade them to be stronger!```")
        .setTimestamp()
        .setFooter("You can earn coin when Gameover/" + botName);

    let fieldsToAdd = [];

    if (arg.length >= 1) {
        const cmd = arg[0];
        let item = null;
        for (let i = 0, l = items.length; i < l; i++) {
            if (items[i].command.includes(cmd)) {
                item = items[i];
                break;
            }
        }
        
        if (item !== null) {
            const itemCost = item.cost(player[item.key]);
            if (player.gold >= itemCost && player[item.key] < item.maxLevel) {
                msg
                .setColor("#8bf069")
                .setTitle(`Upgrade Shop  ·  ${player.gold.toLocaleString()} ${emoji.gold}`);
                player.gold -= itemCost;
                if (item.name === "Width" || item.name === "Height") {
                    player[player.playingArea].reset();
                }
                player[item.key]++;
            } else {
                msg.setColor("#f06969");
            }
            fieldsToAdd.push(makeItemList(item, player));
        } else {
            return {
                toSend: "Invaild item name!"
            }
        }
    } else {
        for (let i = 0, l = items.length; i < l; i++) {
            fieldsToAdd.push(makeItemList(items[i], player));
        }
    }

    msg.addFields(...fieldsToAdd);

    return {
        toSend: msg
    }
}

function makeItemList(item, player) {
    let field = {
        name: null,
        value: ""
    };

    field.name = item.name + ` ${player[item.key]}/${item.maxLevel}`;
    field.value += `\`${item.description}\``+"\n";
    field.value += `\`${
        player[item.key] < item.maxLevel ?
        item.cost(player[item.key]).toLocaleString() :
        "Max Level"
    }\` ${emoji.gold}`+"\n";

    return field;
}

module.exports = command;