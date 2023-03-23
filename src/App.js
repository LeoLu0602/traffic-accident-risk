import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Eda from './pages/Eda';
import Error from './pages/Error';

function App() {
    const url = window.location.href;
    const path = url.slice(url.lastIndexOf('/'));

    return(
        <Router>
            <nav className='navbar navbar-expand'>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <a href='/' className={path === '/' ? ' nav-link nav-active' : 'nav-link'}>Home</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/eda' className={path === '/eda' ? ' nav-link nav-active' : 'nav-link'}>EDA</a>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/eda' element={<Eda />}></Route>
                <Route path='*' element={<Error />}></Route>
            </Routes>
        </Router>
    );
}

export default App;