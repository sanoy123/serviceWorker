/*
if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./sw.js', { scope: './' })
    .then(function(registration) {
      console.log("Service Worker Registered");
    })
    .catch(function(err) {
      console.log("Service Worker Failed to Register", err);
    })

}
*/


function getStories(){

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange= function(){
    if(xhttp.readyState ==4 && xhttp.status ==200){
      var stories = JSON.parse(xhttp.responseText);
      var storyList='';
      for(var i=0; i<stories.length; i++){
        storyList += `<div class="col-md-3">
          <div class="panel-heading">
          <div class="row">
            <img src="`+stories.articles[i].urlToImage+`">
          </div>
          <div class="row">
           <h3 class="panel-title">` + stories.articles[i].title + `</h3>
          </div>
          <div class="row">
            <p>`+stories.articles[i].description+`</p>
          </div>
        </div>`;
      }

      document.getElementById('stories').innerHTML = storyList;

    }
  }
  xhttp.open('GET', 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=af00c7eef7c74c9c9300434acb5e9159', true);
  xhttp.send();
}
