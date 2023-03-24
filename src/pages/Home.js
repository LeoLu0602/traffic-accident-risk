import { useState } from 'react';
import axios from 'axios';
import Result from '../components/Result';

function Home() {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResult] = useState([
        {
            location: '台南市東區大學路西段39號',
            risk: 3
        },
        {
            location: '台南市東區勝利路171巷1號',
            risk: 2
        },
        {
            location: '台南市東區育樂街66巷10號2樓',
            risk: 1
        },
        {
            location: '台南市東區大學路西段39號',
            risk: 3
        },
        {
            location: '台南市東區勝利路171巷1號',
            risk: 2
        },
        {
            location: '台南市東區育樂街66巷10號2樓',
            risk: 1
        },
        {
            location: '台南市東區大學路西段39號',
            risk: 3
        },
        {
            location: '台南市東區勝利路171巷1號',
            risk: 2
        },
        {
            location: '台南市東區育樂街66巷10號2樓',
            risk: 1
        },
        {
            location: '台南市東區大學路西段39號',
            risk: 3
        },
        {
            location: '台南市東區勝利路171巷1號',
            risk: 2
        },
        {
            location: '台南市東區育樂街66巷10號2樓',
            risk: 1
        },
        {
            location: '台南市東區大學路西段39號',
            risk: 3
        },
        {
            location: '台南市東區勝利路171巷1號',
            risk: 2
        },
        {
            location: '台南市東區育樂街66巷10號2樓',
            risk: 1
        },
        {
            location: '台南市東區大學路西段39號',
            risk: 3
        },
        {
            location: '台南市東區勝利路171巷1號',
            risk: 2
        },
        {
            location: '台南市東區育樂街66巷10號2樓',
            risk: 1
        },
        {
            location: '台南市東區大學路西段39號',
            risk: 3
        },
        {
            location: '台南市東區勝利路171巷1號',
            risk: 2
        },
        {
            location: '台南市東區育樂街66巷10號2樓',
            risk: 1
        },
        {
            location: '台南市東區大學路西段39號',
            risk: 3
        },
        {
            location: '台南市東區勝利路171巷1號',
            risk: 2
        },
        {
            location: '台南市東區育樂街66巷10號2樓',
            risk: 1
        },
        {
            location: '台南市東區大學路西段39號',
            risk: 3
        },
        {
            location: '台南市東區勝利路171巷1號',
            risk: 2
        },
        {
            location: '台南市東區育樂街66巷10號2樓',
            risk: 1
        },
        {
            location: '台南市東區大學路西段39號',
            risk: 3
        },
        {
            location: '台南市東區勝利路171巷1號',
            risk: 2
        },
        {
            location: '台南市東區育樂街66巷10號2樓',
            risk: 1
        }
    ]);
    
    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchText) {
            // Google API (map zoom in)
            axios.post('', { location: searchText })
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            });

            // Model API (display results)
            axios.post('', { location: searchText })
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    return(
        <div id='home'>
            <iframe
                id='map' 
                src='https://www.google.com/maps/d/u/0/embed?mid=1NlEM_e2JqrixSlWUanbQRZNQ6D1SmF0&ehbc=2E312F'
                width="38%" height="620"
            />
            <div id='home-right'>
                <div id='search-box-container'>
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
                <div id='home-right-bottom'>
                    <div id='menu'></div>
                    <div id='search-results'>
                        {searchResults.map(result => <Result info={result} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;