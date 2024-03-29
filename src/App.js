import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import CartItems from './CartItems';
import Cart from './Cart';
import Home from './Home';
import { DataProvider } from './context/DataContext';
import StorePage from './StorePage';
import EmptyItem from './EmptyItem';
import Footer from './Footer';

function App() {
  return (
    <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <DataProvider>
        <div>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='Stores' element={<StorePage />}></Route>
            <Route path='noitem' element={<EmptyItem />}></Route>
            <Route path='cartdes' element={<CartItems />}></Route>
            <Route path='cart' element={<Cart />}></Route>
          </Routes>
        </div>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
