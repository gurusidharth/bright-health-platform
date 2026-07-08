import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type DemoUser = {
  email: string;
  name: string;
  role: string;
  organization: string;
};

const KEY = "medixcare.demo.auth";

export const DEMO_CREDENTIALS = {
  email: "demo@medixcare.ai",
  password: "demo1234",
};

const DEMO_USER: DemoUser = {
  email: DEMO_CREDENTIALS.email,
  name: "Dr. Amelia Hart",
  role: "Clinical Lead",
  organization: "Riverside Care Group",
};

type AuthContextValue = {
  user: DemoUser | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  function login(email: string, password: string) {
    if (
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    ) {
      localStorage.setItem(KEY, JSON.stringify(DEMO_USER));
      setUser(DEMO_USER);
      return { ok: true as const };
    }
    return { ok: false as const, error: "Invalid email or password. Try the demo credentials below." };
  }

  function logout() {
    localStorage.removeItem(KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}