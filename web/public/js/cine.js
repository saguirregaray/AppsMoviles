$(document).ready(function() {

    $(".imageContainer").hide();

    $("#videoContainer").removeClass("active").hide();

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
        $.each(data.contentCinemaShows, function(i, movie ) {
            var stringMovie = "<div><div class= " + "'image'" + "style= " + "'background-image: url(" + movie.posterURL + "');'" + "></div></div>";
            
            //creo pelis
            $(stringMovie).addClass('movieContainer').attr("id", i).appendTo('#mainContainer');        

            //creo lista vacia
            $('<div></div>').addClass('time').attr("id", "time" + i).appendTo('#mainContainer');
            $('<ul></ul>').addClass('list').attr("id", "list" + i).appendTo("#time" + i);

            $(".time").removeClass("active").hide();

            //muestro pelis
            $(".movieContainer").addClass("active").fadeIn();

            $.each(this.cinemaShows, function(j, cinemaShows ) {
                //a la lista de la peli i le agrego que cine es
                $('<li>Cine: ' + cinemaShows.cinema + "\nFechas:" + '</li>').appendTo("#list" + i);

                $.each(this.shows, function(k, show ) {
                    //a la lista de la peli i le agrego las fechas
                    $('<li>' + show.timeToDisplay + '</li>').appendTo("#list" + i);
                    
                    //si hago click en una peli muestro los datos de esa
                    $('#' + i).click(function() {
                        // $('#' + i).removeClass("active").fadeOut('fast').promise().done(function() {
                        $(".movieContainer").removeClass("active").hide()

                        //reproduce trailer
                        getTrailer(movie.movie);
                        $("#videoContainer").addClass("active").show();
                        $('#time' + i).addClass("active").fadeIn();
                        

                            $('#time' + i).click(function() {
                                $('#videoContainer').removeClass("active").fadeOut('fast')
                                $('.time').removeClass("active").fadeOut('fast').promise().done(function() {
                                $('.movieContainer').addClass("active").fadeIn();
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

  $(document).ready(function() {
    $('#play-video').on('click', function(ev) {
   
      $("#video")[0].src += "&autoplay=1";
      ev.preventDefault();
   
    });
  });


function getTrailer(name) {
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyC6uX7fBQiR1omE5XrgakrL2DdlVxDTmBA',
            q: "'" + name + " trailer'",
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(data){
            embedVideo(data)
        },
        error: function(response){
            console.log("Request Failed");
        }
      });

}

function embedVideo(data) {
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
    // $('h3').text(data.items[0].snippet.title)
    // $('.description').text(data.items[0].snippet.description)
}
