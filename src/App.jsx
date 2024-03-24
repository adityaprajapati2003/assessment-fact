import React from 'react'
import './styles/App.scss';
import ListRenderer from './components/ListRenderer';

const App = () => {
  return (
    <section className="main-container">
      <h1 className='title'>Celebrity Manager</h1>
      <ListRenderer/>
    </section>
  )
}

export default App
