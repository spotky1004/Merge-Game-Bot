function command({player, arg}) {
    if (arg.length < 1) return;

    let direction = {x: 0, y: 0};
    let workOrder = Array.from({length: player.areaHeight}, (_, y) => Array.from({length: player.areaWidth}, (_, x) => y*player.areaWidth+x));
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
            workOrder.map(e => e.reverse())
            break;
        case "left": case "l":
            direction.x = -1;
            break;
    }

    const playingArea = player[player.playingArea];
    const boardBefore = playingArea.toMessageForm();

    playingArea.push(direction.x, direction.y, workOrder.flat());

    const generated = playingArea.generate();
    const boardAfter = playingArea.toMessageForm(generated.position);

    return {
        toSend: [
            boardBefore,
            "> " + generated.message
        ],
        toEdit: [
            boardAfter
        ],
        editTime: 500
    };
}

module.exports = command;