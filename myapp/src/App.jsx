import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Xc from "./pages/Xc";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Todos from "./pages/Todos";
import AddTodo from "./pages/AddTodo";
import Ex from "./pages/Ex";
import PasswordManager from "./pages/PasswordManager";
function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
       <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
         <Route path="pm" element={<PasswordManager />} />
        <Route path="contact" element={<Contact />} />
        <Route path="todos" element={<Todos />}>

          <Route path="addTodo" element={<AddTodo />} />
        </Route>
        <Route path="todos/ex" element={<Ex />}> </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/xxx" element={<Xc />}> 

      </Route>
      </>
     
   
    )
  );


  return <RouterProvider router={router} />;
}

export default App;
