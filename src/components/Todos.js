import React from 'react'
import { connect } from 'react-redux'

import List from './List'
import {
  handleAddTodo,
  handleToggleTodo,
  handleDeleteTodo,
} from '../actions/todos'

class Todos extends React.Component {
  addItem = (e) => {
    e.preventDefault()

    this.props.dispatch(handleAddTodo(
      this.input.value,
      () => this.input.value = ''
    ))
  }

  removeItem = (todo) => {
    this.props.dispatch(handleDeleteTodo(todo)) //optimistic update
  }

  toggleItem = (id) => {
    this.props.dispatch(handleToggleTodo(id))
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>

        <input
          type="text"
          placeholder="Add Todo"
          ref={(input) => this.input = input} //i can get the input value by calling this.input
        />

        <button onClick={this.addItem}>Add Todo</button>

        <List
          toggle={this.toggleItem}
          items={this.props.todos}
          remove={this.removeItem} />
      </div>
    )
  }
}

export default connect((state) => ({
  todos: state.todos
}))(Todos)