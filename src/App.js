import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/main';
import VenderProductList from './pages/vender/VenderProductList';
import VenderProduct from './pages/vender/VenderProduct';
import VenderStatistics from './pages/vender/VenderStatistics';
import ProductDescriptionEditor from './pages/vender/ProductDescriptionEditor';
import userMyPageEdit_jeff from './pages/user/userMyPageEdit_jeff';

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

          <Route path='/userMyPageEdit_jeff' element={<userMyPageEdit_jeff/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;