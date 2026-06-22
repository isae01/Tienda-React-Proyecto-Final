import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

function Orders({ userId }) {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const ordersRef = collection(db, "ordenes");

    const q = query(ordersRef, where("usuarioId", "==", userId));

    const result = await getDocs(q);

    const ordersList = result.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      productos: JSON.parse(doc.data().productos),
    }));

    setOrders(ordersList);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Mis órdenes</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <p className="text-slate-500 text-lg">No tiene órdenes ingresadas.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {orders.map((order, index) => {
            const total = order.productos.reduce((sum, item) => {
              return sum + item.precio * item.cantidad;
            }, 0);

            return (
              <div
                className="bg-white rounded-2xl shadow-lg p-6"
                key={order.id}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Orden #{index + 1}
                  </h2>

                  <p className="text-slate-500 text-sm">ID: {order.id}</p>
                </div>

                <div className="grid gap-4">
                  {order.productos.map((product) => (
                    <div
                      className="flex flex-col md:flex-row gap-4 border border-slate-200 rounded-xl p-4"
                      key={product.id}
                    >
                      <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                      />

                      <div>
                        <h3 className="text-xl font-bold text-slate-800">
                          {product.nombre}
                        </h3>

                        <p className="text-slate-600">
                          Precio: Q{product.precio}
                        </p>

                        <p className="text-slate-600">
                          Cantidad: {product.cantidad}
                        </p>

                        <p className="text-blue-600 font-bold">
                          Subtotal: Q{product.precio * product.cantidad}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-emerald-600 mt-6">
                  Total de la orden: Q{total}
                </h3>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Orders;
