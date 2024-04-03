import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo,shivai } from './assets';
import { Home, Create } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-[#f9fafe] sm:px-8 px-4 py-4 shadow-md">
        <Link to="/">
          <img src={shivai} alt="logo" className="w-32 object-contain" />
        </Link>

        <Link
          to="/create"
          className="font-inter font-medium bg-[#7C3AED] text-white px-7 py-3 rounded-lg shadow-xl hover:bg-[#5B21B6] transition duration-300"
        >
          Create
        </Link>
      </header>
      <main className="sm:px-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
