import { results } from './result.js';
import recipes from './recipes.js';


export function search() {
    const searchinput = document.getElementById("searchinput")

    searchinput.addEventListener("keyup", function () { // quand on tape une touche du clavier
        const input = searchinput.value; // récupère la valeur de la barre de recherche

        if (input.length > 2) { // si on a plus de 2 charactères
            var result = recipes.filter(function (item) { // crée et retourne un nouveau tableau à partir de la base de donnée
                const name = item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()); // récupère les recettes dont le nom correspond à la recherche
                const description = item.description.toLocaleLowerCase().includes(input.toLocaleLowerCase()); // description

                for (let i = 0; i < item.ingredients.length; i++) { // ingrédients
                    var ingredientList = item.ingredients[i].ingredient.toLocaleLowerCase().includes(input.toLocaleLowerCase());
                }

                return (name || description || ingredientList) // retourne les éléments correspondants aux 3 critères
            })
        }
        else { // sinon revois une variable vide
            result = "";
        }

        results(result);

    })
}