import { createContext, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction, register as registerAction, logout as logoutAction, fetchCurrentUser } from "../store/slices/authSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const login = async (email, password, role) => {
    const result = await dispatch(loginAction({ email, password, role }));
    if (loginAction.fulfilled.match(result)) {
      return result.payload;
    }
    throw new Error(result.payload || 'Login failed');
  };

  const register = async (userData, role = "citizen") => {
    const result = await dispatch(registerAction({ userData, role }));
    if (registerAction.fulfilled.match(result)) {
      return result.payload;
    }
    throw new Error(result.payload || 'Registration failed');
  };

  const logout = async () => {
    await dispatch(logoutAction());
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
