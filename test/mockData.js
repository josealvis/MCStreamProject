
module.exports = { generateDummyData }

function generateDummyData(numberOfRepos, numberOfMedia) {
    let result = [];
    for (let x = 0; x <= numberOfRepos; x++) {

        let media = [];
        for (let i = 0; i <= numberOfMedia; i++) {
            media.push(
                {
                    hashId: "rp" + x + "m" + i,
                    name: "repo" + x + " meida" + i,
                    path: "C:/Users/dir" + x + "/" + "repo" + x + " meida" + i,
                    tumbnail: "/tumbnail/?name=" + "repo" + x + " meida" + i + "-tumbnail.jpg",
                    nsfw: true
                }
            );
        }
        result.push({
            repo: "repo" + x,
            path: "C:/Users/dir" + x,
            nsfw: false,
            media
        })

    }
    return result;
}

