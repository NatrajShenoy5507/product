import Header from './Components/Header';
//import Wallpaper from './components/Wallpaper';
import BSComp from './Components/BSComp';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import RestaurantDetails from './Components/restaurantDetails'
import React from 'react';
import Home from './Components/Home';
import Filter from './Components/Filter';
export default function App() {
  return (
  <div>
    <Header></Header>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/>}></Route>
        <Route path="/BS" element={ <BSComp/>}></Route>
        <Route path="/restaurantDetails/:rName" element={<RestaurantDetails/>}></Route>
        <Route path='/filter' element={<Filter/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}