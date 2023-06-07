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
                        <a href='/' className={path === '/' ? ' nav-link nav-active' : 'nav-link'}>首頁</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/eda' className={path === '/eda' ? ' nav-link nav-active' : 'nav-link'}>資料分析</a>
                    </li>
                </ul>
                <div id='navbar-brand'>
                    <a href='/' className='no-underline'>臺南市交通事故風險地圖</a>
                </div>
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