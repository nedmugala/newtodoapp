import './bootstrap-5.3.3/dist/css/bootstrap.min.css';
import { useState,useEffect} from 'react';
import axios from 'axios';
import Note from './Note.jsx';



function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('Enter new task here');
  const [newTaskTitle, setNewTaskTitle] = useState('Note Name');
  const [important, setImportant] = useState(false);
  
  

  const notesToShow = important ? tasks.filter(note => note.important) : tasks;

  useEffect(() => {
    axios.get(`/notes`)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  //DELETING A NOTE
  const handleDelete=(id) => {
    axios.delete(`/notes/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };
  // update note
  function updatedNote(id, updatedData) {
    axios.put(`/edit/notes/${id}`, updatedData)
      .then(response => {
        setTasks(tasks.map(task => task.id === id ? response.data : task));
      })
      .catch(error => console.error('Error updating note:', error));
  }
  //TOGGLING IMPORTANCE
  const toggleImportance =(note)=> {
    const updatedNote = { ...note, important: !note.important };
    axios.put(`/notes/${note.id}`, updatedNote)
      .then(response => {
        setTasks(tasks.map(task => task.id === note.id ? response.data : task));
      })
      .catch(error => console.error('Error toggling importance:', error));
  };

  //MARKING COMPLETE
  function markComplete (note){
    const updatedNote = {...note, complete : !note.complete}
    axios.put(`/notes/${note.id}`, updatedNote)
    .then(response=>{
       setTasks(tasks.map((item)=>{
        
      return item.id === note.id? response.data: item
       }) )
  })
  }
  
  const handleChange=(e) => { setNewTask(e.target.value); };

  const handleTitleChange=(e) => { setNewTaskTitle(e.target.value); };

  //ADDING A NEW NOTE
  const handleSubmit=(e) => { 
    e.preventDefault()
    const newOBJ = {
      id: Date.now(),
      title: newTaskTitle!==" "? newTaskTitle : "Note "+ (tasks.length + 1),
      content: newTask,
      important : true
    }
    axios.post(`/notes`, newOBJ)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask('');
      })
      .catch(error => console.error('Error adding task:', error));

  };

  return (
  <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">To-Do App</a>
          <a className="nav-link" href="#">Home</a>
          <a className="nav-link" href="#">Menu</a>
          <a className="nav-link" href="#">Edit</a>
          <a className="nav-link nav-item" href="#">About Me</a>
        </div>
      </nav>

      <h1 className="text-center text-primary mb-3">
  MY TO-DO APP
</h1>
<p className="text-center">
  Streamline your productivity with our intuitive to-do app. Organize tasks, set reminders, and boost your efficiency effortlessly. 
  Stay on top of your schedule and achieve your goals with ease. 
  Try it now and experience the difference!
</p>
<hr />
{/* Add Bootstrap to the form */}
<form className="row g-3" onSubmit={handleSubmit}>
  <div className="col-md-6">
    <input 
      type="text" 
      className="form-control" 
      placeholder="Task Title" 
      value={newTaskTitle} 
      onChange={handleTitleChange} 
    />
  </div>
  <div className="col-md-6">
    <input 
      type="text" 
      className="form-control" 
      placeholder="Task Description" 
      value={newTask} 
      onChange={handleChange} 
    />
  </div>
  <div className="col-12">
    <button className="btn btn-primary">
      Add Note
    </button>
  </div>
  <div className="col-12">
    <button type='button' onClick={()=>setImportant(!important)} className='btn btn-outline-primary'>
      Show {important ? 'All' : 'Important'} Notes
    </button>
  </div>
</form>

<hr />
<div className="mt-4">
  <h2 className="text-secondary">Your Tasks</h2>
  {tasks.length === 0 ? (
    <p>No tasks yet! Start by adding a new task.</p>
  ) : (
    <ul className="list-group">
      {notesToShow.map((task, i) => (
        
          <Note count={i}
          key={task.id}
          deleteNote={handleDelete} updateNote={updatedNote}
           toggleImportance={toggleImportance}
            note={task} className="list-group item"
            markComplete = {markComplete}
            />
        
      ))}
    </ul>
  )}
  </div>
</div>
  )}

export default App; 