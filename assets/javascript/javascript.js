

var animals = ["Cat", "Dog", "mouse", "giraffe"];
var stillarray = [];
var animatedarray = [];
var statusarray = [];



 $(document).ready(function(){

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      
      function displayGif() {


        $("#animals-view").empty();

        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0&rating=pg";
        

        // Creating an AJAX call for the specific movie button being clicked
       
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {


          // // Creating a div to hold the movie

          stillarray.length = 0
          animatedarray.length = 0


          for (i=0; i<response.data.length; i++) {

          var animaldiv = $("<div class='animalgif'>");
          animaldiv.append("<img src="+response.data[i].images.fixed_height_still.url+">");
          animaldiv.attr("identifier", i);
          animaldiv.attr("status", "still")
          $("#animals-view").prepend(animaldiv);
          stillarray.push(response.data[i].images.fixed_height_still.url);
          animatedarray.push(response.data[i].images.fixed_height.url);
          statusarray.push("still");



        }


        });

      }


      


      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-animal").on("click", function(event) {
       
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding movie from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".animal", displayGif);



      $(document).on('click', '.animalgif', function() {

        console.log("clicked");
        console.log(this);
        console.log(this.attributes.identifier.value);
        console.log(this.attributes.status.value)



        if (this.attributes.status.value === "still") {


        $(this).html("<img src="+animatedarray[$(this).attr("identifier")]+">");
        
        this.attributes.status.value = "animated";


        return;


      }
       

        if (this.attributes.status.value === "animated") {
        //a function to switch gif from still image to animated

        $(this).html("<img src="+stillarray[$(this).attr("identifier")]+">");
     
        
        this.attributes.status.value = "still";

       

        
      }




      

      });
     



      // Calling the renderButtons function to display the intial buttons
      renderButtons();

});

