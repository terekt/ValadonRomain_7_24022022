import { results } from './result.js';
import recipes from './recipes.js';

export function search() {
    const searchinput = document.getElementById("searchinput");
    var result = recipes;
    results(result);

    searchinput.addEventListener("keyup", function () { // quand on tape une touche du clavier
        const input = searchinput.value; // récupère la valeur de la barre de recherche

        if (input.length > 2) { // si on a plus de 2 charactères

            result = [];

            for (let i = 0; i < recipes.length; i++) { // récupère les recettes dont le nom correspond à la recherche
                if (recipes[i].name.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
                    result.push(recipes[i]);
                }
            }

            for (let i = 0; i < recipes.length; i++) { // description
                if (recipes[i].description.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
                    result.push(recipes[i]);
                }
            }

            for (let i = 0; i < recipes.length; i++) { // ingrédients
                for (let e = 0; e < recipes[i].ingredients.length; e++) { // vient chercher pour chaque élément de la liste de recette, la liste des ingrédients
                    if (recipes[i].ingredients[e].ingredient.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
                        result.push(recipes[i]);
                    }
                }
            }
            results(result);
        }
        else { //sinon revois une variable vide
            result = recipes;
            results(result);
        }

        
    })
}