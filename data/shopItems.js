const shopItems = [
    {
        key: "shop_remove",
        name: "Remove",
        description: "Allows you Remove one item on the board.", 
        command: ["remove", "r"],
        cost: (lv) => Math.floor((lv**2 + 1)*(500 + 100*lv)),
        maxLevel: 49
    },
    {
        key: "shop_undo",
        name: "Undo",
        description: "Allows you Undo one turn.",
        command: ["undo", "u"],
        cost: (lv) => Math.floor((lv+1)*10000),
        maxLevel: 49
    },
    {
        key: "shop_mapWidth",
        name: "Width",
        description: "Increase board's width by 1. *this will reset your board",
        command: ["width", "w"],
        cost: (lv) => Math.floor(100**(lv-3)*1e4),
        maxLevel: 5
    },
    {
        key: "shop_mapHeight",
        name: "Height",
        description: "Increase board's height by 1. *this will reset your board",
        command: ["height", "h"],
        cost: (lv) => Math.floor(100**(lv-3)*1e5),
        maxLevel: 5
    }
];

module.exports = shopItems;