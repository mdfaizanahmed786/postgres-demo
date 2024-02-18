import Todo, { SingleTodo } from "./Todo";

type TodosProps = {
  todos: SingleTodo[];
  getAllTodos: () => void;  
};
const Todos = ({ todos, getAllTodos }: TodosProps) => {

  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          getAllTodos={getAllTodos}

        />
      ))}
    </div>
  );
};

export default Todos;
