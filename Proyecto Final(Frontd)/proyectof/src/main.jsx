import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { PrivateRoute } from '../routes/PrivateRoute.jsx'
import { Usuarios } from './components/Usuarios.jsx'
import { Home } from './components/Home.jsx'
import { Register } from './components/Register.jsx'
import { Admin } from './components/admin/Admin.jsx'
import { AdminAccess } from './components/admin/AdminAccess.jsx'
import { AdminRoutes } from '../routes/AdminRoutes.jsx'
import { SubirProducto } from './components/vendedor/SubirProducto.jsx'
import { Seller } from './components/vendedor/Seller.jsx'
import { RegisterVendedor } from './components/vendedor/RegisterVendedor.jsx'
import { SellerRoutes } from '../routes/SellerRoutes.jsx'
import { Carrito } from './components/user/Carrito.jsx'
import { SelectMetodo } from './components/user/SelectMetodo.jsx'
import { Transferencia } from './components/user/Transferencia.jsx'
import { PagoMovil } from './components/user/PagoMovil.jsx'
import { Navbar } from './components/html/css/Navbar.jsx'
import { Product } from './components/html/css/Product.jsx'
import { Categorias  } from './components/html/css/Categorias.jsx'
import { Factura } from './components/html/css/Factura.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

      <Route element={<PrivateRoute />}>
        <Route path='/privada' element={<Usuarios/>} />
        <Route path='/seller' element={<RegisterVendedor/>} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/selectMetodo" element={<SelectMetodo/>} />
      </Route>

      <Route path="/transferencia" element={<Transferencia/>} />
      <Route path="/pagoMovil" element={<PagoMovil/>} />
      
      <Route element={< AdminRoutes />}>
        <Route path="/adminAccess/:users" element={< AdminAccess/>} />
      </Route>  

        <Route path="/" element={< Home/>} />
        <Route path="/register" element={< Register/>} />
        <Route path="/login" element={<App />} />
        <Route path="/nav" element={<Navbar />} />

        <Route path="/viewProduct" element={<Product />} />

        
        
        <Route path="/admin" element={<Admin/>} />
        <Route path='/categorias/:category' element={<Categorias/>} />
        <Route path='/factura' element={<Factura/>} />

        
        <Route element={<SellerRoutes />}> 
          <Route path="/uploads" element={<SubirProducto/>} />
          <Route path="/sellerconfig" element={<Seller/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
