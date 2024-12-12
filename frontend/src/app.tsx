import "@/global.css";

import { ToastContainer } from "react-toastify";

import { Router } from "@/routes/sections";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { ThemeProvider } from "@/theme/theme-provider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import "react-toastify/dist/ReactToastify.css";
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router />
        <ToastContainer closeOnClick autoClose={3000} />
      </ThemeProvider>
    </Provider>
  );
}
