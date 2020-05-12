import React, { Component } from 'react';
// mira por aquí
/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: '',
      error: '' // ACA LE AGREGUÉ EL ESTADO DEL ERROR vacio
    }
  }
  updateTask = (event) => {
    this.setState({
      newTask: event.target.value
    });
  }
  addTask = (event) => {
    if (this.state.newTask !== '') {

      event.preventDefault();

      const lastID = this.state.tasks[this.state.tasks.length -1].id

      const obj = {'id': lastID+ 1 , 'name': this.state.newTask, 'done': false}

      this.setState((prevState) => ({
        tasks: prevState.tasks.concat(obj),
        newTask:'',
        error: ''
      }));

    } else {

      event.preventDefault();

      this.setState(() => ({
        error: 'error' // si cuando tocan enter está vacío, le cambia el estado a error
      }));
    }
  }

  handleClick = (index) => {
    let modifiedTasks = this.state.tasks.map((val, i) => {
      if (i === index) {
        val.done = !val.done;
      }
      return val;
    })
    console.log(this.state.newTask)
    this.setState({
      tasks: modifiedTasks
    });
  };
  
  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => 
            <li className={task.done? "done" : ""} onClick={() => this.handleClick(index)}  key={task.id}>{task.name}</li>)}
          </ul>
          <form onSubmit={this.addTask}>
            <input type="text" 
                   id="new-task"  
                   value={this.state.newTask}
                   onChange={this.updateTask}
                   placeholder="Ingresa una tarea y oprime Enter"
                   className= {this.state.error} // y acá le agrega al className lo que tenga error
                  />
          </form>
        </div>
      </div>
    )
  }
}

export default App;
