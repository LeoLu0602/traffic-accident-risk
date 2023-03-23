import { useState } from 'react';

function Home() {
    const [searchText, setSearchText] = useState('');
    
    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            
        }
    };

    return(
        <div id='home'>
            <iframe
                id='map' 
                src='https://www.google.com/maps/d/u/0/embed?mid=1NlEM_e2JqrixSlWUanbQRZNQ6D1SmF0&ehbc=2E312F'
                width="38%" height="620"
            />
            <div>
                <div>
                    <span className='fa fa-search form-control-feedback' />
                    <input 
                        id='search-box'  
                        className='form-control'
                        type='text'
                        value={searchText}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}     
                    />
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default Home;