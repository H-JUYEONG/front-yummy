import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/main';
import VenderProductList from './pages/vender/VenderProductList';
import VenderOption from './pages/vender/VenderOption';
import VenderProductRegistrationForm from './pages/vender/VenderProductRegistrationForm';
import VenderStatistics from './pages/vender/VenderStatistics';
import ProductDescriptionEditor from './pages/vender/ProductDescriptionEditor';

import AdminTest from './pages/admin/AdminTest';
// user
import UserMain from './pages/user/include/UserMain';
import UserLoginForm from './pages/user/userLoginForm';
import VenderDashboard from './pages/vender/VenderDashboard';
import UserSidebar from './pages/user/include/UserSidebar';
import UserCakeDetail from './pages/user/UserCakeDetail';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/vender/dashboard' element={<VenderDashboard/>} />
          <Route path='/vender/productlist' element={<VenderProductList/>} />
          <Route path='/vender/option' element={<VenderOption/>} />
          <Route path='/vender/registrationform' element={<VenderProductRegistrationForm/>} />
          <Route path='/ProductDescriptionEditor' element={<ProductDescriptionEditor/>} />

          <Route path='/user/cakedetail' element={<UserCakeDetail/>}/>
          <Route path='/admintest' element={<AdminTest/>} />
          <Route path='/vender/statistics' element={<VenderStatistics/>} />
          <Route path='/user/login' element={<UserLoginForm/>} />
          <Route path='/user/sidebar' element={<UserSidebar/>}/>
          <Route path='/user/main' element={<UserMain/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;