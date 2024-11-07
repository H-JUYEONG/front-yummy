import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/main';
import VenderProductList from './pages/vender/VenderProductList';

import ProductDescriptionEditor from './pages/vender/ProductDescriptionEditor';
import VenderDashboard from './pages/vender/venderDashboard';
import VenderOption from './pages/vender/VenderOption';
import VenderProductRegistrationForm from './pages/vender/VenderProductRegistrationForm';
import VenderStatistics from './pages/vender/VenderStatistics';

import UserCakeDetail from './pages/main/UserCakeDetail';
import AdminTest from './pages/admin/AdminTest';

// user
import UserLoginForm from './pages/user/userLoginForm';
import UserSignUpForm from './pages/user/UserSignUpForm';
import UserSignUpSuccess from './pages/user/UserSignUpSuccess';
import VenderSignUpSuccess from './pages/user/VenderSignUpSuccess';
// user jeff userPersonalInfoEdit
import UserPersonalInfoEdit from './pages/user/userPersonalInfoEdit';

//board
import DebateInsert from './pages/board/DebateInsert'
import DebateList from './pages/board/DebateList'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/vender/dashboard' element={<VenderDashboard />} />
          <Route path='/vender/productlist' element={<VenderProductList />} />
          <Route path='/vender/option' element={<VenderOption />} />
          <Route path='/vender/registrationform' element={<VenderProductRegistrationForm />} />
          <Route path='/ProductDescriptionEditor' element={<ProductDescriptionEditor />} />


          <Route path='/login' element={<UserLoginForm />} />
          <Route path='/user/signup' element={<UserSignUpForm />} />
          <Route path='/user/signup/succ' element={<UserSignUpSuccess />} />
          <Route path='/vender/signup/succ' element={<VenderSignUpSuccess />} />


          <Route path='/main/cakedetail' element={<UserCakeDetail />} />
          <Route path='/admintest' element={<AdminTest />} />
          <Route path='/vender/statistics' element={<VenderStatistics />} />
          <Route path='/user/login' element={<UserLoginForm />} />

          {/* user - jeff */}
          <Route path='/user/userpersonalinfoedit' element={<UserPersonalInfoEdit/>} />

          {/*board*/}
          <Route path='/board' element={<DebateList/>} />
          Route path='/debateinsert' element={<DebateInsert/>} 

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;