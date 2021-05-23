const defaultPlayer = {
    // player data
    gold: 0,
    beatScore: 0,

    // area data
    playingArea: "plainArea",
    areaScore: 0,
    undoUsed: 0,
    removeUsed: 0,
    isUndoAvaible: false,
    undoField: {},

    // area
    numberArea: {},
    plainArea: {},

    // shop items
    shop_remove: 0,
    shop_undo: 0,
    shop_mapWidth: 3,
    shop_mapHeight: 3,
};

module.exports = defaultPlayer;