function command({player}) {
    if (player.shop_undo-player.undoUsed <= 0) {
        return {
            toSend: `You don't have any Undo count left`
        }
    } else if (player.isUndoAvaible) {
        player[player.playingArea].field = {...player.undoField};
        player.undoUsed++;
        player.isUndoAvaible = false;

        return {
            toSend: `Undo!\nYou have \`${player.shop_undo-player.undoUsed}/${player.shop_undo}\` Undo count left.`
        };
    } else {
        return {
            toSend: `You can't use 2 Undo in a row!`
        };
    }
}

module.exports = command;