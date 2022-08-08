import './App.css';
import Navbar from './components/layout/navbar/navbar';
import Home from './pages/Home'

function App() {
  return (
    <div className='page'>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
