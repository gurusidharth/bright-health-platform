import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const THEME_KEY = "medixcare.theme";

function readTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
}

type UiState = {
  mobileSidebarOpen: boolean;
  theme: "light" | "dark";
};

const initialState: UiState = {
  mobileSidebarOpen: false,
  theme: readTheme(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileSidebarOpen(state, action: PayloadAction<boolean>) {
      state.mobileSidebarOpen = action.payload;
    },
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem(THEME_KEY, action.payload);
        document.documentElement.classList.toggle("dark", action.payload === "dark");
      }
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem(THEME_KEY, state.theme);
        document.documentElement.classList.toggle("dark", state.theme === "dark");
      }
    },
  },
});

export const { setMobileSidebarOpen, setTheme, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
