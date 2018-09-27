import API from 'goals-todos-api'

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'

function addTodo (todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodo (id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodo (id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

//async action
export function handleAddTodo (todo, cb) {
  return (dispatch) => {
    return API.saveTodo(todo)
      .then((todo) => {
        dispatch(addTodo(todo))
        cb()
      })
      .catch(() => alert('There was an error. Try again.'))
  }
}

export function handleToggleTodo (id) {
  return (dispatch) => {
    dispatch(toggleTodo(id)) //optimistic update

    return API.saveTodoToggle(id)
      .catch(() => {
        dispatch(toggleTodo(id)) //if it fails, add todo item back
        alert('An error occurred. Try again.')
    })
  }
}

export function handleDeleteTodo (todo) {
  return (dispatch) => {
    dispatch(removeTodo(todo.id))

    return API.deleteTodo(todo.id)
      .catch(() => {
        dispatch(addTodo(todo))
        alert('An error occurred. Try again.')
      })
    }
}