import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Eda from './pages/Eda';
import Error from './pages/Error';

function App() {
    const url = window.location.href;
    const path = url.slice(url.lastIndexOf('/'));

    useEffect(() => {
        // for google map
        const script = document.createElement('script');

        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`;
        script.async = true;

        document.body.appendChild(script);
    }, []);

    return(
        <Router>
            <div id='navbar'>
                <a href='/' className={ path === '/' ? 'nav-item nav-active no-underline' : 'nav-item no-underline' }>
                    <div>首頁</div>
                </a>
                <a href='/eda' className={ path === '/eda' ? 'nav-item nav-active no-underline' : 'nav-item no-underline' }>
                    <div>資料分析</div>
                </a>
                <a href='/' id='nav-brand' className='no-underline'>
                    <div>臺南市交通事故風險地圖</div>
                </a>
            </div>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/eda' element={<Eda />}></Route>
                <Route path='*' element={<Error />}></Route>
            </Routes>
        </Router>
    );
}

export default App;