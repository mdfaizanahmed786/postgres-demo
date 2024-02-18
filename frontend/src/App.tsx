import React, { useCallback, useEffect, useState } from 'react';
import Todos from './components/Todos';
import { SingleTodo } from './components/Todo';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [todos, setTodos] = useState([] as SingleTodo[]); 

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

  try {
    const response=await fetch('http://localhost:4000/add',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        title:input1,
        description:input2
      })
    })
    const data=await response.json();
    console.log(data)
    if(data.success){
      setInput1('');
      setInput2('');
      getAllTodos();
    }

    
  } catch (error:unknown) {
    console.log(error)
  }
     

  };


  const getAllTodos=useCallback(async ()=>{
    const response=await fetch('http://localhost:4000/todos')
    const data=await response.json();
    
    console.log(data)
    setTodos(data.todos)
  }, []
  )


  useEffect(()=>{
    getAllTodos();
  },[])

  return (
    <div>
      <h1>Welcome to your todos app!</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
        <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
        <button type="submit" style={{ backgroundColor: 'green' }}>Submit</button>
      </form>

      <Todos todos={todos} getAllTodos={getAllTodos}/>
    </div>
  );
}

export default App;
