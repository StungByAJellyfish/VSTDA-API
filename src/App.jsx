import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('1');

  const addTodoItem = () => {
    const todoItem = { description, priority, priorityClass: '' , editing: false, editDescription: description, editPriority: priority};
    if (priority === '1') {
      todoItem.priority = 'priority-high';
      todoItem.priorityClass = 'bg-danger-subtle';
    } else if (priority === '2') {
      todoItem.priority = 'priority-medium';
      todoItem.priorityClass = 'bg-warning-subtle';
    } else {
      todoItem.priority = 'priority-low';
      todoItem.priorityClass = 'bg-success-subtle';
    };
    setTodoItems([...todoItems, todoItem]);

    setDescription('');
    setPriority('1');
  };

  return (
    <div>
      <h1>Very Simple Todo App</h1>
      <p>Track all of the things</p>
      <hr />
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Add New Todo</div>
            <div className="card-body">
              <label htmlFor="create-todo-text" className="p-1">I want to...</label>
              <textarea id="create-todo-text" data-testid="create-todo-text" className="form-control" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}/>
              <label htmlFor="create-todo-priority" className="p-1">How much of a priority is this?</label>
              <select id="create-todo-priority" data-testid="create-todo-priority" className="form-control" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="1">High Priority</option>
                <option value="2">Medium Priority</option>
                <option value="3">Low Priority</option>
              </select>
              <button data-testid="create-todo" className="btn btn-primary mt-3" onClick={addTodoItem}>Add</button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">View Todos</div>
            <div className="card-body">
              <div>
                {todoItems.length === 0 ? (
                  <div className="bg-info-subtle p-2 mb-2">
                    <h4>Welcome to the Very Simple Todo App!</h4>
                    <p>To get started, add a new task in the form on the left.</p>
                  </div>
                ) : (
                  todoItems.map((task, index) => (
                    <div key={index} data-testid="todo-item" className={`${task.priority} ${task.priorityClass} p-1 mb-2`}>
                      {task.editing ? (
                        <>
                          <label className="p-1">Description</label>
                          <textarea id="update-todo-text" data-testid="update-todo-text" className="form-control" value={task.editDescription} onChange={(e) => {
                            const updatedTodoItems = [...todoItems];
                            updatedTodoItems[index].editDescription = e.target.value;
                            setTodoItems(updatedTodoItems);
                          }}/>
                          <label className="p-1">Priority</label>
                          <select id="update-todo-priority" data-testid="update-todo-priority" className="form-control" value={task.editPriority} onChange={(e) => {
                            const updatedTodoItems = [...todoItems];
                            updatedTodoItems[index].editPriority = e.target.value;
                            setTodoItems(updatedTodoItems);
                          }}>
                            <option value="1">High Priority</option>
                            <option value="2">Medium Priority</option>
                            <option value="3">Low Priority</option>
                          </select>
                          <button data-testid="update-todo" className="btn btn-primary mt-3" onClick={() => {
                            const updatedTodoItems = [...todoItems];
                            const todoItem = updatedTodoItems[index];
                            todoItem.description = todoItem.editDescription;
                            if (todoItem.editPriority === '1') {
                              todoItem.priority = 'priority-high';
                              todoItem.priorityClass = 'bg-danger-subtle';
                            } else if (todoItem.editPriority === '2') {
                              todoItem.priority = 'priority-medium';
                              todoItem.priorityClass = 'bg-warning-subtle';
                            } else {
                              todoItem.priority = 'priority-low';
                              todoItem.priorityClass = 'bg-success-subtle';
                            };
                            updatedTodoItems[index].editing = false;
                            setTodoItems(updatedTodoItems);
                          }}>Save</button>
                        </>
                        ) : (
                          <div className="d-flex justify-content-between align-items-start">
                            <p>{task.description}</p>
                            <div className="d-flex align-items-start">
                              <a data-testid="edit-todo" className="float-end m-2" href="#" onClick={() => {
                                const newTodoItems = [...todoItems];
                                newTodoItems[index].editing = true;
                                setTodoItems(newTodoItems);
                                }}><i className="bi bi-pencil-square"></i></a>
                              <a data-testid="delete-todo" className="float-end m-2" href="#" onClick={() => {
                                const newTodoItems = [...todoItems];
                                newTodoItems.splice(index, 1);
                                setTodoItems(newTodoItems);
                                }}><i className="bi bi-trash"></i>
                              </a>
                            </div>
                          </div>
                        )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
