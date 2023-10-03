import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ProductContext = createContext({})
ProductContext.displayName = 'ProductContext'

export const ProductProvider = ({ storageKey, children }) => {
  const [products, setProducts] = useLocalStorage(storageKey);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext

