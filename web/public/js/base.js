$(document).ready(function () {

    $("#form").removeClass("active").hide();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/person/findAll',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            data.forEach(person => {
                $("#people").append("<li id='" +person._id + "'><a>" + person.nombre + "</a></li>");

                $("#" + person._id).click(function () {
                    $('#people').removeClass("active").hide();
                    $("#form").addClass("active").show();
                    $("#personId").attr("value",person._id);
                   
                });
            });  
        },
        error: function (response) {s
            console.log("Request Failed");
        }
    });


})


function processForm() {

        $.ajax({
            url: 'http://localhost:3000/person/update/' +  $("#personId").attr('value') ,
            dataType: 'text',
            type: 'put',
            contentType: 'application/x-www-form-urlencoded',
            data: {"nombre": $("input#nombre").val(), "apellido":$("input#apellido").val(), "telefono": $("input#telefono").val()},
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

}

