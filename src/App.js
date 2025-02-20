import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./Pages/Home";


export default function App() {
 return (
     <>
         <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
            </Routes>
         </BrowserRouter>
     </>
 )
}
