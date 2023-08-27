import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import CartItems from './CartItems';
import Cart from './Cart';
import Home from './Home';
import { DataProvider } from './context/DataContext';
import Company from './Company';
import PreviewPage from './PreviewPage';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='company' element={<Company />}></Route>
          <Route path='previewpage' element={<PreviewPage />}></Route>
          <Route path='cartdes' element={<CartItems />}></Route>
          <Route path='cart' element={<Cart />}></Route>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
