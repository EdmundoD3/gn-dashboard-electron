import { Routes, Route } from 'react-router-dom';
import AddClient from './AddClient';

import Clients from './Clients';
import Home from './Home';

export default function RoutesApp() {
  return <>
      <Routes>
      <Route
      path="/"
      element={<Home/>}
      />
      <Route
      path="/clientes"
      element={<Clients/>}
      />
      <Route
      path="/clientes/agregar"
      element={<AddClient/>}
      />
      <Route
      path="/clientes/ver"
      element={<Clients/>}
      />
      
      </Routes>
      </>
}