import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./lib/store.ts";
import { Suspense } from "react";
import { OrbitProgress } from "react-loading-indicators";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense
          fallback={
            <div className="mx-auto border grid place-items-center bg-black min-h-screen">
              <OrbitProgress
                color="#32cd32"
                size="medium"
                text=""
                textColor=""
              />
            </div>
          }
        >
          <App />
        </Suspense>
      </Provider>
    </BrowserRouter>
  </QueryClientProvider>
);
