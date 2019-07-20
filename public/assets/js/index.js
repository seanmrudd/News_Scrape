$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'><h3>" + data[i].title + "</h3>" + "<a href='https://news.google.com" + data[i].link + "'>" + "View</a></p></br>");
        // $("#articles").append(`

        // <p data-id=${data[i]._id}>
        //     <h3>${data[i].title}</h3>
        //     <a href="https://news.google.com${data[i].link}">View</a>
        // </p>
        // </br>`

        // );
        // // $("p").append("data-id=" + data[i]._id)
        // $("#artcles").append(`<p data-id=${data[i]._id}`)
        // $("#articles").append(`<h3> ${data[i].title}</h3>`)
        // $("#articles").append(`</p`)
        // $("<p>")
    }
});

$(document).click("click", "p", function () {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .then(function (data) {
            console.log(data);
            $("#notes").append("<h2>" + data.title + "</h2>");
            $("#notes").append("<input id='titleinput' name='title' >");
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            if (data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
});

$(document).on("click", "#savenote", function () {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function (data) {
            console.log(data);
            $("#notes").empty();
        });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});
