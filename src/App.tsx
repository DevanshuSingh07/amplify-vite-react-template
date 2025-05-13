import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';


  
 


function App() {
  const[val, setval]=useState("")

  const client = generateClient<Schema>();

   function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

   const welcome=async ()=>{
        try {
      console.log("Calling myFirstFunction...");
      const result = await client.queries.myFirstFunction({
        name: "devanshu",
      });

      console.log("GraphQL Query Result:", result);

      // Check if data exists and is of the expected type (string in this case)
      // Assuming myFirstFunction returns a string based on previous context
      if (result.data !== undefined && typeof result.data === 'string') {


         setval(
          result.data
         ); // Store the received data in the 'val' state
         console.log("Data received:", result.data);
      } else if (result.data !== undefined) {
         // Handle cases where data is present but not a string if necessary
         console.warn("Data received is not a string:", result.data);
         setval(JSON.stringify(result.data)); // Convert non-string data to string for display
      }


      if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
      }
    } catch (error) {
      // Catch network errors or other exceptions during the request
      console.error("Error calling myFirstFunction:", error);
      setval("Error fetching data."); // Indicate error in UI
    }
    }

  const { signOut,user } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  const message= `<h1>Hello ${user.username}!</h1>`
  function gethello(){
  
  }

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    welcome()
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
       <div style={{}} dangerouslySetInnerHTML={{__html:message}} onClick={gethello}>{}</div>   
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
        
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
