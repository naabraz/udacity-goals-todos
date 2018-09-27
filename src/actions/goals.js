import API from 'goals-todos-api'

export const ADD_GOAL = 'ADD_GOAL'
export const REMOVE_GOAL = 'REMOVE_GOAL'
export const TOGGLE_GOAL = 'TOGGLE_GOAL'

function addGoal (goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}

function removeGoal (id) {
  return {
    type: REMOVE_GOAL,
    id,
  }
}

//async action
export function handleAddGoal (name, cb) {
  return (dispatch) => {
    return API.saveGoal(name)
      .then((goal) => {
        dispatch(addGoalAction(goal)),
        cb()
      })
      .catch(() => alert('There was an error. Try again.'))
  }
}

export function handleDeleteGoal (goal) {
  return (dispatch) => {
    dispatch(removeGoal(goal.id)) //optimistic update

    return API.deleteGoal(goal.id)
      .catch(() => {
        dispatch(addGoal(goal)) //if it fails, add goal item back
        alert('An error occurred. Try again.')
    })
  }
}