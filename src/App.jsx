import { useState } from "react";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [view, setView] = useState(userId ? "products" : "login");
  const [cart, setCart] = useState([]);

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    setCart([]);
    setView("login");
  };

  if (!userId) {
    return <Login setUserId={setUserId} setView={setView} />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar setView={setView} logout={logout} cartCount={cart.length} />

      {view === "products" && <Products cart={cart} setCart={setCart} />}

      {view === "cart" && (
        <Cart cart={cart} setCart={setCart} userId={userId} />
      )}

      {view === "orders" && <Orders userId={userId} />}
    </div>
  );
}

export default App;
