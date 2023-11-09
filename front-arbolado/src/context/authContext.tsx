import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  FC,
  useContext,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  sendPasswordResetEmail,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useShowErrorAndLogout } from "../hooks/useShowErrorAndLogout";
import { UserCity } from "../types/User";

type AuthContextType = {
  user?: User;
  userCity?: UserCity;
  signup: (email: string, password: string) => Promise<UserCredential>;
  passwordReset: (email: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<Partial<AuthContextType>>({});

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [userCity, setUserCity] = useState<UserCity>();
  const [loading, setLoading] = useState<boolean>(true);
  const { showErrorAndLogout } = useShowErrorAndLogout();

  const signup = (email: string, password: string): Promise<UserCredential> =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const passwordReset = (email: string) => sendPasswordResetEmail(auth, email);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser === null ? undefined : currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const init = async () => {
      const uid = user?.uid;
      try {
        if (uid) {
          const url = `${process.env.REACT_APP_BASE_URL}/user`;
          const response = await axios.get(url, {
            params: {
              uid,
            },
          });
          setUserCity(response.data.data);
        }
      } catch (error) {
        showErrorAndLogout();
      }
    };

    init();
  }, [user]);

  if (!AuthContext) return null;

  return (
    <AuthContext.Provider
      value={{ signup, login, user, logout, loading, userCity, passwordReset }}
    >
      {children}
    </AuthContext.Provider>
  );
};
