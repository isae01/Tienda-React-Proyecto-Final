function CartItem({ item, removeProduct }) {
  const subtotal = item.precio * item.cantidad;

  return (
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row gap-5">
      <img
        src={item.imagen}
        alt={item.nombre}
        className="w-full md:w-40 h-40 object-cover rounded-xl"
      />

      <div className="flex-1">
        <h3 className="text-2xl font-bold text-slate-800">{item.nombre}</h3>

        <p className="text-slate-600 mt-2">Precio: Q{item.precio}</p>
        <p className="text-slate-600">Cantidad: {item.cantidad}</p>

        <p className="text-blue-600 font-bold mt-2">Subtotal: Q{subtotal}</p>

        <button
          onClick={() => removeProduct(item.id)}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CartItem;
