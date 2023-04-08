import ReactDOM from "react-dom/client";
import {QueryClient, QueryClientProvider} from "react-query";

import App from "./App";

const QC = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <QueryClientProvider client={QC}>
        <App/>
    </QueryClientProvider>
);