//$(document).ready(function () {
let btnAdd = $("#btnAdd");
let toggleCompleted = $("#div-h1-completed");

toggleCompleted.hide();

function add() {

    if ($("#input").val() == '') return; // No empty inputs on main input

    let li = document.createElement("li");
    let listInput = document.createElement("input");
    listInput.classList.add("li-input");
    listInput.value = $("#input").val();
    listInput.readOnly = true;

    let circleIcon = document.createElement("i");
    circleIcon.classList.add("fa", "fa-circle-thin", "icon", "toggle-icon");

    let checkedIcon = document.createElement("i");
    checkedIcon.classList.add("fas", "fa-check-circle", "icon");

    let editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit", "edit", "icon");

    let clearIcon = document.createElement("i");
    clearIcon.classList.add("fas", "fa-trash-alt", "clear", "icon");

    li.classList.add("li");
    li.append(circleIcon);
    li.append(editIcon);
    li.append(clearIcon);
    li.append(listInput);

    $("#ul-todo").append(li);
    $("#input").val(""); // Clear the input on pressing "Add" or Enter key
}

// Create a new list item when clicking "Add" button
btnAdd.click(function () {
    add();
});

// Adding list item with Enter key
$("#input").keypress(function (e) {
    if (e.which === 13) {
        e.preventDefault();
        btnAdd.click();
        return false;
    }
});
//  On Reset Button Click
$("#btnReset").click(function () {
    let list = document.getElementsByClassName("li");

    if (confirm("Are you sure?") == false) return;

    // Remove the 1st element, until there is no 1st element
    while (list[0]) {
        list[0].parentNode.removeChild(list[0]);
    }
});

$("#ul-completed").click(function (e) {
    let closestInput = $(e.target).closest('li').find('.li-input');

    $(".li-input").keypress(function (e) {
        if (e.which === 13) {
            e.preventDefault();
            closestInput.addClass("strike-text font-italic");
            closestInput.attr("readonly", true);
            return false;
        }
    });

    $(".li-input").focusout(function (e) {
        closestInput.addClass("strike-text font-italic");
        closestInput.attr("readonly", true);
    });
});

$("ul").click(function (e) {
    let closestLi = $(e.target.closest('li'));
    let closestInput = $(e.target).closest('li').find('.li-input');

    // Removes the 'li' if you click the "trash icon" button
    if (e.target.classList.contains('clear')) {
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains('edit')) {

        if (closestInput.attr("readonly"), true) {
            closestInput.removeAttr("readonly");
        }
        else {
            closestInput.attr("readonly", true);
        }

        //If its in '#ul-completed'
        if (closestInput.hasClass("strike-text") && closestLi.parent("#ul-completed")) {
            closestInput.removeClass("strike-text font-italic");
        }
        else if (closestLi.parent("#ul-todo")) {
            closestInput.removeClass("strike-text font-italic");
        }
        else if (closestLi.parent("#ul-completed")) {
            closestInput.addClass("strike-text font-italic");
        }


        $(".li-input").keypress(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                closestInput.attr("readonly", true);
                return false;
            }
        });

        $(".li-input").focusout(function () {
            closestInput.attr("readonly", true);
        });
    }


    if ($(e.target).is("i") && $(e.target).hasClass('toggle-icon')) {
        let closestIcon = $(e.target).closest('i');
        let unchecked = 'fa fa-circle-thin icon';
        let checked = 'fas fa-check-circle icon';

        if (closestIcon.hasClass("fa-circle-thin")) {
            closestInput.addClass("strike-text font-italic").attr("readonly", true)
            closestIcon.removeClass(unchecked).addClass(checked);
        }
        else {
            closestIcon.removeClass(checked).addClass(unchecked);
            closestInput.removeClass("strike-text font-italic");   /*.attr("readonly", false);*/ // Add this if you remove Edit btn
        }

        if (closestIcon.hasClass("fa-check-circle")) {
            toggleCompleted.show();
            $("#ul-completed").append(closestLi);
        }
        else {
            $("#ul-todo").append(closestLi);
        }

        // Checks if ul-completed is Empty and shows/hides it
        if ($('#ul-completed').is(':empty')) {
            $("#h1-completed").hide();
        }
        else {
            $("#h1-completed").show();
        }
    };
});