import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
} from "react-router-dom";
import App from "./components/App";
import Layout from "./components/Layout/Layout";
import Tasks from "./pages/Tasks/Tasks";
import TaskPage from "./pages/TaskPage/TaskPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<App />} />
      <Route path={"/tasks"} element={<Tasks />} />
      <Route path={"/tasks/:id"} element={<TaskPage />} />
    </Route>
  )
);
