import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Tasks from "./pages/Tasks";
import TaskPage from "./pages/TaskPage";
import RegPage from "./pages/RegPage";
import LogPage from "./pages/LogPage";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Main from "./pages/Main";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Main />} />
      <Route path={"/tasks"} element={<Tasks />} />
      <Route path={"/tasks/:id"} element={<TaskPage />} />
      <Route path={"/register"} element={<RegPage />} />
      <Route path={"/auth"} element={<LogPage />} />
      <Route path={"/profile/me"} element={<Profile />} />
      <Route path={"/leaderboard/:id"} element={<Leaderboard />} />
    </Route>
  )
);
