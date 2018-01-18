function getStories(e){
  e.preventDefault();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange= function(){
    if(xhttp.readyState ==4 && xhttp.status ==200){
      var stories = JSON.parse(xhttp.responseText);
      document.getElementById('stories').innerHTML =
      `<div class="panel panel-default">
        <div class="panel-heading">
         <h3 class="panel-title">` + stories['articles'].title + `</h3>
        </div>
        <div class="panel-body">
          <div class="col-md-3">
            <img src="`+stories['articles'].urlToImage+`">
          </div>
          <div class="col-md-9">`+stories['articles'].description+`</div>
        </div>
      </div>`;
    }
  }
  xhttp.open('GET', 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=af00c7eef7c74c9c9300434acb5e9159', true);
  xhttp.send();
}
