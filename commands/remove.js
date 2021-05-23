function command({player, arg}) {
    if (arg.length >= 2) {
        if (player.removeUsed < player.shop_remove) {
            const [x, y] = arg.map(e => Spl.cutNumber(e, 0));
            const flatPos = (x-1)+(y-1)*player.shop_mapWidth;
            const playingArea = player[player.playingArea];
            if (typeof playingArea.field[flatPos] !== "undefined") {
                const toDelete = playingArea.field[flatPos];
                delete playingArea.field[flatPos];
                player.removeUsed++;
                return {
                    toSend: `Removed ${playingArea.emojiSet[toDelete]} at (${x}, ${y})!\nYou have \`${player.shop_remove-player.removeUsed}/${player.shop_remove}\` Remove count left.`
                }
            } else {
                return {
                    toSend: `(${x}, ${y}) is empty!`
                }
            }
        } else {
            return {
                toSend: `You don't have any Remove count left!`
            }
        }
    } else {
        return {
            toSend: `To use) \`-move (x) (y)\``
        }
    }
}

module.exports = command;