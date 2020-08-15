let btnAdd = $("#btnAdd");
let ol = $("ol");
let input = $("input");
let btnReset = $(".btnReset");
//let inputVal = $(".input");
//let li = $("li");


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

        let editIcon = document.createElement("i");
        editIcon.classList.add("fas");
        editIcon.classList.add("fa-edit");
        editIcon.classList.add("edit");

        let clearIcon = document.createElement("i");
        clearIcon.classList.add("fas");
        clearIcon.classList.add("fa-trash-alt");
        clearIcon.classList.add("clear");

        li.classList.add("li");
        li.append(editIcon);
        li.append(clearIcon);
        li.append(listInput);

        ol.append(li);

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

ol.click(function (e) {

    let listInput = $(".listInput");

    // Adds strike-text if you click the 'li'
    if (e.target.tagName == 'INPUT') {
        e.target.classList.toggle("strike-text");
    }

    // Removes the 'li' if you click the "x" button
    if (e.target.classList.contains('clear')) {
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains('edit')) {
        let closestInput = $(e.target).closest('li').find('.li-input');

        if (closestInput.attr("readonly")) {
            closestInput.removeAttr("readonly");
        }

        else {
            closestInput.attr("readonly", true);
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
});


//localStorage.clear();
//console.log(localStorage)

// let elements = [];
// window.onload = function () {
//     if (localStorage.getItem("todo-elements") != null) {
//         elements = JSON.parse(localStorage.setItem("todo-elements"));
//     }
// }
// if (localStorage.getItem("todo-elements") == null) {
//     localStorage.setItem("todo-elements", JSON.stringify(elements))
// }
// else {
//     localStorage.setItem("todo-elements", JSON.stringify(elements))
// }