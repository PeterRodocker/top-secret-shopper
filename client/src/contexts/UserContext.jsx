import { createContext } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage";

const UserContext = createContext({})
UserContext.displayName = 'UserContext'

export const UserProvider = ({ storageKey, children }) => {
  const [user, setUser] = useLocalStorage(storageKey);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext