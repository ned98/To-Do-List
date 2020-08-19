//$(document).ready(function () {
let btnAdd = $("#btnAdd");
let ulTodo = $("#ul-todo");
let input = $("input");
let btnReset = $("#btnReset");
let toggleCompleted = $("#h1-completed");

toggleCompleted.hide();

// let LIST = [];
// let id;

// let data = localStorage.getItem("todo");

// if (data) {
//     LIST = JSON.parse(data);
//     id = LIST.length; // set the id to the last one in the list
//     loadList(LIST);
// }
// else {
//     // if data isn't empty
//     LIST = [];
//     id = 0;
// }

// function loadList(arr) {
//     arr.forEach(element => {

//     });
// }


function add() {
    let inputVal = $("#input").val();

    if (inputVal == '') return;

    else {
        let li = document.createElement("li");
        let listInput = document.createElement("input");
        listInput.classList.add("li-input");
        listInput.value = inputVal;
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

        ulTodo.append(li);

        input.val("");

        // LIST.push({
        //     name: inputVal,
        //     id: id
        // });

        // localStorage.setItem("todo", JSON.stringify(LIST));
        // id++;
    }
}

// Create a new list item when clicking the "Add" button
btnAdd.click(function () {
    add();
});

// Adding list with Enter key
input.keypress(function (e) {
    if (e.which === 13) {
        e.preventDefault();
        btnAdd.click();
        return false;
    }
});

//  On Reset Button Click
btnReset.click(function () {
    let list = document.getElementsByClassName("li");

    // Remove the 1st element, until there is no 1st element
    while (list[0]) {
        list[0].parentNode.removeChild(list[0]);
    }
});

$("#ul-completed").click(function (e) {
    let closestLi = $(e.target.closest('li'));
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
    // Removes the 'li' if you click the "x" button
    if (e.target.classList.contains('clear')) {
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains('edit')) {
        let closestLi = $(e.target.closest('li'));
        let closestInput = $(e.target).closest('li').find('.li-input');

        if (closestInput.attr("readonly"), true) {
            closestInput.removeAttr("readonly");
        }
        else {
            closestInput.attr("readonly", true);
        }

        //If its in ul-completed
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

        $(".li-input").focusout(function (e) {
            closestInput.attr("readonly", true);
        });
    }


    if ($(e.target).is("i") && $(e.target).hasClass('toggle-icon')) {
        let closestLi = $(e.target.closest('li'));
        let closestInput = $(e.target).closest('li').find('.li-input');
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

$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
}

// jQuery.fn.toggleAttr = function (attr) {
//     return this.each(function () {
//         var $this = $(this);
//         $this.attr(attr) ? $this.removeAttr(attr) : $this.attr(attr, attr);
//     });
// };