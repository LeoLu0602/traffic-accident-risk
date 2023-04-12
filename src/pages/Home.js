import { useState } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Result from '../components/Result';

function Home() {
    const [lat, setLat] = useState(22.9968);
    const [lng, setLng] = useState(120.2169);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResult] = useState([
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
        }
    ]);
    
    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchText) {
            axios.get(`https://geocode.maps.co/search?q=${searchText}`)
            .then(res => {
                const resultsArray = res.data;
                if (resultsArray.length > 0) {
                    const targetLat = parseFloat(resultsArray[0].lat);
                    const targetLng = parseFloat(resultsArray[0].lon);
                    setLat(targetLat);
                    setLng(targetLng);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    const { isLoaded } =  useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    });

    if (!isLoaded) return <div />;

    return (
        <div id='home'>
            <GoogleMap
                zoom={16}
                center={{ lat, lng }}
                mapContainerClassName='google-map'
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
                <div id='search-results'>
                    {searchResults.sort((a, b) => b.risk - a.risk).map((result, i) => <Result key={i} info={result} />)}
                </div>
            </div>
        </div>
    );
}

export default Home;