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

return (
    <>
      

      <div>
        <input
          name="name"
          value={todo.name}
          onChange={f}
          placeholder="enter name"
        />

        <input
          name="desc"
          value={todo.desc}
          onChange={f}
          placeholder="enter desc"
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
          }}
        >
          {edited === null ? "Add" : "Update"}
        </button>

        <div>
          {todos.map((x) => (
            <div key={x.id}>
              <div>{x.name}</div>
              <div>{x.desc}</div>
              <button onClick={() => handleEdit(x)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );