import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/main';
import VenderDashboard from './pages/vender/venderDashboard';
import VenderProductList from './pages/vender/VenderProductList';
import VenderProduct from './pages/vender/VenderProduct';
import ProductDescriptionEditor from './pages/vender/ProductDescriptionEditor';
import UserCakeDetail from './pages/main/UserCakeDetail';

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
          <Route path='/main/cakedetail' element={<UserCakeDetail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;