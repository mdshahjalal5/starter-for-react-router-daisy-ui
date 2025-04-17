import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header></Header>
      <div className="min--[40vh] max-w-7xl mx-auto mb-10">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </>
  );
}
