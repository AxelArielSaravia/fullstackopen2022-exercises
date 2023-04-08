import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";

import {initializeThunk} from "./thunks.js";

import store from "./store.js";

import App from "./App";

store.dispatch(initializeThunk);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);