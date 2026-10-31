import { useState, useEffect } from "react"
import { ToastContainer, toast, Bounce } from 'react-toastify';


function App() {
  // states
  const [title, setTitle] = useState("")
  const [todos, setTodos] = useState(
    localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
  )
  const [editId, setEditId] = useState(null)
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  // functions

  const handleReset = () => {
    setTitle("")
  }

  const handleTodo = (e) => {
    e.preventDefault()

    if (!title.trim()) return

    if (editId) {
      setTodos(todos.map((item) => item.id === editId ? { ...item, title: title } : item))
      toast.warn("Todo edited")
    } else {
      let todo = {
        id: Date.now(),
        title: title,
        isCompleted: false
      }

      setTodos((t) => [todo, ...t])
      setTitle("")
      toast.info("Todo added")
    }



    setTitle("")
    setEditId(null)
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id))
    toast.error("Todo deleted")
  }

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    )
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setTitle(item.title)
  }

  const clearAll = () => {
    setTodos(todos.filter(element => !element.isCompleted))
  }

  const completedAll = () => {
    setTodos(todos.map(element => ({
      ...element,
      isCompleted: true
    })))
  }

  const activeAll = () => {
    setTodos(todos.map(element => ({
      ...element,
      isCompleted: false
    })))
  }

  const onlyCompleted = () => {
    setTodos(todos.filter(element => element.isCompleted))
  }

  const onlyActive = () => {
    setTodos(todos.filter(element => !element.isCompleted))
  }

  // jsx codes

  return (
    // html codes
    <>
      <div className="max-w-150 mx-auto pt-20">
        <h1 className="title font-mono font-bold text-[25px]">Todo List</h1>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className="todo-add">
          <form onSubmit={handleTodo}>
            <input type="text" placeholder="Todo..."
              className="inp font-bold font-mono
            rounded-xl py-2.5 px-5
            mr-0.5 bg-white border-b-4"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <button type="submit"
              className="font-mono font-bold
            py-2.5 px-5 mr-0.5 rounded-xl
          bg-green-600 border-b-4 border-lime-900">{editId ? "Edit Todo" : "Add Todo"}</button>
            <button type="submit"
              className="font-mono font-bold
            py-2.5 px-5 mr-0.5 rounded-xl
          bg-red-600 border-b-4 border-red-900"
              onClick={handleReset}>Reset</button>
          </form>
        </div>
        <div className="list ">
          {
            todos.length > 0 ? todos.map((item) => (
              <div key={item.id}
                className={item.isCompleted ? "flex justify-between mt-5 w-106 line-through text-red-700 bg-green-300 py-3 px-2 rounded-2xl" : "flex justify-between mt-5 w-106 bg-green-600 py-3 px-2 rounded-2xl"}>
                <div className="flex align-middle ">
                  <input type="checkbox" onChange={() => handleToggle(item.id)} />
                  <h4 className="ms-4">{item.title}</h4>
                </div>
                <div className="flex align-middle">
                  <button onClick={() => handleEdit(item)} className="ms-3">✏️</button>
                  <button onClick={() => handleDelete(item.id)} className="ms-3">🗑️</button>
                </div>
              </div>
            )) : <h1>No Todo found</h1>
          }
        </div>
        <button onClick={clearAll} className="py-2.5 px-5 mt-2 rounded-xl mr-1
          bg-red-600 border-b-4 border-red-900">
          Delete all completed
        </button>
        <button onClick={completedAll} className="py-2.5 px-5 mt-2 rounded-xl mr-1
          bg-gray-600 border-b-4 border-gray-900">
          Completed all
        </button>
        <button onClick={activeAll} className="py-2.5 px-5 mt-2 rounded-xl mr-1
          bg-green-600 border-b-4 border-green-900">
          Active all
        </button>
        <button onClick={onlyCompleted} className="py-2.5 px-5 mt-2 rounded-xl mr-100
          bg-blue-800 border-5 border-gray-700">
          Only completed
        </button>
        <button onClick={onlyActive} className="py-2.5 px-5 mt-2 rounded-xl mr-100
          bg-blue-800 border-5 border-green-700">
          Only active
        </button>
      </div>
    </>
  )
}

export default App


