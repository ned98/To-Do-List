let btnAdd = $("#btnAdd");
let input = $("#input");

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


$("ul").click(function (e) {
    let closestLi = $(e.target).closest('li');
    let closestInput = closestLi.find('.li-text');

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

        $(".li-text").keypress(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                closestInput.attr('contenteditable', false);
                return false;
            }
        });

        let oldTodo = closestInput.text();
        $(".li-text").focusout(function () {
            closestInput.attr('contenteditable', false);
            updateItem(oldTodo, closestInput.text());
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
            removeElement(closestLi);
            deleteTodo(closestInput.text());
        }
        else {
            $("#ul-todo").append(closestLi);
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

    todos.splice(todos.indexOf(todo), 1);                 // Removes the todo from todos list
    localStorage.setItem('todos', JSON.stringify(todos)); // Update the localStorage
}

function updateItem(oldTodo, newTodo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.splice(todos.indexOf(oldTodo), 1, newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeElement(target) {
    target.animate({
        opacity: "-=1"
    }, 1000, function () {
        target.remove();
    });
}
