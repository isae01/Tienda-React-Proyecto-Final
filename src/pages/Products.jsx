import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const productsRef = collection(db, "productos");
    const result = await getDocs(productsRef);

    const productsList = result.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(productsList);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = (product, quantity) => {
    if (quantity <= 0) {
      alert("La cantidad debe ser mayor a 0");
      return;
    }

    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      const newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, cantidad: item.cantidad + quantity }
          : item,
      );

      setCart(newCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          cantidad: quantity,
        },
      ]);
    }

    alert("Producto agregado al carrito");
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Catálogo de productos
        </h1>
        <p className="text-slate-500 mt-2">
          Productos cargados desde Firestore.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-slate-600">No hay productos registrados.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;
