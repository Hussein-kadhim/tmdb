import { imageUrlBuilder } from '../utils/imageUrlBuilder';

const searchForm = document.getElementById('form');
const searchInput = document.getElementById('search');
const movieListTitle = document.querySelector('.row');
window.getMovieData = getMovieData;
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const locale = 'en-US';
  const url = `${process.env.MAIN_URL}/search/multi?api_key=${
    process.env.API_KEY
  }&language=${locale}&query=${encodeURIComponent(searchInput.value)}`;
  if (searchInput.value.trim() === '') {
    alert('This field is required');
  } else {
    try {
      const res = await fetch(url);

      const { results } = await res.json();

      for (let index = 0; index < results.length; index++) {
        const {
          name,
          known_for_department,
          gender,
          poster_path,
          profile_path,
          id,
          media_type,
          release_date,
          title,
          first_air_date,
          known_for,
        } = results[index];

        let output = `
                    <div class="col-md-6 col-lg-4 p-2">
                      <div class="card text-center" >
                        <img  src="${imageUrlBuilder(
                          poster_path ? poster_path : profile_path,
                          'w300_and_h450_bestv2',
                          '300'
                        )}" class="card-img-top" />
                         <div class="card-body">
                            <h5 class="card-title">${name ? name : title}</h5>
                            ${
                              media_type === 'person'
                                ? `<p class="card-title fw-bolder">${
                                    gender == '2'
                                      ? 'male'
                                      : gender == '1'
                                      ? 'female'
                                      : 'non-binary'
                                  }</h5>`
                                : `<p></p>`
                            }
                            ${
                              media_type === 'person'
                                ? `<p>${known_for_department}</p>`
                                : `<p class="card-text">Release date ${
                                    release_date ? release_date : first_air_date
                                  }</p>`
                            }
                            <p class="card-text">${media_type}</p>
                            <a href="/media-details/index.html"  onclick="getMovieData('${id}', '${media_type}' , '${encodeURIComponent(
          JSON.stringify(known_for)
        )}')" class="btn btn-primary">Get more info </a>
                          </div>
                        </div>
                     </div>
                        `;
        movieListTitle.innerHTML += output;
      }
      searchInput.value = '';
    } catch (error) {}
  }
});

function getMovieData(id, type, known_for) {
  const data = {
    id,
    type,
    known_for: decodeURIComponent(known_for),
  };

  localStorage.clear();
  localStorage.setItem('data', JSON.stringify(data));
}
