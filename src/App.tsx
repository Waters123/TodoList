import { TodoList } from "./components/todoComponent";
import { TodoListProvider } from "./providers/TodoListcontext";
import "./App.css";

function App() {
  return (
    <div className="container">
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>
    </div>
  );
}

export default App;
