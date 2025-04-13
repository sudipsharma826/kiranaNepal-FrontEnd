import { createContext,useContext ,useState} from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const {showUserLogin ,setShowUserlogin} = useState(false);
  const value= {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserlogin,
  };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
export const useAppContext = () => {
  return useContext(AppContext);
};