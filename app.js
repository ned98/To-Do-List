let inputVal = $(".input");
let btnAdd = $(".btnAdd");
let btnReset = $(".btnReset");
let li = $("li");


btnAdd.click(function () {

    if (inputVal.val() == '') return;

    else {
        $('ol').prepend(`<li class="">${inputVal.val()}</li>`);
        inputVal.val("");
    }
});

li.click(function () {

    if ($(this).hasClass('has')) {
        $(this).removeClass("strike-text");
        $(this).removeClass("has");
    }

    else if (!$(this).hasClass("has")) {
        $(this).addClass("strike-text");
        $(this).addClass("has");
    }
});
