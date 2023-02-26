import {createBrowserRouter, createRoutesFromElements, Route, Router} from "react-router-dom";
import App from "./src/components/App/App";
import Layout from "./src/components/Layout/Layout";
import Tasks from "./src/pages/Tasks/Tasks";

export const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route index element={<App/>}/>
            <Route path={"/tasks"} element={<Tasks/>}/>
        </Route>
    )
);