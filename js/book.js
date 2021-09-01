const searchNumber = document.getElementById('searchNumber');
searchNumber.style.display = 'none';

const getBooks = () => {
    const url = 'http://openlibrary.org/search.json?q=javascript';
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}

const showSearchedBooks = () => {
    const searchInput = document.getElementById('search');
    const searchName = searchInput.value;
    searchInput.value = '';
    const url = `http://openlibrary.org/search.json?q=${searchName}`;
    fetch(url)
    .then(res => res.json())
    .then(data => bookInfo(data))
}

const bookInfo = (book) => {
    const books = document.getElementById('books');
    books.textContent = '';
    console.log(book.docs.length);
    const searchResults = book.docs.length;
    searchNumber.style.display = 'block';
    searchNumber.innerHTML = `
    <h5 class="mx-4 my-3">${searchResults} results found.</h5>`;

    book.docs.forEach(book => {
        const coverImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        console.log(book.cover_i);
        const coverImg = () => {
            let coverImageLink = '';
            if(book.cover_i == undefined){
                coverImageLink = 'img/book-na-1.jpg';
            }else{
                coverImageLink = coverImage;
            }
            return coverImageLink;
        }
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card img-thumbnail">
        <h5 style="max-width:75%" class="card-title mx-auto mt-2">Book: ${book.title}</h5>
            <img height=400 src="${coverImg()}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">Author: ${book.author_name[0]}</p>
                <p class="card-text">Publisher: ${book.publisher}</p>
                <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
            </div>
        </div>
        `;
    books.appendChild(div);
    })

}