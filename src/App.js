import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Eda from './pages/Eda';
import Test from './pages/Test';
import Error from './pages/Error';

function App() {
    const url = window.location.href;
    const path = url.slice(url.lastIndexOf('/'));

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
                <Route path='/test' element={<Test />}></Route>
                <Route path='*' element={<Error />}></Route>
            </Routes>
        </Router>
    );
}

export default App;