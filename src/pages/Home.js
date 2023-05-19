import { useState } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, TrafficLayer, Autocomplete } from '@react-google-maps/api';
import Result from '../components/Result';

function Home() {
    const [lat, setLat] = useState(22.9968);
    const [lng, setLng] = useState(120.2169);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([
        {
            location: 'Location 1',
            risk: 2
        },
        {
            location: 'Location 2',
            risk: 1
        },
        {
            location: 'Location 3',
            risk: 3
        },
        {
            location: 'Location 4',
            risk: 2
        },
        {
            location: 'Location 5',
            risk: 1
        },
        {
            location: 'Location 6',
            risk: 3
        },
        {
            location: 'Location 7',
            risk: 2
        },
        {
            location: 'Location 8',
            risk: 1
        },
        {
            location: 'Location 9',
            risk: 1
        },
        {
            location: 'Location 10',
            risk: 2
        },
    ]);
    
    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    const submit = () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchText)}&key=${apiKey}`;
        
        axios.get(geocodingUrl)
        .then((res) => {
            const results = res.data.results;
            if (results.length > 0) {
                const { lat, lng } = results[0].geometry.location;
                setLat(lat);
                setLng(lng);
            }
        })
        .catch((error) => {
            console.error('Geocoding error:', error);
        });
    };

    const reset = () => {
        setLat(22.9968);
        setLng(120.2169);
        setSearchText('');
        setSearchResults([]);
    };

    const { isLoaded } =  useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries: ['places']
    });

    if (!isLoaded) return <div />;

    return (
        <div id='home'>
            <GoogleMap
                zoom={16}
                center={{ lat: lat, lng: lng }}
                mapContainerClassName='google-map'
            >
                <Marker
                    zIndex={1}
                    position={{
                        lat: lat,
                        lng: lng
                    }}
                />
                <TrafficLayer />
            </GoogleMap>
            <div id='home-right'>
                <div className='search-box-container'>
                    <span className='fa fa-search form-control-feedback' />
                    <Autocomplete>
                        <input
                            id='origin-box' 
                            className='form-control search-box'
                            placeholder='Starting point'
                            type='text'
                            value={searchText}
                            onChange={handleChange}  
                        />
                    </Autocomplete>
                </div>
                <div id='btn-container'>
                    <button id='submit-btn' onClick={submit}>Submit</button>
                    <button id='reset-btn' onClick={reset}>Reset</button>
                </div>
                <div id='search-results'>
                    {searchResults.sort((a, b) => b.risk - a.risk).map((result, i) => <Result key={i} info={result} />)}
                </div>
            </div>
        </div>
    );
}

export default Home;