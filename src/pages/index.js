const searchForm = document.getElementById('form')
const searchInput = document.getElementById('search')
const movieListTitle = document.querySelector('.row')
const yearInput = document.getElementById('year')
window.getMovieData = getMovieData
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()

const locale = 'en-US'
const url = `${process.env.MAIN_URL}/search/multi?api_key=${process.env.API_KEY}&language=${locale}&query=${encodeURIComponent(searchInput.value)}`
  if (searchInput.value.trim() === '') {

    alert("This field is required")
  } else {

    try {
      const res = await fetch(url);

      const { results } = await res.json()

      for (let index = 0; index < results.length; index++) {
        const {backdrop_path, original_name, id, media_type, release_date, title} = results[index];
        if(media_type === "person") {
          console.log(results[index]);
          // TODO
          // dISPLAY THE PERSON DATA IN A CARD USE THE SAME CARD BELOW
          //  USER THE IMAGEBUILDERURL FUNCTION FOR THE CARD AND HANDLE THE DATA AS WELL
          return
        }
        let output = `
                    <div class="col-md-4 p-2">
                      <div class="card text-center" style="max-width: 18rem;">
                        <img src=https://image.tmdb.org/t/p/original${backdrop_path} class="card-img-top" alt="...">
                         <div class="card-body">
                            <h5 class="card-title">${original_name ? original_name : title}</h5>
                            <p class="card-text">${media_type}</p>
                            <p class="card-text">Release date ${release_date}</p>
                            <a href="/media-details/index.html"  onclick="getMovieData('${id}', '${media_type}')" class="btn btn-primary">Get more info </a>
                          </div>
                        </div>
                     </div>
                        `
         movieListTitle.innerHTML += output

      }
      searchInput.value = ""
    } catch (error) {

    }

  }

})

function getMovieData(id, type){
  const data ={
    id, 
    type
  }

  localStorage.clear()
  localStorage.setItem('data', JSON.stringify(data));
}