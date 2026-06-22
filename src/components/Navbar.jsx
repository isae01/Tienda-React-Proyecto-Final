function Navbar({ setView, logout, cartCount }) {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">Tienda React</h2>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setView("products")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Productos
          </button>

          <button
            onClick={() => setView("cart")}
            className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg"
          >
            Carrito ({cartCount})
          </button>

          <button
            onClick={() => setView("orders")}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
          >
            Mis órdenes
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
