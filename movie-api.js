const apiKey = 'e7e4c05e57153ade4bd180c8128eae6a';
const apiToken= 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2U0YzA1ZTU3MTUzYWRlNGJkMTgwYzgxMjhlYWU2YSIsInN1YiI6IjY2NWM3OGJhMTNjYTU2MGE0YWM4ZTUyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yBhTD2TxM5duA7dQemZByr1ABC6gpibehiOm7vYd9Po';
const baseMovie = 'https://api.themoviedb.org/3';
const getMovies = '/discover/movie';
const baseImag = 'https://image.tmdb.org/t/p/w500';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiToken}`
  }
};

async function fetchMovies(api) {
    const response = await fetch(api);
    const data = await response.json();
    printData(data.results);
    moviesDetails(data.results);
    topics(data.results);
    console.log(data.results);
}

async function moviesDetails(movies) {
  const latestEpisodes= document.querySelector('.latestEpisodes');
  let moviesUrl = [];
  movies.map(movie => {
// console.log(movie.id);
    const url = `${baseMovie}/movie/${movie.id}`;
   moviesUrl.push(url);
    
  });
    const moviesUrlFetch = moviesUrl.slice(5, 7);
    moviesUrlFetch.forEach(url => {  fetch(url, options)
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        latestEpisodes.innerHTML += `    <div class="col-lg-6 col-12 mb-4 mb-lg-0">
                <div class="custom-block d-flex">
                  <div class="">
                    <div class="custom-block-icon-wrap">
                      <div class="section-overlay"></div>
                      <a href="detail-page.html" class="custom-block-image-wrap">
                        <img
                          src="${baseImag}/${json.poster_path}"
                          class="custom-block-image img-fluid"
                          alt=""
                        />
  
                        <a href="#" class="custom-block-icon">
                          <i class="bi-play-fill"></i>
                        </a>
                      </a>
                    </div>
  
                    <div class="mt-2">
                      <a href="#" class="btn custom-btn"> Subscribe </a>
                    </div>
                  </div>
  
                  <div class="custom-block-info">
                    <div class="custom-block-top d-flex mb-1">
                      <small class="me-4">
                        <i class="bi-clock-fill custom-icon"></i>
                        50 Minutes
                      </small>
  
                      <small>Episode <span class="badge">15</span></small>
                    </div>
  
                    <h5 class="mb-2">
                      <a href="detail-page.html"> ${json.original_title} </a>
                    </h5>
  
                    <div class="profile-block d-flex">
                      <img
                        src="${baseImag}/${json.production_companies[0].logo_path}"
                        class="profile-block-image img-fluid"
                        alt=""
                      />
  
                      <p>
                      ${json.production_companies[0].name}
                        <img
                          src="images/verified.png"
                          class="verified-image img-fluid"
                          alt=""
                        />
                        <strong>${json.production_countries[0].name}</strong>
                      </p>
                    </div>
  
                    <p class="mb-0">${json.overview}</p>
  
                    <div
                      class="custom-block-bottom d-flex justify-content-between mt-3"
                    >
                      <a href="#" class="bi-headphones me-1">
                        <span>120k</span>
                      </a>
  
                      <a href="#" class="bi-heart me-1">
                        <span>42.5k</span>
                      </a>
  
                      <a href="#" class="bi-chat me-1">
                        <span>11k</span>
                      </a>
  
                      <a href="#" class="bi-download">
                        <span>50k</span>
                      </a>
                    </div>
                  </div>
  
                  <div class="d-flex flex-column ms-auto">
                    <a href="#" class="badge ms-auto">
                      <i class="bi-heart"></i>
                    </a>
  
                    <a href="#" class="badge ms-auto">
                      <i class="bi-bookmark"></i>
                    </a>
                  </div>
                </div>
              </div>  `
  
              
      })
      .catch(err => console.error('error:' + err));} );
}



const searchForm = document.querySelector('#search-form');
const searchResultSections = document.querySelector('.search-result-section');
searchResultSections.style.display = 'none';
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = `${baseMovie}/search/movie?query=${searchForm.search.value}`;
  const searchResult = document.querySelector('#search-result');

  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      searchResult.innerHTML = ''; 
      searchResultSections.style.display = 'block';
      json.results.map(result => {
        searchResult.innerHTML += `
        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                    <div class="custom-block custom-block-overlay">
                        <a href="detail-page.html" class="custom-block-image-wrap">
                            <img src="${baseImag}/${result.poster_path}" class="custom-block-image img-fluid" alt="" />
                        </a>

                        <div class="custom-block-info custom-block-overlay-info">
                            <h5 class="mb-1">
                                <a href="listing-page.html">
                                ${result.title}
                                </a>
                            </h5>

                            <p class="badge mb-0">50 ${result.vote_count}</p>
                        </div>
                    </div>
                </div>
        `;
      });
    })
    .catch(err => console.error('error:' + err));
});


async function topics(movies) {
  const topicSection= document.querySelector('.topics-section #row2');
  const trendingMoviesSection = document.querySelector('#row3');
  let moviesUrl = [];
  movies.map(movie => {
console.log(movie.id);
    const url = `${baseMovie}/movie/${movie.id}`;
   moviesUrl.push(url);
    
  });
    const moviesUrlFetch = moviesUrl.slice(4, 8);
    const trendingMovies = moviesUrl.slice(15, 18);
    moviesUrlFetch.forEach(url => {  fetch(url, options)
      .then(res => res.json())
      .then(json => {
       // console.log(json);
        topicSection.innerHTML +=
         `  
          <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
              <div class="custom-block custom-block-overlay">
                <a href="detail-page.html" class="custom-block-image-wrap">
                  <img
                    src="${baseImag}/${json.poster_path}"
                    class="custom-block-image img-fluid"
                    alt=""
                  />
                </a>

                <div class="custom-block-info custom-block-overlay-info">
                  <h5 class="mb-1">
                    <a href="listing-page.html"> ${json.genres[0].name} </a>
                  </h5>

                </div>
              </div>
            </div>
        `
        
              
      })
      .catch(err => console.error('error:' + err));} );
    trendingMovies.forEach(url => {  fetch(url, options)
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        
        trendingMoviesSection.innerHTML +=
        `<div class="col-lg-4 col-12 mb-4 mb-lg-0">
              <div class="custom-block custom-block-full">
                <div class="custom-block-image-wrap">
                  <a href="detail-page.html">
                    <img
                      src="${baseImag}/${json.poster_path}"
                      class="custom-block-image img-fluid"
                      alt=""
                    />
                  </a>
                </div>

                <div class="custom-block-info">
                  <h5 class="mb-2">
                    <a href="detail-page.html">${json.original_title}</a>
                  </h5>

                  <div class="profile-block d-flex">

                    <p><strong>${json.production_companies[0].name}</strong></p>
                  </div>

                  <p class="mb-0">${json.tagline}</p>

                  <div
                    class="custom-block-bottom d-flex justify-content-between mt-3"
                  >
                    <a href="#" class="bi-eye me-1">
                      <span>50m</span>
                    </a>

                    <a href="#" class="bi-heart me-1">
                      <span>924k</span>
                    </a>

                    <a href="#" class="bi-chat me-1">
                      <span>11.5k</span>
                    </a>
                  </div>
                </div>

                <div class="social-share d-flex flex-column ms-auto">
                  <a href="#" class="badge ms-auto">
                    <i class="bi-heart"></i>
                  </a>

                  <a href="#" class="badge ms-auto">
                    <i class="bi-bookmark"></i>
                  </a>
                </div>
              </div>
            </div>
        `
              
      })
      .catch(err => console.error('error:' + err));} );
}


async function printData(movies){
  // console.log(movies);
  const carousel = document.querySelector('.owl-carousel');
 await movies.map(movie => {
  const movieTitle = (movie.original_title).split(' ').slice(0,3).join(' ');

  carousel.innerHTML +=
   `
    <div class="owl-carousel-info-wrap item">
                  <img
                    src="${baseImag}/${movie.poster_path}"
                    class="owl-carousel-image img-fluid"
                    alt=""
                  />

                  <div class="owl-carousel-info">
                    <h6 class="mb-2">
                      ${movieTitle}
                      <img
                        src="images/${movie.adult ? 'verified' : 'plus18'}.png"
                        class="owl-carousel-verified-image img-fluid"
                        alt=""
                      />
                    </h6>

                    <span class="badge">Storytelling</span>

                    <span class="badge">Business</span>
                  </div>

                  
                </div>

  `
});
 $('.owl-carousel').owlCarousel({
  center: true,
  loop: true,
  margin: 30,
  autoplay: true,
  responsiveClass: true,
  responsive:{
      0:{
          items: 2,
      },
      767:{
          items: 3,
      },
      1200:{
          items: 4,
      }
  }
});
}

const apiMovies = `${baseMovie}/${getMovies}?api_key=${apiKey}`;
fetchMovies(apiMovies);

