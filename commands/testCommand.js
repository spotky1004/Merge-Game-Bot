function command({msg}) {
    return {
        toSend: msg.author.id
    };
}

module.exports = command;