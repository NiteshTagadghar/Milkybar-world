import { useState } from 'react';
import './App.css';
import MobileComponent from './HomePage';
import ImageApp from './SaveImage';
import { BrowserRouter as Router, Switch, Route, Link , Routes } from 'react-router-dom';

const  App = () => {
  return (
  //  <ImageApp /> 
    // <MobileComponent />
 <Router>
  <Routes>
  <Route path='/' exact Component={ImageApp}/>
  <Route path='display' exact Component={MobileComponent} />
  </Routes>
 </Router>
  )
}

export default App;
