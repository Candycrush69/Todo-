const input = document.querySelector('#todo__input')
const btn = document.querySelector('#todo__add')
const list = document.querySelector('#todo__list')

btn.addEventListener('click', () => {
  const value = input.value
  if (value =='') {alert('Поле ввода не должно быть пустым! Повторите попытку снова.')} 
  else {
    sendName(value)
    input.value = ''
    }
  
})

fetchTodo()
  
list.addEventListener('click', e => {
  const id = e.target.closest('li')?.dataset.id
  const tag = e.target.tagName
  const checked = e.target.checked;
  if (id && tag === 'INPUT') {
    checkTodo(id, checked)
  }

  if (id && tag === 'BUTTON') {
    var element = document.querySelector('input[type=checkbox]');   
      if (element.checked) {
        e.target.closest('li').remove()
        removeTodo(id)
      } else {alert('Вы не можете удалить невыполненный пункт.')} 
      
  }
})

function fetchTodo() {
  fetch('./php/todo.php')
    .then(res => res.json())
    .then(res => {
      list.innerHTML = ''
      res?.forEach(todo => {
        list.innerHTML += `
          <li class="todo__item" data-id='${todo.id}'>
            <input type="checkbox" class="todo__check">
            <span>${todo.text}</span>
            <button class="todo__remove">&times;</button>
          </li>
        `
      })
    })
}

function sendName(todo) {
  fetch('./php/todo.php', {
    method: 'POST',
    body: JSON.stringify({
      todo: todo
    })
  }).then(res => fetchTodo())
}

function checkTodo(id, checked) {
  fetch('./php/todo.php', {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      checked: checked
    })
  })
}

function removeTodo(id) {
  console.log(id);
  fetch('./php/todo.php', {
    method: 'DELETE',
    body: JSON.stringify({
      id: id,
    })
  })
}



