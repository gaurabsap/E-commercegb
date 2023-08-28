import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./pages/top-navbar/Nav";
import Reducer from "./reducer";
import "./App.css";
import Navbar from "./pages/Navbar/Navbar";
import NavBottom from "./pages/bottom-nav/NavBottom";
import Home from "./pages/home/Home";
import Product from "./Auth/Admin/products/Product";
import CartProduct from "./products/CartProduc";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./Auth/user/userAuth/Login";
import Signup from "./Auth/user/userAuth/Signup";
import Page from "./products/productPage/Page";
import Search from "./pages/search/Search";
import { ProductsData } from "./pages/search/Context";
import Checkout from "./products/checkout/Checkout";

function App() {
  return (
    <>
      <ProductsData>
        <Provider store={store}>
          <BrowserRouter>
            <Nav />
            <Navbar />
            <NavBottom />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/product/:id" element={<Page />} />
              <Route path="/search" element={<Search />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            {/* <CartProduct/> */}
          </BrowserRouter>
        </Provider>
      </ProductsData>
    </>
  );
}

export default App;
