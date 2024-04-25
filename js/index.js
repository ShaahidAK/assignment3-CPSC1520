//Having an issue with adding to favourites, you will see it commented, if I left it, my data wouldn't flow correctly
//Having an issue, to render data, you must click on the search bar then press enter to see albums
let favoriteAlbums = [];

//Error trying to do Task 5..
//addToFavoritesButton.addEventListener('click', function() {
//album is defaulted to false to show its not a fav
  // let isAlreadyFavorite = false;

 // Check if the album is already in favorites
 //for (const favAlbum of favoriteAlbums) {
   //if (favAlbum.id === album.id) {
     //  isAlreadyFavorite = true;
       //break;
   //}
//}
//})

async function appInit() {
   const res = await fetch('https://661ad25e65444945d04e8f87.mockapi.io/api/v1/albums')
   const payload = await res.json()
   //console.log(payload)
   const searchForm = document.getElementById('search-form');
   const searchResults = document.getElementById('search-results');

   //form submit (prevent)
   searchForm.addEventListener('submit', function (e) {
      e.preventDefault();

      //search stuff, turn it lower and remove whitespaces
      const query = document.getElementById('query').value.toLowerCase().trim();

      const filteredAlbums = payload.filter(album => {
         const albumName = album.albumName.toLowerCase();
         const artistName = album.artistName.toLowerCase();
         return albumName.includes(query) || artistName.includes(query);
      });
      //display the filtered albums from AName or ArtName
      render(filteredAlbums);
   });
}

function render(albums) {

   //const addToFavoritesButton = albumItem.querySelector('.add-to-favorites');

   const searchResults = document.getElementById('search-results');
   searchResults.innerHTML = ''; // Clear previous results

   //iterate
   albums.forEach(album => {
      const albumItem = document.createElement('li');
      albumItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
      albumItem.innerHTML =
         //template literal from index.html
         `
           <div class="ms-2 me-auto">
               <div class="fw-bold">${album.albumName}<span class="badge bg-primary rounded-pill">${album.rating}</span></div>
               <span>${album.artistName}</span>
           </div>
           <button type="button" class="btn btn-success">Add to Favorites</button>
       `;
      searchResults.appendChild(albumItem);

      const addToFavoritesButton = albumItem.querySelector('.add-to-favorites');

     // addToFavoritesButton.addEventListener('click', function () {
         // Add the album to the favorites
        // favoriteAlbums.push(album);
      //});

   });
}


document.addEventListener('DOMContentLoaded', function () {
   const searchButton = document.getElementById('search-button');
   const favoritesButton = document.getElementById('favorites-button');
   const searchTab = document.getElementById('search-tab');
   const favoritesTab = document.getElementById('favorites-tab');

   //search button
   searchButton.addEventListener('click', function () {
      // Activate search button, hide favorites tab
      searchButton.classList.add('active');
      favoritesButton.classList.remove('active');

      // Show search button and hide favorites tab
      favoritesTab.classList.add('hidden');
      searchTab.classList.remove('hidden');
   });

   //favourites tab
   favoritesButton.addEventListener('click', function () {
      // Make favorites tab active and search button hidden
      favoritesButton.classList.add('active');
      searchButton.classList.remove('active');

      // Show favorites tab and hide search button
      searchTab.classList.add('hidden');
      favoritesTab.classList.remove('hidden');
   });

   appInit()
});

//looping and breaking into template literal to show artist name rating and album name
function renderFav() {
   const favoritesResults = document.getElementById('favorites-results');
   favoritesResults.innerHTML = '';

   favoriteAlbums.forEach(album => {
      const albumItem = document.createElement('li');
      albumItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
      albumItem.innerHTML =
         `
          <div class="ms-2 me-auto">
              <div class="fw-bold">${album.albumName}<span class="badge bg-primary rounded-pill">${album.rating}</span></div>
              <span>${album.artistName}</span>
          </div>
          <button type="button" class="btn btn-danger remove-from-favorites">Remove from Favorites</button>
      `;
      favoritesResults.appendChild(albumItem);

      //removing from favourites 
      const removeFromFavoritesButton = albumItem.querySelector('.remove-from-favorites');
      removeFromFavoritesButton.addEventListener('click', function () {
         const index = favoriteAlbums.findIndex(favAlbum => favAlbum.id === album.id);
         favoriteAlbums.splice(index, 1);
         renderFavorites();//re-render after removing
      });
   });
}
