class MergeField {
    constructor (field={}, size={x: 4, y: 4}, mergeData={}, player) {
        this.field = {...field};
        this.score = 0;
        this.size = size;
        this.emojiSet = mergeData.emojiSet;
        this.mergeMap = mergeData.mergeMap;

        this.mergeData = mergeData;
        this.player = player;
    }

    push(dx=0, dy=0, order) {
        dy *= -1;
        let totalScoreEarned = 0;

        for (let flatPos of order) {
            if (typeof this.field[flatPos] === "undefined") continue;

            flatPos = Number(flatPos);

            let pos = {
                x: flatPos%this.size.x,
                y: Math.floor(flatPos/this.size.x)
            };

            if (
                (0 < pos.y || dy > 0) &&
                (pos.y < this.size.y-1 || dy < 0)
            ) pos.y += dy;
            if (
                (0 !== pos.x%this.size.x || dx > 0) &&
                (this.size.x-1 !== pos.x%this.size.x || dx < 0)
            ) pos.x += dx;
            
            const newFlatPos = pos.y*this.size.x + pos.x;
            if (flatPos !== newFlatPos) {
                if (typeof this.field[newFlatPos] === "undefined") {
                    // just move
                    this.field[newFlatPos] = this.field[flatPos];
                    delete this.field[flatPos];
                } else {
                    // merge
                    for (const id in this.mergeMap[this.field[flatPos]]) {
                        if (Number(id) === this.field[newFlatPos]) {
                            const mergeResult = this.mergeMap[this.field[flatPos]][id];
                            this.field[newFlatPos] = mergeResult;

                            const scoreTable = this.mergeData.scoreTable;
                            if (typeof this.mergeData.scoreTable !== "undefined") {
                                const scoreEarned = scoreTable[this.mergeData.scoreLevel[mergeResult]] ?? 0;
                                this.player.areaScore += scoreEarned;
                                totalScoreEarned += scoreEarned;
                            }
                            delete this.field[flatPos];
                            break;
                        }
                    }
                }
            }
        }

        return totalScoreEarned;
    }

    generate() {
        let available = Array.from({length: this.size.x*this.size.y}, (_, i) => i);
        for (const flatPos in this.field) {
            available[flatPos] = null;
        }
        available = available.filter(e => e !== null);

        let pos = -1;
        let toGenerate = Math.floor(Math.random()*2);
        if (available.length !== 0) {
            pos = available[Math.floor(available.length*Math.random())];
            this.field[pos] = toGenerate;
        }

        const output = {
            message: pos !== -1 ? `Generated ${this.emojiSet[toGenerate]} at (${pos%this.size.x+1}, ${Math.floor(pos/this.size.x)+1})` : "Gameover",
            position: pos
        };

        return output;
    }

    reset() {
        const tmpScore = this.player.areaScore;
        this.player.gold += this.player.areaScore;

        this.player.undoUsed = 0;
        this.player.isUndoAvaible = false;
        this.player.removeUsed = 0;
        this.player.undoField = {};
        
        this.player.bestScore = Math.max(this.player.bestScore, this.player.areaScore);

        this.field = {};
        this.player.areaScore = 0;

        return `\n${emoji.gold.toLocaleString()} \`${this.player.gold.toLocaleString()} (+${tmpScore.toLocaleString()})\``
    }

    toMessageForm(point) {
        let msg = "";

        for (let y = 0; y < this.size.y; y++) {
            for (let x = 0; x < this.size.x; x++) {
                const pos = y*this.size.x+x;
                const tile = this.field[pos];
                if (pos === point) {
                    msg += emoji.point;
                } else if (typeof tile !== "undefined") {
                    msg += this.emojiSet[tile];
                } else {
                    msg += emoji.empty;
                }
            }
            msg += "\n"
        }

        return msg.trim();
    }

    toSaveForm() {
        const values = Object.values(this.field);
        const keys   = Object.keys(this.field);
        return Object.fromEntries(keys.map((e, i) => [e, values[i]]).sort((a, b) => a[0]-b[0]));
    }
}

module.exports = MergeField;