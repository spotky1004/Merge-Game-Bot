const mergeData = require("../data/mergDataManager");

function command({player}) {
    if (player.bestField === null) return {
        toSend: "You don't have any records!"
    };

    const tmpField = new MergeField({...player.bestField.field}, {x: player.bestField.x, y: player.bestField.y}, mergeData.plainArea, player);

    return {
        toSend: [
            tmpField.toMessageForm(),
            ">>> " + `\`Score: ${player.bestScore}\``
        ]
    }
}

module.exports = command;