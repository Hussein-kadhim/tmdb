import {imageUrlBuilder} from '../../utils/imageUrlBuilder'
import {onYouTubeIframeAPIReady} from '../../utils/onYouTubeIframeAPIReady'

(async function () {
    const { id, type } = JSON.parse(localStorage.getItem('data'))
    const pageTitle = document.querySelector('title')
    const container = document.querySelector('.background')
    const root = document.getElementById('root')
    const url = `${process.env.MAIN_URL}/${type}/${id}?api_key=${process.env.API_KEY}`

    try {
            const res = await fetch(url)
            const data = await res.json()
            container.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path})`
            let genres = ''
            data?.genres.forEach(genre => genres += `<a href=${id} class="card-link text-white">${genre?.name}</a>`)

            console.log(data);
            let created_by = ''
            
           data?.created_by&& data?.created_by.forEach((creator) => {

                return  created_by += `
                <li class="col-md-4">
                <div style="display: grid">
                <img class="img-thumbnail" src="${imageUrlBuilder(creator?.profile_path, 'w150_and_h150_bestv2', '150')}"  alt=${creator?.name} width="150" height="150"/>
                <a class="text-light fw-bolder mt-2" href=${creator?.id}>${creator?.name}</a>
                <p class="text-light mt-2" >Maker</p>
                </div>
                </li>`
            })
         
            root.innerHTML = `
            <div class="col-4">
            <div class="card-body">
                <img src=${imageUrlBuilder(data?.poster_path,'w300_and_h450_bestv2' , '300')} alt=${data?.name ? data.name : data?.title}>
            </div>
        </div>
        <div class="col-8  ps-5">
            <div class="d-flex align-items-center">
                <div class="title mt-5">
                    <h2 class="mt-5 text-light">${data?.name || data?.title}<span class="year-info">(${new Date(data?.first_air_date || data?.release_date).getFullYear()})</span></h2>
                    <div class="facts">
                        <span class="certification border border-white text-muted px-2">16</span>
                        <span class="genre px-2">
                        ${genres}
                        </span>
                        <span class="runtime text-light">${data?.episode_run_time ? data?.episode_run_time[0] : data?.runtime}m</span>
                    </div>
                </div>
            </div>
            <ul class="media-icons">
                <li class="media-icons-item icon-rounded">
                    <a href="#">
                        <i class="text-white fas fa-list"></i>
                    </a>
                </li>
                <li class="media-icons-item icon-rounded">
                    <a href="#">
                        <i class="text-white fas fa-heart"></i>
                    </a>
                </li>
                <li class="media-icons-item icon-rounded">
                    <a href="#">
                        <i class="text-white fas fa-bookmark"></i>
                    </a>
                </li>
                <li class="media-icons-item icon-rounded">
                    <a href="#" class="">
                        <i class="text-white fas fa-star"></i>
                    </a>
                </li>
                <li class="media-icons-item">
                    <a id="play-trailer-btn" href="#" class="text-white px-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="fas fa-play"></i>
                        Play Trailer
                    </a>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${data?.name || data?.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div id="muteYouTubeVideoPlayer" style="width: 100%"></div>
      </div>
    </div>
  </div>
</div>
          </li>
            </ul>
            <div class="media-icons-details">
                <h3 class="tag-line text-muted">${data?.tagline}</h3>
                <h3 class="overview text-white">Overview</h3>
                <p class="text-light">${data?.overview}</p>
                <ul class="row">
                ${created_by}
                </ul>
            </div>
        </div>
    </div>
            `
            pageTitle.textContent = data.title || data.name

    } catch (error) {
console.error(error)
    }

 
    // const modal = document.querySelector('.modal')
            
    const playTrailerBtn = document.getElementById("play-trailer-btn")
    async function getTrailerVideo() {

        const url = `${process.env.MAIN_URL}/${type}/${id}?api_key=${process.env.API_KEY}&append_to_response=videos`
        try {
            const res = await fetch(url)
            const data = await res.json()
if(data){
    onYouTubeIframeAPIReady( data.videos.results[0].key)
}else{
    return null
}
        } catch (error) {
            console.log(error);
        }
    }

    playTrailerBtn?.addEventListener("click", getTrailerVideo)
})();

`
adult: false
backdrop_path: "/nhaeqHR86ZNztAuOJNMmjEg9eXo.jpg"
belongs_to_collection: null
budget: 0
genres: [{…}]
homepage: ""
id: 751394
imdb_id: "tt12739994"
original_language: "en"
original_title: "The 100 Candles Game"
overview: "A group of friends must confront their fears in a terrifying game. They must sit by the other players in a circle made of a hundred candles, take one of them and tell a horror story. As stories are told and candles blown out, strange events will start to happen. They will feel strange presences around them, lurking in the shadows. But they MUST NOT leave the game or else a terrible curse will fall upon them..."
popularity: 20.577
poster_path: "/mVcKV76XSxxJCsqdxjMql7yVJq5.jpg"
production_companies: [{…}]
production_countries: (2) [{…}, {…}]
release_date: "2020-11-13"
revenue: 0
runtime: 100
spoken_languages: [{…}]
status: "Released"
tagline: ""
title: "The 100 Candles Game"
video: false
vote_average: 6
vote_count: 81

backdrop_path: "/hTExot1sfn7dHZjGrk0Aiwpntxt.jpg"
created_by: [{…}]
episode_run_time: [43]
first_air_date: "2014-03-19"
genres: (3) [{…}, {…}, {…}]
homepage: "http://www.cwtv.com/shows/the-100/"
id: 48866
in_production: false
languages: ['en']
last_air_date: "2020-09-30"
last_episode_to_air: {air_date: '2020-09-30', episode_number: 16, id: 2373093, name: 'The Last War', overview: 'After all the fighting and loss, Clarke and her fr…tle. But is humanity worthy of something greater?', …}
name: "The 100"
networks: [{…}]
next_episode_to_air: null
number_of_episodes: 100
number_of_seasons: 7
origin_country: ['US']
original_name: "The 100"
seasons: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]

`