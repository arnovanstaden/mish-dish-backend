// Animations
$(".sidebar-item").click(function () {
    $(".sidebar-item").removeClass("active");
    $(this).addClass("active");
    filterRecipeType("all");
    $(".sidebar-sub-item").removeClass("active");
})

const mainShow = (main) => {
    $(".main-container").removeClass("active");
    $(`#main-${main}-container`).addClass("active");
}

// --------------------------------------

// Events

// Filter Recipe Type
$(".sidebar-sub-item").click(function () {
    $(".sidebar-sub-item").removeClass("active");
    $(this).addClass("active");
    filterRecipeType($(this).children("p").html().toLowerCase());
});

const filterRecipeType = (type) => {
    let recipesLength = $(".recipes-grid").children().length;
    if (type == "all") {
        $(".home-grid-item").removeClass("hide-filter-recipe-type");
    } else {
        for (i = 1; i <= recipesLength; i++) {
            if ($(`.recipes-grid .home-grid-item:nth-child(${i})`).find(".recipe-type").html() != type) {
                $(`.recipes-grid .home-grid-item:nth-child(${i})`).addClass("hide-filter-recipe-type");
            } else {
                $(`.recipes-grid .home-grid-item:nth-child(${i})`).removeClass("hide-filter-recipe-type");
            }
        }
    }
}

// --------------------------------------

// Utils

// Notify
$(".notify-bar").hide()
const notify = (text) => {
    $(".notify-bar p").html(text);
    $(".notify-bar").fadeIn(500, () => {
        setTimeout(() => {
            $(".notify-bar").fadeOut(500)
        }, 2000);
    })
}

// Reset Add Boxes



// Loader
const showLoader = (text) => {
    $(".loader").fadeIn(500);
    $(".loader p").html(text);
    $("html").css("overflow-y", "hidden");
}

const hideLoader = () => {
    $("html").css("overflow-y", "scroll")
    $(".loader").fadeOut(500);
}