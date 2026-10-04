import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const verifyResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/verify`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        const verifyResponseData = await verifyResponse.json();
        if (verifyResponse.ok) {
          console.log(verifyResponseData.message);
          setUser(verifyResponseData.message);
        }
      } catch (error) {
        console.log("Session Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
