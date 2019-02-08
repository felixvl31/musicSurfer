// Initialize Firebase
var config = {
  apiKey: "AIzaSyAYhEfb1hnfEUi-pBKNqiRny22vFzUB8wQ",
  authDomain: "music-99fbd.firebaseapp.com",
  databaseURL: "https://music-99fbd.firebaseio.com",
  projectId: "music-99fbd",
  storageBucket: "music-99fbd.appspot.com",
  messagingSenderId: "53974921507"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

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
  }
} 

//iTunes API search

//On click, add Music Info
$("#search").on("click",function(event){
    event.preventDefault();
  $(".infoContent").empty();
    console.log("click");

  var term = $("#term").val().trim();

  //Check if is not empty
  if(term == ""){
    $("#term").css("border", "black solid 2px");  //Black to be able to see it now, needs to be changed
    $("#term").attr("placeholder","Type something..");
    console.log("empty");
    return
  }
  $("#term").val("");
  $("#term").css("border", "none");
  $("#term").attr("placeholder","Artist,Title,Album,etc.");

  $.ajax({
    url: "http://itunes.apple.com/search?term="+term+"&limit=10&media=music&musicVideo&limit=10",
    dataType: "jsonp",
    success: function( response ) {
      console.log(response);
      // console.log(response.results[0].artistName);
      // console.log(response.results[0].trackName);
      // console.log(response.results[0].collectionName);
      // console.log(response.results[0].artworkUrl100);
      console.log(response.results.length);

    if (response.results.length == 0){
      $("#term").attr("placeholder","No Results, Search something else...");
      return
    }

      for (i=0;i<=response.results.length-1;i++){
        var artist =response.results[i].artistName;
        var title =response.results[i].trackName;
        var album =  response.results[i].collectionName;
        var imageURL = response.results[i].artworkUrl100;
        var trackID = response.results[i].trackId;
        var videoID = response.results[i].trackTimeMillis;

        if (response.results[i].kind == "music-video"){
          var videoURL = response.results[i].previewUrl;
          var album =  "Video";
        }
        else{
          var videoURL = "";
        }
        renderMusic(title, artist, album, "Additional 3", imageURL,videoURL,false,true,videoID,trackID);
      };
    }
  });
});   

//Load Lyrics
$(".container-fluid").on("click",".lyricsBtn", function() {
  var artist = $(this).attr("data-artist");
  var title = $(this).attr("data-title");
  var data =  $(this).attr("data-btn");

    //MusicXMatch API needs to go here

  $("#lyricsSpace" + data).html(title+"<br>"+artist+"<br>");//Lyrics go here
});
   
// Open Modal
$(".container-fluid").on("click",".modalBtn", function() {
  var data = $(this).attr("data-btn");
  $("#myModal" + data).css("display", "block");
});

//Close Modal and stop video
$(".container-fluid").on("click",".close", function() {
  var data = $(this).attr("data-btn");
  var video = $(this).attr("data-video");
  $("#myModal"+data+" iframe").attr("src", "empty");
  $("#myModal"+data+" iframe").attr("src", video);
  $("#myModal" + data).css("display", "none");
});

