import { imageUrlBuilder } from '../../utils/imageUrlBuilder';
import { onYouTubeIframeAPIReady } from '../../utils/onYouTubeIframeAPIReady';

(async function () {
  const { id, type, known_for } = JSON.parse(localStorage.getItem('data'));
  const pageTitle = document.querySelector('title');
  const container = document.querySelector('.background');
  const root = document.getElementById('root');
  const url = `${process.env.MAIN_URL}/${type}/${id}?api_key=${process.env.API_KEY}`;
  const overlay = document.querySelector('.overlay');

  const knownFor = JSON.parse(known_for);

  let knownForItems = '';
  knownFor.forEach(
    (item) =>
      (knownForItems += `
      <div class="col-md-3">
      <img src="${imageUrlBuilder(
        item?.backdrop_path,
        '150',
        '225'
      )}" class="rounded" alt="${item?.name ? item.name : item?.title}">
      <p>${item?.name ? item.name : item?.title}</p>
      </div>
      `)
  );
  console.log(knownFor);

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (type === 'person') {
      overlay.style.background = 'none';
      root.innerHTML = `<div class="row">
                <div class="col-md-4">
                <img class="img-fluid rounded" src=${imageUrlBuilder(
                  data?.profile_path,
                  '300',
                  '450'
                )} alt=${data?.name ? data.name : data?.title}>
                </div>
                <div class="col-md-8 ps-4">
                <a href="#"><h1 class="text-dark fw-bolder">${
                  data.name
                }</h1></a>
                <h5 class="biography mb-3">Biography</h5>
                <p class="biography-info">${data.biography}</p>
                <h5>Known For</h5>
                <div class="row gx-5">${knownForItems}</div>
                </div>
                </div>`;
    } else {
      container.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path})`;
      let genres = '';
      data?.genres.forEach(
        (genre) =>
          (genres += `<a href=${id} class="card-link text-white">${genre?.name}</a>`)
      );
      let created_by = '';

      data?.created_by &&
        data?.created_by.forEach((creator) => {
          return (created_by += `
                    <li class="col-md-4">
                    <div style="display: grid">
                    <img class="img-thumbnail" src="${imageUrlBuilder(
                      creator?.profile_path,
                      '150',
                      '150'
                    )}"  alt=${creator?.name} width="150" height="150"/>
                    <a class="text-light fw-bolder mt-2" href=${creator?.id}>${
            creator?.name
          }</a>
                    <p class="text-light mt-2" >Maker</p>
                    </div>
                    </li>`);
        });

      root.innerHTML = `
                <div class="col-4">
                <div class="card-body">
                    <img src=${imageUrlBuilder(
                      data?.poster_path,
                      '300',
                      '450'
                    )} alt=${data?.name ? data.name : data?.title}>
                </div>
            </div>
            <div class="col-8  ps-5">
                <div class="d-flex align-items-center">
                    <div class="title mt-5">
                        <h2 class="mt-5 text-light">${
                          data?.name || data?.title
                        }<span class="year-info">(${new Date(
        data?.first_air_date || data?.release_date
      ).getFullYear()})</span></h2>
                        <div class="facts">
                            <span class="certification border border-white text-muted px-2">16</span>
                            <span class="genre px-2">
                            ${genres}
                            </span>
                            <span class="runtime text-light">${
                              data?.episode_run_time
                                ? data?.episode_run_time[0]
                                : data?.runtime
                            }m</span>
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
            <h5 class="modal-title" id="exampleModalLabel">${
              data?.name || data?.title
            }</h5>
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
                `;
      pageTitle.textContent = data.title || data.name;
    }
  } catch (error) {
    console.error(error);
  }

  // const modal = document.querySelector('.modal')

  const playTrailerBtn = document.getElementById('play-trailer-btn');
  async function getTrailerVideo() {
    const url = `${process.env.MAIN_URL}/${type}/${id}?api_key=${process.env.API_KEY}&append_to_response=videos`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data) {
        onYouTubeIframeAPIReady(data.videos.results[0].key);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  playTrailerBtn?.addEventListener('click', getTrailerVideo);
})();
