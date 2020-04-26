const api_url = "https://the-mish-dish-backend.herokuapp.com/recipes";
//https://the-mish-dish-backend.herokuapp.com/recipes

// Get all Recipes
function getRecipes(yes) {
    $(".recipes-grid").empty();
    axios.get(`${api_url}/recipes`)
        .then((response) => {
            const recipes = response.data;
            if (recipes.length < 1) {
                $(".recipes-grid").append("<p> You have no recipes. Add a recipe! </p>")
            }
            recipes.forEach(recipe => {
                $(".recipes-grid").append(
                    ` <div class="col-sm-6 col-md-4 col-lg-3 home-grid-item" data-recipe-id="${recipe._id}">
                        <div class="recipe-img" style="background-image:url('${recipe.recipeThumbnailUrl}')">
                        <p class="recipe-type">${recipe.recipeType}</p>
                            <div class="recipe-options">
                                <a id="edit-recipe-button"><i class="far fa-edit"></i></a>
                                <a href="https://update.themishdish.co.za/recipe.html#${recipe.recipeCode}" target="blank">
                                    <i class="far fa-eye"></i>
                                </a>
                            </div>
                        </div>
                        <h4>${recipe.name}</h4>
                    </div>`
                )
            });

            if (yes === true) {
                hideLoader()
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const showRecipes = (yes) => {
    if (yes === true) {
        showLoader("Fetching Your Recipes. This will just take a second...")
        getRecipes(yes)
    } else {
        getRecipes()
    }
    $(".main-container").removeClass("active");
    $(`#main-recipes-container`).addClass("active");
}




// Add Recipes

// Add Recipe Button
$("#add-recipe-button").click(() => {
    $(".main-container").removeClass("active");
    $(`#main-recipes-add-container`).addClass("active");
    $("#add-recipe-form").removeClass("was-validated")
    // $("#add-recipe-form [type='file']").val("");
});

// Validate Form
const validateForm = (formToVal, callback) => {
    let form = document.getElementById(formToVal);

    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    } else if (formToVal == "add-recipe-form" && validateUploadSize() !== true) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        showLoader("Your recipe is being added. Depending on the size of your images, this might take a while.");
        callback();
    }
    form.classList.add('was-validated');
};

const validateUploadSize = () => {
    if ((document.getElementById('thumbnail').files[0].size / 1024 / 1024) > 10) {
        alert("The Thumbnail image you are trying upload is larger than the allowed upload size of 10 MB");
        return false
    }
    let recipeImages = document.getElementById('recipeImages').files;
    for (i = 0; i < recipeImages.length; i++) {
        if ((recipeImages[i].size / 1024 / 1024) > 10) {
            alert("One of the Recipe Images you are trying upload is larger than the allowed upload size of 10 MB");
            return false
        }
    }
    return true
}


function addRecipe() {

    event.preventDefault()
    // Add Recipe Details
    const recipe = {
        name: $("#add-recipe-form [name='name']").val(),
        description: $("#add-recipe-form [name='description']").val(),
        recipeType: $("#add-recipe-form [name='recipe-type']").val(),
        servings: $("#add-recipe-form [name='servings']").val(),
        prepTime: $("#add-recipe-form [name='prepTime']").val(),
        cookTime: $("#add-recipe-form [name='cookTime']").val(),
        servingSuggestion: $("#add-recipe-form [name='servingSuggestion']").val(),
        ingredients: $("#add-recipe-form [name='ingredients']").val(),
        method: $("#add-recipe-form [name='method']").val()
    }

    let formData = new FormData();
    let thumbnailImage = document.getElementById('thumbnail').files[0];
    let recipeImages = document.getElementById('recipeImages');
    for (let i = 0; i < recipeImages.files.length; i++) {
        formData.append("recipeImages", recipeImages.files[i])
    }
    formData.append("thumbnail", thumbnailImage);
    formData.append("recipe", JSON.stringify(recipe));

    // Post Recipe
    axios({
            method: 'post',
            url: `${api_url}/recipes`,
            data: formData,
        })
        .then((response) => {
            hideLoader();
            showRecipes();
            notify("Recipe Added");
        })
        .catch(err => {
            console.log(err);
        });

}



// Edit Recipe

// Edit Recipe Button
$(document).on("click", "#edit-recipe-button", function () {
    $(".main-container").removeClass("active");
    $(`#main-recipes-edit-container`).addClass("active");
    const recipeID = ($(this).closest(".home-grid-item").attr("data-recipe-id"));
    showLoader("Fetching Recipe Details")
    getEditRecipes(recipeID);
});

const getEditRecipes = (recipeID) => {
    axios.get(`${api_url}/recipes/${recipeID}`)
        .then((response) => {
            loadEditRecipe(response.data);
            hideLoader();
        })
        .catch(err => {
            console.log(err);
        });
}

const loadEditRecipe = (recipe) => {
    $("#main-recipes-edit-container .main-heading span").html(`${recipe.recipeCode} | ${recipe.name}`)
    $("#main-recipes-edit-container").attr("data-recipe-id", recipe._id)
    $("#edit-recipe-form [name='name']").val(recipe.name);
    $("#edit-recipe-form [name='description']").val(recipe.description);
    $("#edit-recipe-form [name='recipe-type']").val(recipe.recipeType);
    $("#edit-recipe-form [name='servings']").val(recipe.servings);
    $("#edit-recipe-form [name='prepTime']").val(recipe.prepTime);
    $("#edit-recipe-form [name='cookTime']").val(recipe.cookTime);
    $("#edit-recipe-form [name='servingSuggestion']").val(recipe.servingSuggestion);
    let ingredients = recipe.ingredients.join("\n")
    $("#edit-recipe-form [name='ingredients']").val(ingredients);
    let method = recipe.method.join("\n")
    $("#edit-recipe-form [name='method']").val(method);
    $("#edit-thumbnail-image-container img").attr("src", recipe.recipeThumbnailUrl);
    recipe.recipeImageUrls.forEach(image => {
        $("#edit-recipe-images-container").append(
            `<img src="${image}">                `
        )
    })
}



const saveEditRecipe = () => {
    event.preventDefault()
    // Get RecipeID
    recipeID = $("#main-recipes-edit-container").attr("data-recipe-id");

    const recipe = {
        name: $("#edit-recipe-form [name='name']").val(),
        description: $("#edit-recipe-form [name='description']").val(),
        recipeType: $("#edit-recipe-form [name='recipe-type']").val(),
        servings: $("#edit-recipe-form [name='servings']").val(),
        prepTime: $("#edit-recipe-form [name='prepTime']").val(),
        cookTime: $("#edit-recipe-form [name='cookTime']").val(),
        servingSuggestion: $("#edit-recipe-form [name='servingSuggestion']").val(),
        ingredients: $("#edit-recipe-form [name='ingredients']").val(),
        method: $("#edit-recipe-form [name='method']").val()
    }

    // Patch Recipe
    axios({
            method: 'patch',
            url: `${api_url}/recipes/${recipeID}`,
            data: recipe,
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTWlzaERlVm9zIiwiZW1haWwiOiJkZXZvc21hcmlzaGFAZ21haWwuY29tIiwiaWF0IjoxNTg3MzgxODg5LCJleHAiOjE1ODczODU0ODl9.UjO-40rO6nBCwKY_5doypPHqLlb9wc1Ivkp-UjfH1d4"
            }
        })
        .then((response) => {
            console.log(response.data);
            showRecipes(true);
            notify("Recipe Edited");
        })
        .catch(err => {
            console.log(err);
        });
}


// Delete Recipe

const deleteRecipe = () => {
    // Get RecipeID
    recipeID = $("#main-recipes-edit-container").attr("data-recipe-id");

    axios({
            method: 'delete',
            url: `${api_url}/recipes/${recipeID}`,
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiTWlzaERlVm9zIiwiZW1haWwiOiJkZXZvc21hcmlzaGFAZ21haWwuY29tIiwiaWF0IjoxNTg3MzgxODg5LCJleHAiOjE1ODczODU0ODl9.UjO-40rO6nBCwKY_5doypPHqLlb9wc1Ivkp-UjfH1d4"
            }
        })
        .then((response) => {
            console.log(response.data);
            showRecipes(true);
            $('#deleteModal').modal('toggle');
            notify("Recipe Deleted");
        })
        .catch(err => {
            console.log(err);
        })
}


$(document).ready(() => {
    showRecipes(true);
});

// Back to Recipes Button
$(".back-recipe-button").click(() => {
    showRecipes(true)
});