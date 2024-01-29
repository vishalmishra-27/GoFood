import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/createuser' element={<Signup />} />
      <Route exact path='/myOrder' element={<MyOrder />} />
    </Routes>
    </CartProvider>
  );
}

export default App;
