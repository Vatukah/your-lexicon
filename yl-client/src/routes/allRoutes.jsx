import { Route, Routes } from 'react-router';
import Home from '../pages/home/home.jsx';

export default  function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}