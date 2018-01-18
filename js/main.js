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
      console.log(stories.articles.length);
      var storyList='';
      for(var i=0; i<stories.articles.length; i++){
        storyList += `<div class="col-md-4">

            <img src="`+stories.articles[i].urlToImage+`" class="img-responsive">
           <h3><a href="`+stories.articles[i].url+`" target="_blank">` + stories.articles[i].title + `</a></h3>
           <span class="label label-primary">`+new Date(stories.articles[i].publishedAt).toLocaleDateString('en-US')+`</span>
            <p>`+stories.articles[i].description+`</p>

        </div>`;

        if(((i+1)%3) == 0){
          storyList+=`<div class="clearfix"></div>`;
        }
      }

      document.getElementById('stories').innerHTML = storyList;

    }
  }
  xhttp.open('GET', 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=af00c7eef7c74c9c9300434acb5e9159', true);
  xhttp.send();
}
