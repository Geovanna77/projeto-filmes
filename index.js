const CHAVE = 'api_key=99e77cdb76b7728396dabe6955ebab08'
const URLAPI = 'https://api.themoviedb.org/3'
const URLPOPULARES = '/discover/movie?sort_by=popularity.desc&'
const URLCINEMA = '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&'

const POPULARES = URLAPI + URLPOPULARES + CHAVE
const CINEMAS = URLAPI + URLCINEMA + CHAVE

const IMAGE = "https://image.tmdb.org/t/p/w500"
const linkAPI = "https://api.themoviedb.org/movie/"
let divInserirDestaque = document.getElementById('inserirDestaque')

const resultPesquisa = URLAPI + '/search/movie?' + CHAVE
let formulario = document.getElementById('formPesquisa')
let pesquisa = document.getElementById('pesquisa')
let divvideo = document.getElementById("filmes_video")


function filmes(url, urlcinema) {
   fetch(url).then(res => res.json()).then(dados => {
       
       inserirDestaque(dados.results)
   })
   fetch(urlcinema).then(res => res.json()).then(dados => {
       
      inserirCarousel(dados.results)
  })
}
filmes(POPULARES, CINEMAS)


function inserirCarousel(dados) {
   console.log(dados)
   dados.forEach(filmes => {
       const { title, overview, release_date, poster_path } = filmes
       let carouselitens = document.getElementById('carouselitens')
       let div = document.createElement('div')
       div.classList.add('carousel-item')
       div.innerHTML= `
       <div class="col-12 text-center">
          <h1 class=>Lançamentos</h1>
       </div>
       <div class="row conteudol">
          <div class="col-xl-6">
             <div class="poster">
                <img src="${IMAGE + poster_path}">
             </div>
          </div>
          <div class="texto_poster col-xl-6">
             <div>
                <h3>${title}</h3>
                <p>${overview}</p>
                <div class="row diretor">
                   <p><b>Estreia:</b> ${release_date}</p>
                </div>
             </div>
          </div>
       </div>
    `
     divvideo.appendChild(div)

     //Com Active
     
   //   let titleActive = document.getElementById('titleActive')
   //   let descActive = document.getElementById('descActive')
   //   let dateActive = document.getElementById('dateActive')
   //   titleActive.innerText = title
   //   descActive.innerText = overview
   //   dateActive.innerText = release_date
    });
}

function inserirDestaque(dados) {
   divInserirDestaque.innerHTML = ""

   dados.forEach(filme => {
       const {title, poster_path, id, release_date, popularity} = filme
       let div = document.createElement('div')
       div.innerHTML = `
       <div class="cardPopularidade">
       <img src="${IMAGE + poster_path}" class="imagemPopularidade">
        <a href="${"https://www.themoviedb.org/movie/" + id}"> Filme: ${title}</a>
       <p>Estreia em: ${release_date}</p>
       <p>Popularidade: ${popularity}</p>
    </div>
       `

       divInserirDestaque.appendChild(div)
   })

}

formulario.addEventListener('submit', (e) => {
   e.preventDefault()

   const pesquisaValue = pesquisa.value

   if(pesquisaValue) {
      filmes(resultPesquisa + '&query=' + pesquisaValue)
   }
})

