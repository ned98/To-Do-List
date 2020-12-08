let btnAdd = $("#btnAdd");
let toggleCompleted = $("#div-h1-completed");
let input = $("#input");

toggleCompleted.hide();

$(document).ready(function () {
    showTodos();
});

function addTodo() {
    if (input.val() === '') {   // Check if input is empty
        input.addClass('shake');

        setTimeout(function () {
            input.removeClass('shake');
        }, 950);

        return;
    }

    let element =
        `<li class="li">
            <i class="fa fa-circle-thin icon toggle-icon" aria-hidden="true"></i>
            <i class="fas fa-edit edit icon" aria-hidden="true"></i>
            <i class="fas fa-trash-alt clear icon" aria-hidden="true"></i>
            <p class="li-text" contenteditable="false">${input.val()}</p>
        </li>`;

    $("#ul-todo").append(element);

    // Add to localStorage
    saveToLocalStorage(input.val());

    input.val(''); // Clear the input on pressing "Add" or Enter key
}

// Create a new list item when clicking "Add" button
btnAdd.click(function () {
    addTodo();
});

// Adding list item with Enter key
input.keypress(function (e) {
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

    localStorage.removeItem('todos');
});

$("#ul-completed").click(function (e) {
    let closestInput = $(e.target).closest('li').find('.li-text');

    $(".li-text").keypress(function (e) {
        if (e.which === 13) {
            e.preventDefault();
            closestInput.addClass("strike-text font-italic");
            closestInput.attr('contenteditable', 'false');
            return false;
        }
    });

    $(".li-text").focusout(function () {
        closestInput.addClass("strike-text font-italic");
        closestInput.attr('contenteditable', 'false');
    });
});

$("ul").click(function (e) {
    let closestLi = $(e.target).closest('li');
    let closestInput = $(e.target).closest('li').find('.li-text');

    // Removes the 'li' if you click the "trash icon" button
    if ($(e.target).hasClass('clear')) {
        e.target.parentElement.remove();
        deleteTodo(closestInput.text());
    }

    if (e.target.classList.contains('edit')) {

        if (closestInput.attr('contenteditable', false)) {
            closestInput.attr('contenteditable', true);
        }

        else {
            closestInput.attr('contenteditable', false);
        }

        if (closestInput.hasClass("strike-text") && closestLi.parent("#ul-completed")) {
            closestInput.removeClass("strike-text font-italic");
        }
        else if (closestLi.parent("#ul-todo")) {
            closestInput.removeClass("strike-text font-italic");
        }
        else if (closestLi.parent("#ul-completed")) {
            closestInput.addClass("strike-text font-italic");
        }

        $(".li-text").keypress(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                closestInput.attr('contenteditable', false);
                return false;
            }
        });

        $(".li-text").focusout(function () {
            closestInput.attr('contenteditable', false);
        });
    }

    if ($(e.target).is("i") && $(e.target).hasClass('toggle-icon')) {
        let closestIcon = $(e.target).closest('i');
        let unchecked = 'fa fa-circle-thin icon';
        let checked = 'fas fa-check-circle icon';

        if (closestIcon.hasClass("fa-circle-thin")) {
            closestInput.addClass("strike-text font-italic").attr('contenteditable', false);
            closestIcon.removeClass(unchecked).addClass(checked);
        }
        else {
            closestIcon.removeClass(checked).addClass(unchecked);
            closestInput.removeClass("strike-text font-italic");  /* .attr('contenteditable', true); */ // Add this if you remove Edit btn
        }

        if (closestIcon.hasClass("fa-check-circle")) {
            toggleCompleted.show();
            $("#ul-completed").append(closestLi);
        }
        else {
            $("#ul-todo").append(closestLi);
        }

        if ($('#ul-completed').is(':empty')) {
            $("#h1-completed").hide();
        }
        else {
            $("#h1-completed").show();
        }
    };
});


function saveToLocalStorage(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function showTodos() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(element => {
        element =
            `<li class="li">
                <i class="fa fa-circle-thin icon toggle-icon" aria-hidden="true"></i>
                <i class="fas fa-edit edit icon" aria-hidden="true"></i>
                <i class="fas fa-trash-alt clear icon" aria-hidden="true"></i>
                <p class="li-text" contenteditable="false">${element}</p>
            </li>`;

        $("#ul-todo").append(element);
    });
}

function deleteTodo(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.splice(todos.indexOf(todo), 1);                // Removes the todo from todos list
    localStorage.setItem('todos', JSON.stringify(todos)); // Updated the localStorage
}