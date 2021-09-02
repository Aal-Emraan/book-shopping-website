const searchNumber = document.getElementById('searchNumber')

const loading = document.getElementById('loading');
loading.classList.add('d-none');

let search = '';



const getBooks = () => {
    const url = 'http://openlibrary.org/search.json?q=javascript';
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}

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
        const url = `http://openlibrary.org/search.json?q=${searchName}`;
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
        <h5 class="mx-4 my-3 text-danger">no result found for <i class='fs-3 text-secondary'>${search}</i> 😪</h5>`;
    }else{
        searchNumber.innerHTML = `
        <h5 class="mx-4 my-3 text-success">${book.num_found} results found for <i class='fs-3 text-primary'>${search}</i>.</h5>`;
    }

    book.docs.forEach(book => {
        const coverImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        console.log(book.cover_i);
        const coverImg = () => {
            let coverImageLink = '';
            if(book.cover_i === undefined){
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
        <h5 style="max-width:75%" class="card-title mx-auto mt-2">${book.title}</h5>
            <img height=300 src="${coverImg()}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">Author: ${book.author_name[0]}</p>
                <p class="card-text">Publisher: ${book.publisher[0]}</p>
                <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
            </div>
        </div>
        `;
    books.appendChild(div);
    })

}