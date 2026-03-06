import { createContext, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
  fetchCurrentUser,
} from "../store/slices/authSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    if (hasCheckedAuth.current) return;

    hasCheckedAuth.current = true;
    const token = localStorage.getItem("token");

    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  const login = async (email, password, role) => {
    const result = await dispatch(
      loginAction({ email, password, role }),
    ).unwrap();
    return result;
  };

  const register = async (userData, role = "citizen") => {
    const result = await dispatch(registerAction({ userData, role })).unwrap();
    return result;
  };

  const logout = async () => {
    hasCheckedAuth.current = false;
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
