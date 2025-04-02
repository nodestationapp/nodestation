import { Route, Routes } from "react-router-dom";

import MediaIndex from "./media.jsx";

const Dashboard = () => {
  return (
    <Routes>
      <Route index element={<MediaIndex />} />
    </Routes>
  );
};

export default Dashboard;
