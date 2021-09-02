const searchNumber = document.getElementById('searchNumber')

const loading = document.getElementById('loading');
loading.classList.add('d-none');

let search = '';



/* const getBooks = () => {
    const url = 'http://openlibrary.org/search.json?q=javascript';
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
} */

const showSearchedBooks = () => {
    
    const books = document.getElementById('books');
    books.textContent = '';

    searchNumber.innerText = '';

    const searchInput = document.getElementById('search');
    const searchName = searchInput.value;
    searchInput.value = '';
    search = searchName;

    if(searchName === ''){
        window.alert('Please type a book name...')
    }
    else{
        const url = `https://openlibrary.org/search.json?q=${searchName}`;
        fetch(url)
        .then(res => res.json())
        .then(data => bookInfo(data))
        loading.classList.remove('d-none');
        loading.classList.add('d-block');
    }
}

const bookInfo = (book) => {
    loading.classList.remove('d-block');
    loading.classList.add('d-none');

    if(book.num_found === 0){
        searchNumber.innerHTML = `
        <h5 class="mx-4 my-3 text-danger">No result found for <i class='fs-3 text-secondary'>"${search}"</i> 😪</h5>`;
    }else{
        searchNumber.innerHTML = `
        <h5 class="mx-4 my-3 text-info">${book.num_found} results found for <i class='fs-3 text-warning'>"${search}"</i> 😎</h5>`;
    }

    book.docs.forEach(bookItem => {
        const coverImage = `https://covers.openlibrary.org/b/id/${bookItem.cover_i}-M.jpg`;
        const coverImg = () => {
            let coverImageLink = '';
            if(bookItem.cover_i === undefined){
                coverImageLink = 'img/book-na-1.jpg';
            }else{
                coverImageLink = coverImage;
            }
            return coverImageLink;
        }
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card img-thumbnail text-white" style="background:#002451">
        <h5 style="max-width:90%" class="card-title mx-auto mt-2 text-uppercase text-center">${bookItem.title}</h5>
            <img height=300 src="${coverImg()}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text"><strong>Author:</strong> <i class='text-danger'>${bookItem.author_name}</i></p>
                <p style="max-height: 100px;overflow:hidden" class="card-text"><strong class="text-warning">Publisher: </strong>${bookItem.publisher}</p>
                <p class="card-text"><strong class="text-warning">First Publish Year: </strong>${bookItem.first_publish_year}</p>
            </div>
        </div>
        `;
    books.appendChild(div);
    })

}