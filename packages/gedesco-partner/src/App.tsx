import React from 'react';
import Products from './pages/products/products';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/products' element={< Products />}/>
        <Route path='*' element={<Navigate to={{ pathname: '/products'}} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
