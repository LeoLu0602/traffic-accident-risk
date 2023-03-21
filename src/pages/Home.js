import { useEffect } from 'react';
import Map from '../components/Map';

function Home() {
    useEffect(() => {
        document.querySelector('.nav-item:nth-child(1) .nav-link').classList.toggle('nav-active');
    }, []);

    return(
        <div>
            <Map />
        </div>
    );
}

export default Home;