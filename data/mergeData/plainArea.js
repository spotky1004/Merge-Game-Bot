const plainArea = {
    emojiSet: global.emoji.plain,
    mergeMap: {},
    scoreLevel: {
        0: 0, 1: 0, 2: 1, 3: 2, 4: 3,
        5: 4, 6: 5, 7: 6, 8: 1, 9: 2,
        10:3, 11:4, 12:1, 13:2, 14:7,
        15:8, 16:8, 17:9
    },
    scoreTable: [
        0, // 0
        10,
        20,
        50,
        150,
        600, // 5
        3000,
        18000,
        90000,
        999999
    ],
    goal: "Diamond"
}

const material = {
    Log: 0,
    Rock: 1,
    StoneAxe: 2,
    WoodenPickaxe: 3,
    Cobblestone: 4,
    StonePickaxe: 5,
    StoneKit: 6,
    Mine: 7,
    Stones: 8,
    StonePile: 9,
    Wall: 10,
    House: 11,
    Sticks: 12,
    Fire: 13,
    IronOre: 14,
    IronBar: 15,
    IronPickaxe: 16,
    Diamond: 17
}

let recipe = plainArea.mergeMap;
const m = material;
addRecipe(m.Log, m.Rock, m.StoneAxe);
addRecipe(m.Log, m.StoneAxe, m.WoodenPickaxe);
addRecipe(m.Sticks, m.StoneAxe, m.WoodenPickaxe);
addRecipe(m.WoodenPickaxe, m.Rock, m.Cobblestone);
addRecipe(m.Cobblestone, m.Cobblestone, m.StoneKit);
addRecipe(m.StoneKit, m.Log, m.Mine);
addRecipe(m.StoneKit, m.Sticks, m.Mine);
addRecipe(m.Rock, m.Rock, m.Stones);
addRecipe(m.Stones, m.Stones, m.StonePile);
addRecipe(m.StonePile, m.StonePile, m.Wall);
addRecipe(m.Wall, m.Log, m.House);
addRecipe(m.Log, m.Log, m.Sticks);
addRecipe(m.Sticks, m.Rock, m.Fire);
addRecipe(m.Mine, m.House, m.IronOre);
addRecipe(m.IronOre, m.Fire, m.IronBar);
addRecipe(m.IronBar, m.Log, m.IronPickaxe);
addRecipe(m.IronBar, m.Sticks, m.IronPickaxe);
addRecipe(m.IronPickaxe, m.Mine, m.Diamond);

function addRecipe(meterial1, meterial2, resultItem) {
    if (typeof recipe[meterial1] === "undefined") recipe[meterial1] = {};
    if (typeof recipe[meterial2] === "undefined") recipe[meterial2] = {};
    recipe[meterial1][meterial2] = resultItem;
    recipe[meterial2][meterial1] = resultItem;
}

module.exports = plainArea;