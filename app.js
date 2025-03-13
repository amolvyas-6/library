function Book(title, author, summary, numPages, isRead){
    this.title = title
    this.author = author
    this.numPages = numPages
    this.isRead = isRead
    this.summary = summary
    this.id = 'id'+crypto.randomUUID().slice(0,8)
}

function createNewBook(title, author, numPages, isRead, summary){
    const newBook = new Book(title, author, numPages, isRead, summary)
    library.push(newBook)
}

function toggleReadStatus(e){
    let id = e.target.parentElement.getAttribute('id');
    let readStatus = false;
    for(let i = 0; i < library.length; i++){
        if(library[i].id == id){
            library[i].isRead = !library[i].isRead
            readStatus = library[i].isRead
            break
        }
    }

    document.querySelectorAll('.card').forEach((card)=>{
        if (card.id == id){
            if(readStatus){
                card.querySelector('#'+card.id+' .read-status span').textContent = "Book is Read"
            }
            else{
                card.querySelector('#'+card.id+' .read-status span').textContent = "Book is Not Read"
            }
            return
        }
    })
}

function createCard(book){

    card = document.createElement('div');
    div=  document.createElement('div'),
    title=  document.createElement('h2'),
    author=  document.createElement('h3'),
    summary = document.createElement('p'),
    numPages=  document.createElement('p'),
    numPagesSpan=  document.createElement('span'),
    readStatus=  document.createElement('p'),
    readStatusSpan=  document.createElement('span'),
    toggleReadBtn=  document.createElement('button')

    card.classList.add('card')
    title.classList.add('title')
    author.classList.add('author')
    summary.classList.add('summary')
    numPages.classList.add('num-pages')
    readStatus.classList.add('read-status')
    toggleReadBtn.classList.add('toggle-read-btn')

    toggleReadBtn.textContent = "Toggle Read Status"

    title.textContent = book.title
    author.textContent = book.author
    summary.textContent = book.summary
    numPages.textContent = "Number of Pages: "
    numPagesSpan.textContent = book.numPages
    readStatus.textContent = "Read Status: "
    if(book.isRead)
        readStatusSpan.textContent = "Book is Read"
    else
        readStatusSpan.textContent= "Book is Not Read"

    toggleReadBtn.addEventListener('click', toggleReadStatus)

    document.querySelector('section').append(card)
    div.append(title, author, summary, numPages, readStatus)
    card.append(div, toggleReadBtn)
    numPages.append(numPagesSpan)
    readStatus.append(readStatusSpan)
    card.setAttribute('id', book.id)
}

function displayLibrary(){
    document.querySelectorAll('.card').forEach((card)=>{
        card.remove()
    })

    library.forEach(book => createCard(book))
}

const library = []
const form = document.querySelector('form')
const addBookBtn = document.querySelector('.add-book-btn')

addBookBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    let title = form.elements["title-input"].value
    let author = form.elements["author-input"].value
    let summary = form.elements["summary-input"].value
    let numPages = form.elements["num-pages-input"].value
    let readStatus = form.elements["read-status-input"].checked

    if (!parseInt(numPages) || numPages <= 0){
        alert('Invalid number of pages')
        return
    }

    if(title.length === 0 || author.length === 0){
        alert('Missing Entries')
        return
    }

    if(summary.length === 0)
        summary = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt tempora facere modi quod expedita minus quia at architecto dicta, fugit hic praesentium saepe iure, illo nesciunt quo necessitatibus id reprehenderit?"

    createNewBook(title, author, summary, numPages, readStatus)
    displayLibrary()

    form.elements["title-input"].value = ""
    form.elements["author-input"].value = ""
    form.elements["summary-input"].value = ""
    form.elements["num-pages-input"].value = ""
    form.elements["read-status-input"].checked = false
})