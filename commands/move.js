function command({player, arg}) {
    if (arg.length < 1) return;

    let direction = {x: 0, y: 0};
    let workOrder = Array.from({length: player.shop_mapHeight}, (_, y) => Array.from({length: player.shop_mapWidth}, (_, x) => y*player.shop_mapWidth+x));
    switch (arg[0]) {
        case "up": case "u":
            direction.y = 1;
            break;
        case "down": case "d":
            direction.y = -1;
            workOrder.reverse();
            break;
        case "right": case "r":
            direction.x = 1;
            workOrder.map(e => e.reverse());
            break;
        case "left": case "l":
            direction.x = -1;
            break;
    }

    if (direction.x === 0 && direction.y === 0) {
        return {
            toSend: "Invaild direction!"
        }
    }

    const playingArea = player[player.playingArea];

    // undo
    player.undoField = {...playingArea.field};
    player.isUndoAvaible = true;

    // move & generate
    const boardBefore = playingArea.toMessageForm();

    const scoreEarned = playingArea.push(direction.x, direction.y, workOrder.flat());

    const generated = playingArea.generate();
    const boardAfter = playingArea.toMessageForm(generated.position);

    let toSend = [
        boardBefore,
        ">>> " + generated.message + ` \`Score: ${player.areaScore.toLocaleString()} (+ ${scoreEarned.toLocaleString()})\`\nGoal: ${playingArea.mergeData.goal}`
    ];

    // gameover
    if (generated.position === -1) toSend.push(playingArea.reset());

    return {
        toSend: toSend,
        toEdit: [
            boardAfter
        ],
        editTime: 2000-player.shop_speed*200
    };
}

module.exports = command;