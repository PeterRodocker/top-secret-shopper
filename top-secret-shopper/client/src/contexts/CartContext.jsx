import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext({})
CartContext.displayName = 'CartContext'

export const CartProvider = ({ storageKey, children }) => {
  const [cart, setCart] = useLocalStorage(storageKey);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext

