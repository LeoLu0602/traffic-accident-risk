import { useState } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, TrafficLayer } from '@react-google-maps/api';
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
    
    const districtEnglish2Chinese = {
        'Houbi': '後壁區',
        'Yanshuei': '鹽水區',
        'Beimen': '北門區',
        'Syuejia': '學甲區',
        'Siaying': '下營區',
        'Jiangiyun': '將軍區',
        'Madou': '麻豆區',
        'Jiali': '佳里區',
        'Shanhua': '善化區',
        'Sigan': '西港區',
        'Anding': '安定區',
        'Sinshih': '新市區',
        'Qigu': '七股區',
        'Annan': '安南區',
        'Yongkang': '永康區',
        'Anping': '安平區',
        'South': '南區',
        'Gueiren': '歸仁區',
        'Rende': '仁德區',
        'West Central': '中西區',
        'Baihe': '白河區',
        'Xinying': '新營區',
        'Dongshan': '東山區',
        'Liouying': '柳營區',
        'Lioujia': '六甲區',
        'Nansi': '楠西區',
        'Guantian': '官田區',
        'Nanhua': '南化區',
        'Danei': '大內區',
        'Yujing': '玉井區',
        'Shanshang': '山上區',
        'Sinhua': '新化區',
        'Zoujhen': '左鎮區',
        'Guaanmiao': '關廟區',
        'Longci': '龍崎區',
        'East': '東區',
        'North': '北區',
    };

    const getWeather = (district) => {
        const current_time = new Date();
        const current_hour = current_time.getHours();
        const time = current_hour < 6 ? 0 : current_hour < 18 ? 1 : 2;
        const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-079?Authorization=CWB-C8017091-8B5F-4A12-AB41-E99EF815C107&elementName=WeatherDescription';

        axios.get(url)
        .then((res) => {
            const data = res.data;
            const weather = {};
            for (let i = 0; i < 37; i++) {
                const name = data['records']['locations'][0]['location'][i]['locationName'];
                const weatherElement = data["records"]["locations"][0]['location'][i]['weatherElement'][0]['time'][time]['elementValue'][0]['value'].split('。')[0];
                weather[name] = weatherElement;
            }
            console.log(district, weather[district]);
        })
        .catch((error) => {
            console.error(error);
        });
    };
    
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

                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`)
                .then((res) => {
                    const locationArray = res.data.plus_code.compound_code.split(' ');
                    const districtIndex = locationArray.indexOf('District,');
                    const district = locationArray.slice(1, districtIndex).join(' ');
                    getWeather(districtEnglish2Chinese[district])
                })
                .catch((error) => {
                    console.error('Reverse geocoding error:', error);
                });
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
                    <input
                        className='form-control search-box'
                        placeholder='Starting point'
                        type='text'
                        value={searchText}
                        onChange={handleChange}  
                    />
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