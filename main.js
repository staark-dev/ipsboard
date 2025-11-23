class IPSBoard {
    constructor() {
        this.boards = new Map();
        this.variables = new Map();
        this.FA = window.FA || {};
        this.user = window._userdata || {};
    }

    createBoard(name) {
        if (!this.boards.has(name)) {
            this.boards.set(name, new Map());
        }
    }

    setVariable(boardName, key, value) {
        if (!this.boards.has(boardName)) {
            throw new Error(`Board "${boardName}" does not exist.`);
        }
        this.boards.get(boardName).set(key, value);
    }

    getVariable(boardName, key) {
        if (!this.boards.has(boardName)) {
            throw new Error(`Board "${boardName}" does not exist.`);
        }
        return this.boards.get(boardName).get(key);
    }

    createHTML(boardName) {
        if (!this.boards.has(boardName)) {
            throw new Error(`Board "${boardName}" does not exist.`);
        }
        const board = this.boards.get(boardName);
        let html = `<div class="ips-board" id="${boardName}">\n`;
        for (let [key, value] of board.entries()) {
            html += `  <div class="ips-variable" data-key="${key}">${value}</div>\n`;
        }
        html += `</div>`;
        return html;
    
    }
}

console.log("IPSBoard script has been initialized !");
window.IPSBoard = IPSBoard;
window.IPS_FA = window.FA || {};
window.IPS_USER = window._userdata || {};
