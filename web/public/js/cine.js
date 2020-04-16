$(document).ready(function() {

    $(".imageContainer").hide();

    $(".imageContainer ").addClass("active").show()

	$(".imageContainer").click(function() {
        
        $(".imageContainer").removeClass("active");
        
        $(".imageContainer").fadeOut('fast').promise().done(function() {

            consultarPeliculas();
         
        });
    });

});



function consultarPeliculas() {
    $.ajax({
      method: 'GET',
      url: 'https://api.movie.com.uy/api/shows/rss/data',
      crossDomain: false,
      dataType: 'json'
    })
    .done(function(data) {
        $.each(data.contentCinemaShows, function(i, entry ) {
            var stringMovie = "<div><div class= " + "'image'" + "style= " + "'background-image: url(" + entry.posterURL + "');'" + "></div></div>";
            
            //creo pelis
            $(stringMovie).addClass('movieContainer').attr("id", i).appendTo('#mainContainer');        

            //creo lista vacia
            $('<div></div>').addClass('time').attr("id", "time" + i).appendTo('#mainContainer');
            $('<ul></ul>').addClass('list').attr("id", "list" + i).appendTo("#time" + i);

            $(".time").removeClass("active").hide();

            //muestro pelis
            $(".movieContainer").addClass("active").fadeIn();

            $.each(this.cinemaShows, function(j, entry ) {
                //a la lista de la peli i le agrego que cine es
                $('<li>Cine: ' + entry.cinema + '</li>').appendTo("#list" + i);

                $.each(this.shows, function(k, entry ) {
                    //a la lista de la peli i le agrego las fechas
                    $('<li>Fecha: ' + entry.timeToDisplay + '</li>').appendTo("#list" + i);
                    
                    //si hago click en una peli muestro los datos de esa
                    $('#' + i).click(function() {

                        $('#' + i).removeClass("active").fadeOut('fast').promise().done(function() {
                        $('#time' + i).addClass("active").fadeIn();
                        });

                            $('#time' + i).click(function() {

                                $('#time' + i).removeClass("active").fadeOut('fast').promise().done(function() {
                                $('#' + i).addClass("active").fadeIn();
                            });
                        
                            });

                    });
        
                });

            });
        });


    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert(textStatus);
    });
  }

