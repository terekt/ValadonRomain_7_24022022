import { results } from './result.js';
import recipes from './recipes.js';
import { tagFactory } from './tagFactory.js';

export class search {
    constructor() {
        var result = recipes; // récupère la BDD
        const searchinput = document.getElementById("searchinput"); // récupère la barre de recherche
        const filter = document.querySelectorAll(".filter"); // récupère tous les bouton de filtre

        var ingredientsList = result.flatMap(item => item.ingredients).map(item => item.ingredient); // récupère les ingrédients dans une array
        var applianceList = result.map(item => item.appliance);
        var ustensilsList = result.flatMap(item => item.ustensils);

        ingredientsList = [...new Set(ingredientsList)]; // enlève les doublons
        applianceList = [...new Set(applianceList)];
        ustensilsList = [...new Set(ustensilsList)];


        new results(result);
        //new searchTag(ingredientsList, applianceList, ustensilsList, filter, i);

        searchinput.addEventListener("keyup", function () { // quand on tape une touche du clavier
            const input = searchinput.value; // récupère la valeur de la barre de recherche

            if (input.length > 2) { // si on a plus de 2 charactères
                result = recipes.filter((item) =>  // crée et retourne un nouveau tableau à partir de la base de donnée en fonction des paramètres du dessous
                    item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
                    item.description.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
                    item.ingredients.find((ingredientSelect) =>
                        ingredientSelect.ingredient.toLocaleLowerCase().includes(input.toLocaleLowerCase())
                    )
                );

                new results(result);
            }
            else { // sinon revois une variable vide
                result = recipes;
                new results(result);
            }

        })

        // EN COURS DE DEV
        for (let i = 0; i < filter.length; i++) { // tri les tags en fonction de ce qu'on tape dans les filtres

            filter[i].addEventListener("click", function () {
                if (filter[i].querySelector(".tag-list") != null) { // vérifie si on a déjà la liste des tags affiché
                    document.querySelector(".tag-list").remove(); // enlève la liste des tags
                    filter[i].classList.remove("selected"); // spécifie qu'on a désélectionner le filtre afin d'animer avec le css

                    if (filter[i] == filter[0]) {
                        filter[i].querySelector("input").setAttribute("placeholder", "Ingrédients"); // réinitialise le placeholder
                    }
                    if (filter[i] == filter[1]) {
                        filter[i].querySelector("input").setAttribute("placeholder", "Appareils");
                    }
                    if (filter[i] == filter[2]) {
                        filter[i].querySelector("input").setAttribute("placeholder", "Ustensiles");
                    }

                    filter[i].querySelector("input").value = "";
                }

                else {
                    // METTRE A JOUR LES ARRAY EN FONCTION DES TAGS SELECTIONNES
                    new searchTag(ingredientsList, applianceList, ustensilsList, filter, i);
                }
            });


            filter[i].querySelector("input").addEventListener("keyup", function () { //met à jours les tags quand on tape dans les filtres

                if (filter[i] == filter[0]) {
                    filter[0].querySelector(".tag-list").remove();
                    var ingredientsListUpdated = ingredientsList.filter((item) =>
                        item.toLocaleLowerCase().includes(filter[i].querySelector("input").value.toLocaleLowerCase())
                    );
                    new searchTag(ingredientsListUpdated, applianceListUpdated, ustensilsListUpdated, filter, i);
                }

                if (filter[i] == filter[1]) {
                    filter[1].querySelector(".tag-list").remove();
                    var applianceListUpdated = applianceList.filter((item) =>
                        item.toLocaleLowerCase().includes(filter[i].querySelector("input").value.toLocaleLowerCase())
                    );
                    new searchTag(ingredientsListUpdated, applianceListUpdated, ustensilsListUpdated, filter, i);
                }

                if (filter[i] == filter[2]) {
                    filter[2].querySelector(".tag-list").remove();
                    var ustensilsListUpdated = ustensilsList.filter((item) =>
                        item.toLocaleLowerCase().includes(filter[i].querySelector("input").value.toLocaleLowerCase())
                    );
                    new searchTag(ingredientsListUpdated, applianceListUpdated, ustensilsListUpdated, filter, i);
                }

            });
        }
    }
}

export class searchTag {
    constructor(ingredientsList, applianceList, ustensilsList, filter, i) {

        const tagList = document.createElement("div"); // créer une div qui va contenir tous les tag

        filter[i].classList.add("selected"); // spécifie qu'on a sélectionner le filtre afin d'animer avec le css


        if (filter[i] == filter[0]) {
            tagList.setAttribute("class", "tag-list ingredient-list");

            filter[i].querySelector("input").setAttribute("placeholder", "Rechercher un ingrédient"); // remplace le texte du placeholder
            const ingredientsDisplay = ingredientsList.slice(0, 30);  // créer un tableau contenant uniquement les 30 premier résultats

            ingredientsDisplay.forEach((item) => { // créé et insère un élément html pour chaque élément de la liste
                const tagModel = new tagFactory(item);
                const tagDOM = tagModel.tagDOM();
                tagList.appendChild(tagDOM);
            });
        }

        if (filter[i] == filter[1]) {
            tagList.setAttribute("class", "tag-list appliance-list");

            filter[i].querySelector("input").setAttribute("placeholder", "Rechercher un appareil"); // remplace le texte du placeholder
            const applianceDisplay = applianceList.slice(0, 30);  // créer un tableau contenant uniquement les 30 premier résultats

            applianceDisplay.forEach((item) => { // créé et insère un élément html pour chaque élément de la liste
                const tagModel = new tagFactory(item);
                const tagDOM = tagModel.tagDOM();
                tagList.appendChild(tagDOM);
            });
        }

        if (filter[i] == filter[2]) {
            tagList.setAttribute("class", "tag-list ustensils-list");

            filter[i].querySelector("input").setAttribute("placeholder", "Rechercher un ustensile"); // remplace le texte du placeholder
            const ustensilsDisplay = ustensilsList.slice(0, 30);  // créer un tableau contenant uniquement les 30 premier résultats

            ustensilsDisplay.forEach((item) => { // créé et insère un élément html pour chaque élément de la liste
                const tagModel = new tagFactory(item);
                const tagDOM = tagModel.tagDOM();
                tagList.appendChild(tagDOM);
            });
        }

        filter[i].appendChild(tagList);
    }
}
