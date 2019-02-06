var favorites = JSON.parse(localStorage.getItem("favorites"));

//Check if variables are empty, initialize them
if(favorites === null){
  var favorites ={
  album:[],
  artist:[],
  title:[],
  additional:[],
  image:[],
  video:[],
  lyrics:[]
  }
} 
   
// Open Modal
$(".container-fluid").on("click",".modalBtn", function() {
  var data = $(this).attr("data-btn");
  $("#myModal" + data).css("display", "block");
});

//Close Modal and stop video
$(".container-fluid").on("click",".close", function() {
  var data = $(this).attr("data-btn");
  // var video = $(this).attr("data-video");
  $("#myModal"+data+" iframe").attr("src", "empty");
  // var promise1=new Promise(function(){
  //  $("#myModal"+data+" iframe").attr("src", video)  ;
  // });
  // promise1.then($("#myModal" + data).css("display", "none"));


  $("#myModal" + data).css("display", "none");
});

// Reload Video
$(".container-fluid").on("click",".videoBtn", function() {
  var data = $(this).attr("data-btn");
  var video = $(this).attr("data-video");
  $("#myModal"+data+" iframe").attr("src", video);
});

//Add MusicDisplay
function renderMusic(event) {
  event.preventDefault();
  $(".infoContent").empty();
  var musicDisplay = $("<div>");
  var imageDisplay = $("<div>");
  var infoDisplay = $("<div>");
  var btnDisplay = $("<div>");
  var image = $("<img>");
  var album = $("<p>");
  var title = $("<p>");
  var artist = $("<p>");
  var additional = $("<p>");
  var favBtn = $("<button>");
  var delBtn = $("<button>");
  var lyricsBtn = $("<button>");
  var modalLyrics = $("<div>");
  var contentLyrics = $("<div>");
  var videoBtn = $("<button>");
  var modalVideo = $("<div>");
  var contentVideo = $("<div>");
  var videoLink = "https://www.youtube.com/embed/gqOEoUR5RHg";

  $(musicDisplay).addClass("row contentMusic justify-content-around align-items-center");
  
  $(image).attr('src',"https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Public_image_ltd_album_cover.jpg/220px-Public_image_ltd_album_cover.jpg").attr("width","120px");
  $(imageDisplay).addClass("col-3 imageDisplay col align-self-center").append(image);

  $(infoDisplay).addClass("col-7 infoDisplay");
  $(album).text("Album").addClass("row");
  $(title).text("Title").addClass("row");
  $(artist).text("Artist").addClass("row");
  $(additional).text("Additional Info").addClass("row");
  $(infoDisplay).append(album).append(artist).append(title).append(additional);

  $(btnDisplay).addClass("col-2 btnDisplay");
  $(favBtn).html('<i class="fa-hover-hidden fa fa-star-o" aria-hidden="true"></i><i class="fa-hover-show fa fa-star" aria-hidden="true"></i>').addClass("row favBtn text-center");
  $(favBtn).attr("data-album","Album").attr("data-artist","Artist").attr("data-title","Title").attr("data-add","Additional").attr("data-img","Image").attr("data-video",videoLink).attr("data-lyrics","Lyrics");
  $(lyricsBtn).html('<i class="fa fa-music" aria-hidden="true"></i>').addClass("row lyricsBtn modalBtn text-center").attr("data-btn",3);
  $(contentLyrics).addClass("modal-content").html("<span class='close'data-btn="+3+">&times;</span>" + "<p>"+"LyricsFont"+"</p>");
  $(modalLyrics).attr("ID","myModal"+3).addClass("modal "+3).append(contentLyrics);
  $(videoBtn).html('<i class="fa fa-youtube" aria-hidden="true"></i>').addClass("row videoBtn modalBtn text-center").attr("data-btn",4).attr("data-video",videoLink);
  $(contentVideo).addClass("modal-content").html("<span class='close'data-btn="+4+">&times;</span>" + '<iframe width="560" height="315" src='+videoLink+' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
  $(modalVideo).attr("ID","myModal"+4).addClass("modal "+4).append(contentVideo);
  $(btnDisplay).append(favBtn).append(lyricsBtn).append(videoBtn);

  $(musicDisplay).append(imageDisplay).append(infoDisplay).append(btnDisplay);
  
  $(".infoContent").append(musicDisplay).append(modalLyrics).append(modalVideo);

};

//On click, add Music Info
$(".add").on("click",renderMusic);


//Clicking on add favorite Button
$(document).on("click",".favBtn",function(){
  // if(favorites.video.indexOf($(this).attr("data-video"))<0){
    favorites.album.push($(this).attr("data-album"));
    favorites.artist.push($(this).attr("data-artist"));
    favorites.title.push($(this).attr("data-title"));
    favorites.additional.push($(this).attr("data-add"));
    favorites.image.push($(this).attr("data-image"));
    favorites.video.push($(this).attr("data-video"));
    favorites.lyrics.push($(this).attr("data-lyrics"));
    localStorage.setItem("favorites",JSON.stringify(favorites));
  // }
});

//Show Favorites
$(".favorites").on("click",displayFavorites);

function displayFavorites() {
  $(".infoContent").empty();
  event.preventDefault();
  for(i=0;i<favorites.title.length;i++){
    var musicDisplay = $("<div>");
    var imageDisplay = $("<div>");
    var infoDisplay = $("<div>");
    var btnDisplay = $("<div>");
    var image = $("<img>");
    var album = $("<p>");
    var title = $("<p>");
    var artist = $("<p>");
    var additional = $("<p>");
    var delBtn = $("<button>");
    var lyricsBtn = $("<button>");
    var modalLyrics = $("<div>");
    var contentLyrics = $("<div>");
    var videoBtn = $("<button>");
    var modalVideo = $("<div>");
    var contentVideo = $("<div>");
    var videoLink = "https://www.youtube.com/embed/gqOEoUR5RHg";

    $(musicDisplay).addClass("row contentMusic justify-content-around align-items-center");
    
    $(image).attr('src',favorites.image[i]).attr("width","120px");
    $(imageDisplay).addClass("col-3 imageDisplay col align-self-center").append(image);

    $(infoDisplay).addClass("col-7 infoDisplay");
    $(album).text(favorites.album[i]).addClass("row");
    $(title).text(favorites.title[i]).addClass("row");
    $(artist).text(favorites.artist[i]).addClass("row");
    $(additional).text(favorites.additional[i]).addClass("row");
    $(infoDisplay).append(album).append(artist).append(title).append(additional);

    $(btnDisplay).addClass("col-2 btnDisplay");
    $(delBtn).html('<i class="fa fa-times" aria-hidden="true"></i>').addClass("row delBtn text-center").attr("data-number",i);
    $(lyricsBtn).html('<i class="fa fa-music" aria-hidden="true"></i>').addClass("row lyricsBtn modalBtn text-center").attr("data-btn",3);
    $(contentLyrics).addClass("modal-content").html("<span class='close'data-btn="+3+">&times;</span>" + "<p>"+favorites.lyrics[i]+"</p>");
    $(modalLyrics).attr("ID","myModal"+3).addClass("modal "+3).append(contentLyrics);
    $(videoBtn).html('<i class="fa fa-youtube" aria-hidden="true"></i>').addClass("row videoBtn modalBtn text-center").attr("data-btn",4).attr("data-video",videoLink);
    $(contentVideo).addClass("modal-content").html("<span class='close'data-btn="+4+">&times;</span>" + '<iframe width="560" height="315" src='+favorites.video[i]+' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $(modalVideo).attr("ID","myModal"+4).addClass("modal "+4).append(contentVideo);
    $(btnDisplay).append(delBtn).append(lyricsBtn).append(videoBtn);

    $(musicDisplay).append(imageDisplay).append(infoDisplay).append(btnDisplay);
    
    $(".infoContent").append(musicDisplay).append(modalLyrics).append(modalVideo);
  }
};

//Delete Favorite
$(document).on("click",".delBtn",function(){
  var index = $(this).attr("data-number");
  console.log(index);
  favorites.album.splice(index,1);
  favorites.title.splice(index,1);
  favorites.artist.splice(index,1);
  favorites.image.splice(index,1);
  favorites.video.splice(index,1);
  favorites.lyrics.splice(index,1);
  favorites.image.splice(index,1);
  localStorage.setItem("favorites",JSON.stringify(favorites));
  displayFavorites();
});
