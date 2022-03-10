import { results } from './result.js';
import recipes from './recipes.js';

export class search {
    constructor() {
        const searchinput = document.getElementById("searchinput")
        var result = recipes;
        new results(result);

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
    }
}