//Add MusicDisplay
function renderMusic(title, artist, album, additional, coverURL,videoURL,deleteBtn,favoriteBtn,videoID,lyricsID,deleteID) {
  var musicDisplay = $("<div>");
  var imageDisplay = $("<div>");
  var infoDisplay = $("<div>");
  var btnDisplay = $("<div>");
  var imageSpace = $("<img>");
  var albumSpace = $("<p>");
  var titleSpace = $("<p>");
  var artistSpace = $("<p>");
  var additionalSpace = $("<p>");
  var lyricsSpace = $("<p>");
  var favBtnSpace = $("<button>");
  var delBtnSpace = $("<button>");
  var lyricsBtnSpace = $("<button>");
  var modalLyrics = $("<div>");
  var contentLyrics = $("<div>");
  var videoBtnSpace = $("<button>");
  var modalVideo = $("<div>");
  var contentVideo = $("<div>");

  $(musicDisplay).addClass("row contentMusic justify-content-around align-items-center");
  
  $(imageSpace).attr('src',coverURL).attr("width","120px");
  $(imageDisplay).addClass("col-3 imageDisplay col align-self-center").append(imageSpace);

  $(infoDisplay).addClass("col-7 infoDisplay");
  $(albumSpace).text(album).addClass("row");
  $(titleSpace).text(title).addClass("row");
  $(artistSpace).text(artist).addClass("row");
  $(additionalSpace).text(additional).addClass("row");
  $(infoDisplay).append(albumSpace).append(artistSpace).append(titleSpace).append(additionalSpace);

  $(btnDisplay).addClass("col-2 btnDisplay");
  $(favBtnSpace).html('<i class="fa-hover-hidden fa fa-star-o" aria-hidden="true"></i><i class="fa-hover-show fa fa-star" aria-hidden="true"></i>').addClass("row favBtn text-center");
  if (deleteBtn){
    $(delBtnSpace).html('<i class="fa fa-times" aria-hidden="true"></i>').addClass("row delBtn text-center").attr("data-number",deleteID);
  }

  if (favoriteBtn){
    $(favBtnSpace).attr("data-album",album).attr("data-artist",artist).attr("data-title",title).attr("data-add",additional).attr("data-img",coverURL).attr("data-video",videoURL);
  }
  $(lyricsBtnSpace).html('<i class="fa fa-music" aria-hidden="true"></i>').addClass("row lyricsBtn modalBtn text-center").attr("data-btn",lyricsID).attr("data-artist",artist).attr("data-title",title);
  $(lyricsSpace).attr("data",lyricsID).attr("id","lyricsSpace"+lyricsID);
  $(contentLyrics).addClass("modal-content").html("<span class='close'data-btn="+lyricsID+" data-video="+videoURL+">&times;</span>").append(lyricsSpace);
  $(modalLyrics).attr("ID","myModal"+lyricsID).addClass("modal "+lyricsID).append(contentLyrics);

  if(videoURL != ""){
    $(videoBtnSpace).html('<i class="fa fa-youtube" aria-hidden="true"></i>').addClass("row videoBtn modalBtn text-center").attr("data-btn",videoID).attr("data-video",videoURL);
    $(contentVideo).addClass("modal-content").html("<span class='close'data-btn="+videoID+" data-video="+videoURL+">&times;</span>" + '<iframe src='+videoURL+' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $(modalVideo).attr("ID","myModal"+videoID).addClass("modal "+videoID).append(contentVideo);
  }
  if (deleteBtn){
    $(btnDisplay).append(delBtnSpace).append(lyricsBtnSpace);
  }
  if (favoriteBtn){
    $(btnDisplay).append(favBtnSpace).append(lyricsBtnSpace);
  }
  if(!favoriteBtn & !deleteBtn){
    $(btnDisplay).append(lyricsBtnSpace);
  }
   if(videoURL !=""){
    $(btnDisplay).append(videoBtnSpace);
  }

  $(musicDisplay).append(imageDisplay).append(infoDisplay).append(btnDisplay);
  
  if(videoURL !=""){
    $(".infoContent").append(musicDisplay).append(modalLyrics).append(modalVideo);
  }
  else{
    $(".infoContent").append(musicDisplay).append(modalLyrics);
  }
  

};

//Clicking on add favorite Button
$(document).on("click",".favBtn",function(){

  // var indexTitle = (favorites.title.indexOf($(this).attr("data-title")));
  // var indexArtist= (favorites.artist.indexOf($(this).attr("data-artist")));
  // var indexAlbum = (favorites.album.indexOf($(this).attr("data-album")));

  // if(indexTitle<0){
    favorites.album.push($(this).attr("data-album"));
    favorites.artist.push($(this).attr("data-artist"));
    favorites.title.push($(this).attr("data-title"));
    favorites.additional.push($(this).attr("data-add"));
    favorites.image.push($(this).attr("data-img"));
    favorites.video.push($(this).attr("data-video"));
    localStorage.setItem("favorites",JSON.stringify(favorites));

    database.ref().push({
      album:$(this).attr("data-album"),
      artist:$(this).attr("data-artist"),
      title:$(this).attr("data-title"),
      additional:$(this).attr("data-add"),
      image:$(this).attr("data-img"),
      video:$(this).attr("data-video"),
    });
  // };
});

//Show Favorites
$(".favorites").on("click",displayFavorites);

function displayFavorites() {
  $(".infoContent").empty();
  event.preventDefault();
  for(i=0;i<favorites.title.length;i++){
    renderMusic(favorites.title[i], favorites.artist[i],favorites.album[i], favorites.additional[i], favorites.image[i],favorites.video[i],true,false,100+i,200+i,i);
  }
};

//Delete Favorite
$(document).on("click",".delBtn",function(){
  var index = $(this).attr("data-number");
  favorites.album.splice(index,1);
  favorites.title.splice(index,1);
  favorites.artist.splice(index,1);
  favorites.additional.splice(index,1);
  favorites.video.splice(index,1);
  favorites.image.splice(index,1);
  localStorage.setItem("favorites",JSON.stringify(favorites));
  displayFavorites();
});

//Popular Section //Recent Favorites
$(".popular").on("click",function(){
  $(".infoContent").empty();
  var i=0;
  database.ref().once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    var title = child.val().title;
    var album = child.val().album;
    var artist = child.val().artist;
    var additional = child.val().additional;
    var image = child.val().image;
    var video = child.val().video;
    renderMusic(title, artist,album,additional,image,video,false,false,1000+i,2000+i);
    i++;
   });
  });
});

//Delete elements in case of more than 25
database.ref().on("value", function(snapshot) {
  var arrayKey=[];
  snapshot.forEach(function(child) {
    arrayKey.push(child.key);
    if(arrayKey.length >= 25){
      var difference = arrayKey.length-25;
      for (i=0;i<=difference-1;i++){
        database.ref().child(arrayKey[i]).remove();
      }
    }
  });
});

