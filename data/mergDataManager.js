let toExport = {};
fs.readdirSync("./data/mergeData").forEach(file => {
    toExport[file.replace(".js", "")] = require("./mergeData/" + file);
});

module.exports = toExport;