class IPSBoard {
    constructor() {
        this.boards = new Map();
        this.variables = new Map();
        this.FA = window.FA || {};
        this.user = window._userdata || {};
        this.baseURL = 'https://fgsuport.forumgratuit.ro';
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

    dateToISO(str) {
          const [weekday, day, rawMonth, year, , time] = str.split(/\s+/);
          const monthKey = rawMonth.slice(0, 3).charAt(0).toUpperCase() + rawMonth.slice(1, 3).toLowerCase();
          const months = {
            Ian: "01", Feb: "02", Mar: "03", Apr: "04", Mai: "05", Iun: "06", Iul: "07", Aug: "08", Sep: "09", Oct: "10", Noi: "11", Dec: "12"
          };
        
          const month = months[monthKey];
        
          const [hh, mm] = time.split(":");
          const hour = hh.padStart(2, "0");
          return `${year}-${month}-${day.padStart(2, "0")}T${hour}:${mm}`;//''+ year +'-'+ month +'-'+ day.padStart(2, "0") +'T'+ hour + ':' + mm;
    }

    lastPostIPS() {
        document.querySelectorAll('.ipsDataItem_lastPoster > li.ipsType_light.ipsType_blendLinks').forEach(function(oldLi) {
            const isoDate = this.dateToISO(oldLi.childNodes[0]?.data);
            const dateFormatted = new Date(isoDate).toLocaleString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            const userName = oldLi.childNodes[2]?.text() || 'User';
            const profileId = userUrl.match(/\/u(\d+)/) ? userUrl.match(/\/u(\d+)/)[1] : '1';
            const profileUrl = `${this.baseURL}/u${profileId}`; //''+ baseUrl +'/u' + profileId;
        });
        
        const styles = `By 
            <a href="${profileUrl}" rel="nofollow" data-ipshover="" data-ipshover-width="370" data-ipshover-target="${profileUrl}&amp;do=hovercard&amp;referrer=" title="Go to ${userName}'s profile" class="ipsType_break">${userName}</a>
            , <a href="${lastPostUrl}" title="Go to last post"><time datetime="${new Date().toISOString()}" title="${dateFormatted}" data-short="${dateFormatted}">${dateFormatted}</time></a>
        `;
        
        oldLi.innerHTML = styles;
        return true;
    }

    noPosts(forumRow) {
        if(Number(forumRow.posts) === 0) {
            const forumRow = document.querySelector('.cForumRow[data-forumid="'+ forumRow +'"]');
            
            if(forumRow) {
                const statsElement = forumRow.querySelector('.ipsDataItem_stats');
                if (statsElement) {
                     statsElement.innerHTML = '';
                }

                const lastPosterElement = forumRow.querySelector('.ipsDataItem_lastPoster');
                
                if (lastPosterElement) {
                    lastPosterElement.innerHTML = '<ul class="ipsDataItem_lastPoster ipsDataItem_withPhoto"><li class="ipsType_light ipsResponsive_showDesktop">No posts here yet</li></ul>';
                }
            }
        }
    }

    forumRows(posts) {
        document.currentScript.closest('.cForumRow')
            .setAttribute('data-forumid', Array.from(document.querySelectorAll('.cForumRow')).indexOf(document.currentScript.closest('.cForumRow')));
        document.currentScript.closest('.cForumRow')
            .setAttribute('posts', posts);
    }

    toggleCategory(categoryId) {
        const categoryContainer = document.querySelector(`li[data-categoryid="${categoryId}"]`);
        return;
    }
}

console.log("IPSBoard script has been initialized !");
window.IPSBoard = IPSBoard;
window.IPS_FA = window.FA || {};
window.IPS_USER = window._userdata || {};
