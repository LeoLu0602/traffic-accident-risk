import { useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import Result from '../components/Result';

function Home() {
    const [center, setCenter] = useState({ lat: 22.9968, lng: 120.2169 });
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

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && searchText) {
            const results = await getGeocode({ address: searchText });
            // const { lat, lng } = getLatLng(results[0]);
            // setCenter({ lat: 51.5, lng: 0 }); 
        }
    };

    const { isLoaded } =  useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries: ['places']
    });

    if (!isLoaded) return <div></div>;

    return (
        <div id='home'>
            <GoogleMap
                zoom={16}
                center={center}
                mapContainerClassName='google-map'
                options={{ 
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
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