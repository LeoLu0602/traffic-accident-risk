import { useState } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Result from '../components/Result';

function Home() {
    const [originLat, setOriginLat] = useState(22.9968);
    const [originLng, setOriginLng] = useState(120.2169);
    const [destinationLat, setDestinationLat] = useState(22.9968);
    const [destinationLng, setDestinationLng] = useState(120.2169);
    const [searchTextOrigin, setSearchTextOrigin] = useState('');
    const [searchTextDestination, setSearchTextDestination] = useState('');
    const [searchResults, setSearchResult] = useState([
        {
            location: 'location 1',
            risk: 2
        },
        {
            location: 'location 2',
            risk: 1
        },
        {
            location: 'location 3',
            risk: 3
        },
        {
            location: 'location 1',
            risk: 2
        },
        {
            location: 'location 2',
            risk: 1
        },
        {
            location: 'location 3',
            risk: 3
        },
        {
            location: 'location 1',
            risk: 2
        },
        {
            location: 'location 2',
            risk: 1
        },
        {
            location: 'location 3',
            risk: 3
        },
        {
            location: 'location 1',
            risk: 2
        },
        {
            location: 'location 2',
            risk: 1
        },
        {
            location: 'location 3',
            risk: 3
        },
        {
            location: 'location 1',
            risk: 2
        },
        {
            location: 'location 2',
            risk: 1
        },
        {
            location: 'location 3',
            risk: 3
        },
    ]);
    
    const handleChange = (e) => {
        if (e.target.id === 'origin-box') setSearchTextOrigin(e.target.value);
        else setSearchTextDestination(e.target.value);
    };

    const handleClick = () => {
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

    const { isLoaded } =  useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    });

    if (!isLoaded) return <div />;

    return (
        <div id='home'>
            <GoogleMap
                zoom={15}
                center={{ lat: originLat, lng: originLng }}
                mapContainerClassName='google-map'
            >
                <Marker
                    position={{
                        lat: originLat,
                        lng: originLng
                    }}
                />
                <Marker
                    position={{
                        lat: destinationLat,
                        lng: destinationLng
                    }}
                />
            </GoogleMap>
            <div id='home-right'>
                <div className='search-box-container'>
                    <span className='fa fa-search form-control-feedback' />
                    <input
                        id='origin-box' 
                        className='form-control search-box'
                        placeholder='Origin'
                        type='text'
                        value={searchTextOrigin}
                        onChange={handleChange}  
                    />
                </div>
                <div className='search-box-container'>
                    <span className='fa fa-search form-control-feedback' />
                    <input
                        id='destination-box' 
                        className='form-control search-box'
                        placeholder='Destination'
                        type='text'
                        value={searchTextDestination}
                        onChange={handleChange} 
                    />
                </div>
                <button id='submit-btn' onClick={handleClick}>Submit</button>
                <div id='search-results'>
                    {searchResults.sort((a, b) => b.risk - a.risk).map((result, i) => <Result key={i} info={result} />)}
                </div>
            </div>
        </div>
    );
}

export default Home;