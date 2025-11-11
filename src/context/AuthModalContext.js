import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8080/api/user/userdetails",
          { withCredentials: true }
        );
        setUser(result.data || null);
      } catch (error) {
        console.log("❌ Not logged in");
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthModalContext.Provider value={{ user, setUser, loadingUser, activePage, setActivePage }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);
