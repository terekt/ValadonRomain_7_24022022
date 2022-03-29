export class tagFactory {
    constructor(data) {

        function tagDOM() {
            const tagList = document.createElement("div");
            tagList.setAttribute("class", "tag-item");

            let card = `${data}`;

            tagList.innerHTML = card;

            return tagList;
        }
        return {
            data,
            tagDOM,
        };
    }
}