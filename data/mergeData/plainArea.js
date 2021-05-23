const plainArea = {
    emojiSet: global.emoji.plain,
    mergeMap: {},
    scoreLevel: {
        0: 0, 1: 0, 2: 1, 3: 2, 4: 3,
        5: 4, 6: 5, 7: 6, 8: 1, 9: 2,
        10:3, 11:4
    },
    scoreTable: [
        0, // 0
        10,
        20,
        50,
        150,
        600, // 5
        3000
    ]
}

const material = {
    Log: 0,
    Rock: 1,
    WoodenAxe: 2,
    WoodenPickaxe: 3,
    Cobblestone: 4,
    StonePickaxe: 5,
    StoneKit: 6,
    Mine: 7,
    Stones: 8,
    StonePile: 9,
    Wall: 10,
    House: 11
}

let recipe = plainArea.mergeMap;
const m = material;
addRecipe(m.Log, m.Log, m.WoodenAxe);
addRecipe(m.Log, m.WoodenAxe, m.WoodenPickaxe);
addRecipe(m.WoodenPickaxe, m.Rock, m.Cobblestone);
addRecipe(m.Cobblestone, m.Log, m.StonePickaxe);
addRecipe(m.Cobblestone, m.Cobblestone, m.StoneKit);
addRecipe(m.StoneKit, m.Log, m.Mine);
addRecipe(m.Rock, m.Rock, m.Stones);
addRecipe(m.Stones, m.Stones, m.StonePile);
addRecipe(m.StonePile, m.StonePile, m.Wall);
addRecipe(m.Wall, m.Log, m.House);

function addRecipe(meterial1, meterial2, resultItem) {
    if (typeof recipe[meterial1] === "undefined") recipe[meterial1] = {};
    if (typeof recipe[meterial2] === "undefined") recipe[meterial2] = {};
    recipe[meterial1][meterial2] = resultItem;
    recipe[meterial2][meterial1] = resultItem;
}

module.exports = plainArea;