import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Homepage from '../pages/Homepage'

import CarForm from '../pages/car/CarForm'
import CarList from '../pages/car/CarList'

import CustomerForm from '../pages/customer/CustomerForm'
import CustomerList from '../pages/customer/CustomerList'

import About from '../pages/About'

export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={ <Homepage /> } />

    <Route path="/cars" element={ <CarList /> } />
    <Route path="/cars/new" element={ <CarForm /> } />
    <Route path="/cars/:id" element={ <CarForm /> } />

    <Route path="/customers" element={ <CustomerList /> } />
    <Route path="/customers/new" element={ <CustomerForm /> } />
    <Route path="/customers/:id" element={ <CustomerForm /> } />

    {/* 11. Crie uma rota para esse componente. */}
    <Route path="/about" element={ <About /> } />
  </Routes>
}