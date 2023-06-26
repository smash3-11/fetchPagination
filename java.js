let body = document.body
let form = document.querySelector('form')
let container = document.querySelector('.container')
let todos = []





form.onsubmit = (event) => {
    event.preventDefault()

    let todo = {
        id: Math.random(),
        isDone: false,
        time: new Date().getHours() + ":" + new Date().getMinutes()
    }

    let fm = new FormData(event.target)

    fm.forEach((value, key) => {
        todo[key] = value
    })

    todos.push(todo)
    reload(todos)
}

function reload(arr) {
    container.innerHTML = ""

    for (let item of arr) {
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
      
      span.innerHTML = item.time
      p.innerHTML = item.task
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
        input.value = item.task
  
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
          
        };
  
        function closeModal() {
          modal.style.display = "none"
          
        };
  
        function saveItem(todo) {
          let taskInput = document.querySelector("#taskInput")
          let value = taskInput.value
          todo.task = value
          
          p.innerHTML = value 
  
          console.log("Saved item: " + value)
          closeModal()
          // value = ''
          
        };
      }
    }
  }
  
  
  
  