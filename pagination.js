let body = document.body
let container = document.querySelector('.container')
let todos = []

let pag = document.querySelector(".pagination")
let currentPage = 1
const itemsPerPage = 12
let data = []

// fetch("https://jsonplaceholder.typicode.com/todos")
//     .then(res => res.json())
//     .then(res => reload(res))

fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res => res.json())
    .then(res => {
        data = res;
        reload();
    });

function reload() {
    console.log(data)

    container.innerHTML = ""


  
    const startIndex = currentPage * itemsPerPage - itemsPerPage
    const endIndex = startIndex + itemsPerPage

    
    const coundItems = data.slice(startIndex, endIndex)
    // console.log(coundItems);


    for (let item of coundItems) {
        let box = document.createElement('div')
        let p = document.createElement('p')
        let span = document.createElement('span')
        let button = document.createElement('button')
        let change = document.createElement("button")

        box.classList.add('box')
        p.classList.add('text')
        span.classList.add('op')
        change.classList.add("change")
        button.classList.add("cancel")
        button.innerHTML = "x"
        change.innerHTML = "✏️"


        let short = item.title.slice(0, 30) + "..."

        span.innerHTML = item.id
        p.innerHTML = short
        box.setAttribute('data-id', item.id)

        container.append(box)
        box.append(p, span, button, change)

        button.onclick = () => {
            todos = todos.filter(el => el.id !== item.id)
            box.classList.add('delete-anim')
            setTimeout(() => {
                box.remove()
            }, 500)
        }

        p.onclick = () => {
            p.classList.toggle('zacherk')
            item.isDone = p.classList.contains('zacherk')
        }

        if (item.isDone) {
            p.classList.add('zacherk')
        }

        change.onclick = () => {
            let modal = document.createElement("div")
            modal.classList.add("modal")

            let modalContent = document.createElement("div")
            modalContent.classList.add("modal-content")

            let label = document.createElement("label")
            label.innerHTML = "Изменить на: "

            let input = document.createElement("input")
            input.type = "text"
            input.id = "taskInput"
            input.value = item.title

            let buttonsContainer = document.createElement("div")
            buttonsContainer.classList.add("modal-buttons")

            let saveButton = document.createElement("button")
            saveButton.innerHTML = "Save"
            saveButton.classList.add("save")
            saveButton.onclick = () => saveItem(item)

            let cancelButton = document.createElement("button")
            cancelButton.innerHTML = "Cancel"
            cancelButton.classList.add("cancel-mdl")
            cancelButton.onclick = closeModal

            buttonsContainer.append(saveButton)
            buttonsContainer.append(cancelButton)

            modalContent.append(label)
            modalContent.append(input)
            modalContent.append(buttonsContainer)

            modal.append(modalContent)
            body.append(modal)

            openModal()

            function openModal() {
                modal.style.display = "block"
            }

            function closeModal() {
                modal.style.display = "none"
            }

            function saveItem(todo) {
                let taskInput = document.querySelector("#taskInput")
                let value = taskInput.value
                todo.task = value

                p.innerHTML = value

                console.log("Saved: " + value)
                closeModal()
                //   p.taskInput.value = ""
            }
        }
    }
   pages()
}

function pages() {
    
    pag.innerHTML = ""

    const totalPages = Math.ceil(data.length / itemsPerPage)

    for (let i = 1; i <= totalPages; i++) {
        let box_a = document.createElement('div')
        box_a.classList.add('link')
        let link = document.createElement("a")
        link.href = "#"
        link.innerText = i

        if (i === currentPage) {
            link.classList.add("active")
        }

        link.onclick = () => {
            currentPage = i
            reload()
        }

        pag.append(box_a)
        box_a.append(link)
    }
}