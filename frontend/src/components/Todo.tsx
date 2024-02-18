export type SingleTodo = {
  id: number;
  title: string;
  description: string;
  getAllTodos: () => void;
};

const Todo = ({ id, title, description, getAllTodos }: SingleTodo) => {

  const editTodo = async () => {
    const newTitle=prompt('Enter new title', title);
    const newDescription=prompt('Enter new description', description);
    if(!newTitle || !newDescription){
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        getAllTodos();
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };
  const deleteTodo = async () => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        getAllTodos();
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button style={{ backgroundColor: "red" }} onClick={() => deleteTodo()}>
        Delete
      </button>
      <button style={{ backgroundColor: "yellow" }} onClick={() => editTodo()}>
        Edit
      </button>
    </div>
  );
};

export default Todo;
