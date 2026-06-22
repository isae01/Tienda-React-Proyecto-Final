import { useState } from "react";

function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={product.imagen}
        alt={product.nombre}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-800">{product.nombre}</h3>

        <p className="text-blue-600 font-bold text-lg mt-2">
          Q{product.precio}
        </p>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Cantidad
          </label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => addToCart(product, quantity)}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
