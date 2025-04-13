import { createContext,useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState([]);
  const value={navigate,setUser,user,isSeller,setIsSeller};
  const navigate = useNavigate();
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
export const useAppContext = () => {
  return useContext(AppContext);
};