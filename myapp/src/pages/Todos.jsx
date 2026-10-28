
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
function Todos() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ name: "", desc: "" });
  const [edited, setEdited] = useState(null);

  const f = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setTodo({
      name: user.name,
      desc: user.desc,
    });
    setEdited(user.id);
  };
 
  const handleDelete=(user)=>{
   setTodos(todos.filter((xx)=>xx.id!==user.id))

  }

  
  return (
    <div className=' mx-auto flex h-[60vh] w-[80vw] flex-col  items-center bg-fuchsia-200 my-5'>
      <div className=' flex gap-2'>
        <input
          name="name"
          value={todo.name}
          onChange={f}
          placeholder="enter name"
          className="border border-gray-300 rounded-md p-2 bg-white focus:border-blue-500 outline-none"

        />

        <input
          name="desc"
          value={todo.desc}
          onChange={f}
          placeholder="enter desc"
          className="border border-gray-300 rounded-md p-2 bg-white focus:border-blue-500 outline-none"
        />

        <button
          onClick={() => {
            if (edited === null) {
              setTodos([...todos, { ...todo, id: Date.now() }]);
            } else {
              setTodos(
                todos.map((xx) =>
                  xx.id === edited ? { ...xx, ...todo } : xx
                )
              );
              setEdited(null);
            }

            setTodo({ name: "", desc: "" });
          }} className="rounded-lg bg-blue-100 px-5 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-black"
        >
          {edited === null ? "Add" : "Update"}
        </button>
      </div>
      <div className='w-full'>
         <div className="grid grid-cols-[1fr_2fr_1fr] items-center justify-center gap-4 p-3 font-semibold bg-gray-100 border-b-2 border-gray-300">
        <div>Name</div>
        <div className='whitespace-normal break-words'> Description</div>
        <div>Action</div>
      </div>

      <div>
        {todos.map((x) => (
          <div key={x.id} className='grid grid-cols-[1fr_2fr_1fr] items-center  justify-center gap-4 p-3 font-semibold bg-gray-100 border-b-2 border-gray-300'>
            <div>{x.name}</div>
            <div>{x.desc}</div>
            <div>
               <button onClick={() => handleEdit(x)}>Edit</button>
            <button onClick={()=>handleDelete(x)}>Delete</button>
            </div>
           
          </div>
        ))}
      </div>
      </div>
     

      {/*
       <button onClick={() => navigate("/todos/addTodo")}>
        Add Todo
      </button>
       <nav>
        
        <NavLink to="/todos/addTodo">add todo</NavLink>
         
      </nav>
       <nav>
        
        <NavLink to="/todos/ex">Exxxx</NavLink>
         
      </nav>*/}
      <Outlet />

    </div>
  )
}

export default Todos