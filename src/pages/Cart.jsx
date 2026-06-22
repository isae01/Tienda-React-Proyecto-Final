import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import CartItem from "../components/CartItem";

function Cart({ cart, setCart, userId }) {
  const total = cart.reduce((sum, item) => {
    return sum + item.precio * item.cantidad;
  }, 0);

  const removeProduct = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const createOrder = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    await addDoc(collection(db, "ordenes"), {
      usuarioId: userId,
      productos: JSON.stringify(cart),
      fecha: new Date().toISOString(),
    });

    alert("Orden ingresada correctamente");
    setCart([]);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Carrito de compras
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <p className="text-slate-500 text-lg">
            No hay productos en el carrito.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} removeProduct={removeProduct} />
          ))}

          <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-800">
              Total general: Q{total}
            </h2>

            <button
              onClick={createOrder}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl"
            >
              Ingresar orden
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;
