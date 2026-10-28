import { NavLink, Outlet } from "react-router-dom";
import Footer from "../pages/Footer";

const RootLayout = () => {
  
  return (
    <>
      <nav className="flex justify-center text-white bg-gray-800 gap-5" >
      
         <NavLink to="/" className="my-1 cursor-pointer hover:font-bold transition-all duration-500">Home</NavLink>
          <NavLink to="/about" className="my-1 cursor-pointer hover:font-bold transition-all duration-500">About</NavLink>
          <NavLink to="/contact" className="my-1 cursor-pointer hover:font-bold transition-all duration-500">Contact</NavLink>
          <NavLink to="/todos" className="my-1 cursor-pointer hover:font-bold transition-all duration-500">Todos</NavLink>
         <NavLink to="/pm" className="my-1 cursor-pointer hover:font-bold transition-all duration-500">Password Manager</NavLink>
        


      </nav>

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
