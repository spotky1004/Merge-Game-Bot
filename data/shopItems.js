const shopItems = [
    {
        key: "shop_remove",
        name: "Remove",
        description: "Allows you Remove one item on the board.", 
        command: ["remove", "r"],
        cost: (lv) => Math.floor((lv**3 + 1)*(500 + 500*lv)),
        maxLevel: 9
    },
    {
        key: "shop_undo",
        name: "Undo",
        description: "Allows you Undo one turn.",
        command: ["undo", "u"],
        cost: (lv) => Math.floor((lv+1)**2*(1000+lv*500)),
        maxLevel: 9
    },
    {
        key: "shop_mapWidth",
        name: "Width",
        description: "Increase board's width by 1. *this will reset your board",
        command: ["width", "w"],
        cost: (lv) => Math.floor(50**(lv-3)*1e4),
        maxLevel: 5
    },
    {
        key: "shop_mapHeight",
        name: "Height",
        description: "Increase board's height by 1. *this will reset your board",
        command: ["height", "h"],
        cost: (lv) => Math.floor(30**(lv-3)*1e5),
        maxLevel: 5
    },
    {
        key: "shop_speed",
        name: "Speed",
        description: "Move will be faster by 0.2sec (Start: 2sec)",
        command: ["speed", "s"],
        cost: (lv) => Math.floor((1.4**lv*(1000*(lv+1)**1.4))/1000)*1000,
        maxLevel: 7
    }
];

module.exports = shopItems;