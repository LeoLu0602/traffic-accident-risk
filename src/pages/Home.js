import { useState } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, TrafficLayer, Autocomplete } from '@react-google-maps/api';
import Result from '../components/Result';

function Home() {
    const [originLat, setOriginLat] = useState(22.9968);
    const [originLng, setOriginLng] = useState(120.2169);
    const [destinationLat, setDestinationLat] = useState(22.9968);
    const [destinationLng, setDestinationLng] = useState(120.2169);
    const [searchTextOrigin, setSearchTextOrigin] = useState('');
    const [searchTextDestination, setSearchTextDestination] = useState('');
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
        if (e.target.id === 'origin-box') setSearchTextOrigin(e.target.value);
        else setSearchTextDestination(e.target.value);
    };

    const submit = () => {
        if (searchTextOrigin !== '' && searchTextDestination !== '') {
            axios.get(`https://geocode.maps.co/search?q=${searchTextOrigin}`)
            .then(res => {
                const resultsArray = res.data;
                if (resultsArray.length > 0) {
                    const targetLat = parseFloat(resultsArray[0].lat);
                    const targetLng = parseFloat(resultsArray[0].lon);
                    setOriginLat(targetLat);
                    setOriginLng(targetLng);
                    axios.get(`https://geocode.maps.co/search?q=${searchTextDestination}`)
                    .then(res => {
                        const resultsArray = res.data;
                        if (resultsArray.length > 0) {
                            const targetLat = parseFloat(resultsArray[0].lat);
                            const targetLng = parseFloat(resultsArray[0].lon);
                            setDestinationLat(targetLat);
                            setDestinationLng(targetLng);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    const reset = () => {
        setOriginLat(22.9968);
        setOriginLng(120.2169);
        setDestinationLat(22.9968);
        setDestinationLng(120.2169);
        setSearchTextOrigin('');
        setSearchTextDestination('');
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
                center={{ lat: originLat, lng: originLng }}
                mapContainerClassName='google-map'
            >
                <Marker
                    zIndex={1}
                    label='A'
                    position={{
                        lat: originLat,
                        lng: originLng
                    }}
                />
                <Marker
                    label='B'
                    position={{
                        lat: destinationLat,
                        lng: destinationLng
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
                            value={searchTextOrigin}
                            onChange={handleChange}  
                        />
                    </Autocomplete>
                </div>
                <div className='search-box-container'>
                    <span className='fa fa-search form-control-feedback' />
                    <Autocomplete>
                        <input
                            id='destination-box' 
                            className='form-control search-box'
                            placeholder='Destination'
                            type='text'
                            value={searchTextDestination}
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