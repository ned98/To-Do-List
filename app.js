let btnAdd = document.getElementById("btnAdd");
let btnReset = document.getElementById("btnReset");
let ol = document.getElementById("ol");
//let inputVal = $(".input");
// let btnAdd = $(".btnAdd");
// let btnReset = $(".btnReset");
//let li = $("li");


// Create a new list item when clicking on the "Add" button
btnAdd.addEventListener("click", function () {

    let input = $("input");
    let inputVal = $("#input").val();

    if (inputVal == '') return;

    else {
        let li = document.createElement("li");
        let clearBtn = document.createTextNode("\u00D7");
        let span = document.createElement("span");

        span.classList.add("clear");
        li.classList.add("li");
        span.prepend(clearBtn);
        li.prepend(inputVal);
        li.prepend(span);

        ol.appendChild(li);

        input.val("");
        //$('ol').prepend(`<li>${inputVal.val()}</li>`);
        //inputVal.val("");
    }

});

btnReset.addEventListener("click", function () {

    let list = document.getElementsByClassName("li");

    // Remove the 1st element, until there is no 1st element
    while (list[0]) {
        list[0].parentNode.removeChild(list[0]);
    }

});

ol.addEventListener("click", function (e) {

    // Adds strike text if you click the 'li'
    if (e.target.tagName == 'LI') {
        e.target.classList.toggle("strike-text");
    }

    // Removes the 'li' if you click the "x" button
    if (e.target.classList.contains('clear')) {
        e.target.parentElement.remove();
    }

});




// li.addEventListener("click", function () {

//     if ($(this).hasClass('has')) {
//         $(this).removeClass("strike-text");
//         $(this).removeClass("has");
//     }

//     else if (!$(this).hasClass("has")) {
//         $(this).addClass("strike-text");
//         $(this).addClass("has");
//     }
// });




// btnAdd.click(function () {

//     if (inputVal.val() == '') return;

//     else {
//         let li = document.createElement("li");
//         li.prepend(inputVal.val);
//         ol.appendChild(li);

//         //$('ol').prepend(`<li>${inputVal.val()}</li>`);
//         inputVal.val("");
//     }
// });