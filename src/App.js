import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/main';
import Test from './pages/admin/test';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          
          <Route path='/' element={<Main/>} />
          <Route path='/Test' element={<Test/>} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;