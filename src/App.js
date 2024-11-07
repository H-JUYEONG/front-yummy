import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/main';
import VenderProductList from './pages/vender/VenderProductList';
import VenderProduct from './pages/vender/VenderProduct';
import ProductDescriptionEditor from './pages/vender/ProductDescriptionEditor';

import VenderDashboard from './pages/vender/venderDashboard';

// user
import UserLoginForm from './pages/user/userLoginForm';
import UserSignUpForm from './pages/user/UserSignUpForm';
import UserSignUpSuccess from './pages/user/UserSignUpSuccess';
import VenderSignUpSuccess from './pages/user/VenderSignUpSuccess';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Main/>} />
          <Route path='/vender/dashboard' element={<VenderDashboard/>} />
          <Route path='/vender/productlist' element={<VenderProductList/>} />
          <Route path='/vender/product' element={<VenderProduct/>} />
          <Route path='/ProductDescriptionEditor' element={<ProductDescriptionEditor/>} />

          <Route path='/login' element={<UserLoginForm/>} />
          <Route path='/user/signup' element={<UserSignUpForm/>} />
          <Route path='/user/signup/succ' element={<UserSignUpSuccess/>} />
          <Route path='/vender/signup/succ' element={<VenderSignUpSuccess/>} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;