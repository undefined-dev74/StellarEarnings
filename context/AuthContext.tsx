import { authService } from "@/app/services";
import { apiClient } from "@/app/services/client";
import { User } from "@/interfaces/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import * as Keychain from "react-native-keychain";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthState = { token: string | null; authenticated?: boolean | null; refreshToken: string | null };

export interface AuthProps {
  authState?: AuthState;
  user?: User;
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  getAccessToken?: () => string | null;
  setAuthState?: React.Dispatch<React.SetStateAction<AuthState>>;
}

const TOKEN_KEY = "my-key";
const REFRESH_KEY = "REFRESH_TOKEN";

export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("🚀useAuth must be used within a AuthProvider🚀");
  }
  return authContext;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
    refreshToken: null,
  });
  const [user, setUser] = useState<User>();
  const router = useRouter();
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
      console.log("Stored token🚀:", token);
      if (token) {
        setAuthState({ token, authenticated: true, refreshToken });
      }
    };

    loadToken();
  }, []);

  const { mutateAsync } = useMutation({ mutationFn: authService.login });

  const onLogin = async (email: string, password: string) => {
    try {
      const res = await mutateAsync({ email, password });
      //   store refresh and accessToken
      const accessToken = res.data.tokens.access.token;
      const refreshToken = res.data.tokens.refresh.token;
      //   update the state
      setAuthState({ token: accessToken, authenticated: true, refreshToken });
      setUser(res.data.user);

      //   add Bearer Authorization header
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      //   store refresh and accessToken in local secure storage
      await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);

      return res;
    } catch (error: any) {
      console.log("ERROR LOGIN RESPONSE🚀", error.response.data.message);
    }
  };
  console.log("AUTH STATE, ", SecureStore.getItem(REFRESH_KEY));

  const logout = async () => {
    try {
      setAuthState({ token: null, authenticated: false, refreshToken: null });
      await Keychain.resetGenericPassword();
      // await authService.logout((await SecureStore.getItemAsync(REFRESH_KEY)) as string);

      // delete token from storage
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_KEY);

      // update HTTP Headers
      apiClient.defaults.headers.common["Authorization"] = "";

      // reset the state
      router.push("/");
    } catch (error: any) {
      console.log("ERROR ON LOGOUT 🚀", error.response.data.message);
    }
  };

  const getAccessToken = () => {
    return authState.token;
  };

  const value = {
    onLogin,
    logout,
    onLogout: logout,
    authState,
    user,
    getAccessToken,
    setAuthState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
