import { Route, Routes } from 'react-router';
import EmailRedirect from '../pages/redirects/emailRedirect.jsx';
import Home from '../pages/home/home.jsx';
import SearchPage from '../pages/search/searchPage.jsx';
import MainLayout from '../components/layouts/mainLayout.jsx';

export default  function AllRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/email-redirect" element={<EmailRedirect />} />
        <Route path="/search/:word" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}