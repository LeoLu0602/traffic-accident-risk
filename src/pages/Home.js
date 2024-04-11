import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  GoogleMap,
  useLoadScript,
  TrafficLayer,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { simplifiedWeather } from '../simplifiedWeather';
import Result from '../components/Result';
import { resolvePath } from 'react-router-dom';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [centerLat, setCenterLat] = useState(22.9968); // NCKU's lat == 22.9968
  const [centerLng, setCenterLng] = useState(120.2169); // NCKU's lng == 120.2169
  const [searchText1, setSearchText1] = useState('');
  const [searchText2, setSearchText2] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [directions, setDirections] = useState(null);

  async function submit() {
    if (searchText1 === '' || searchText2 === '') {
      return;
    }

    try {
      // --------------- search texts -> coordinates ---------------
      const res1 = await geocoding(searchText1);

      if (!res1) {
        alert('請重新輸入起點');
        return;
      }

      const res2 = await geocoding(searchText2);

      if (!res2) {
        alert('請重新輸入終點');
        return;
      }

      const lat1 = res1.lat;
      const lng1 = res1.lng;
      const lat2 = res2.lat;
      const lng2 = res2.lng;

      setCenterLat((lat1 + lat2) / 2);
      setCenterLng((lng1 + lng2) / 2);
      getRoutes(lat1, lng1, lat2, lng2);

      // --------------- coordinates -> districts ---------------
      const district1 = await reverseGeocoding(lat1, lng1);
      const district2 = await reverseGeocoding(lat2, lng2);

      if (!district1 && district2) {
        alert('起點不在台南');
        return;
      }

      if (district1 && !district2) {
        alert('終點不在台南');
        return;
      }

      if (!district1 && !district2) {
        alert('起終點皆不在台南');
        return;
      }

      // --------------- get weather in district 1 & 2 ---------------
      const weather1 = await getWeather(district1);
      const weather2 = await getWeather(district2);

      // --------------- get high-risk locations ---------------
      setIsLoading(true);
      setSearchResults([]);

      const locations = await getHighRiskLocations(
        district1,
        weather1,
        district2,
        weather2
      );

      setIsLoading(false);
      setSearchResults(locations);
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  }

  async function geocoding(searchText) {
    const apiKey = process.env.REACT_APP_MAP_API_KEY;
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchText}&key=${apiKey}`;
    const res = await axios.get(geocodingUrl);

    if (res.data.results.length === 0) {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(res.data.results[0].geometry.location);
    });
  }

  async function reverseGeocoding(lat, lng) {
    try {
      const apiKey = process.env.REACT_APP_MAP_API_KEY;
      const reverseGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
      const res = await axios.get(reverseGeocodingUrl);
      const pattern = /台南市.+區/;
      const match = res.data.plus_code.compound_code.match(pattern)?.[0];

      if (match) {
        return new Promise((resolve, reject) => {
          resolve(match.slice(3));
        });
      }

      return new Promise((resolve, reject) => {
        resolve(null);
      });
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    }
  }

  async function getWeather(district) {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const current_time = new Date();
      const current_hour = current_time.getHours();
      const time = current_hour < 6 ? 0 : current_hour < 18 ? 1 : 2;
      const weatherUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-079?Authorization=${apiKey}&elementName=WeatherDescription`;
      const res = await axios.get(weatherUrl);
      const data = res.data;
      const weather = {};

      for (let i = 0; i < 37; i++) {
        const name =
          data['records']['locations'][0]['location'][i]['locationName'];
        const weatherElement =
          data['records']['locations'][0]['location'][i]['weatherElement'][0][
            'time'
          ][time]['elementValue'][0]['value'].split('。')[0];
        weather[name] = weatherElement;
      }

      return new Promise((resolve, reject) => {
        resolve(simplifiedWeather[weather[district]]);
      });
    } catch (error) {
      console.error('Weather error:', error);
    }
  }

  async function getHighRiskLocations(
    district1,
    weather1,
    district2,
    weather2
  ) {
    try {
      const serverURl1 = `https://traffic-accident-risk-backend.onrender.com/api/myfunction?district=${district1}&weather=${weather1}`;
      const serverURl2 = `https://traffic-accident-risk-backend.onrender.com/api/myfunction?district=${district2}&weather=${weather2}`;

      const res1 = await axios.get(serverURl1);
      const res2 = await axios.get(serverURl2);

      const seenLocations = new Set();
      const combinedResults = [];

      [...res1.data, ...res2.data].forEach((result) => {
        if (!seenLocations.has(result.location)) {
          combinedResults.push(result);
          seenLocations.add(result.location);
        }
      });

      return new Promise((resolve, reject) => {
        resolve(combinedResults);
      });
    } catch (error) {
      console.error('Request error', error);
    }
  }

  function getRoutes(lat1, lng1, lat2, lng2) {
    const directionsService = new window.google.maps.DirectionsService();

    const origin = new window.google.maps.LatLng(lat1, lng1);
    const destination = new window.google.maps.LatLng(lat2, lng2);

    const request = {
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        setDirections(result);
      }
    });
  }

  function handleChange(e) {
    if (e.target.name === 'origin') {
      setSearchText1(e.target.value);
    } else {
      setSearchText2(e.target.value);
    }
  }

  function reset() {
    setSearchText1('');
    setSearchText2('');
    setSearchResults([]);
    setDirections(null);
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    // for weather widget
    const script = document.createElement('script');

    script.src = 'https://app1.weatherwidget.org/js/?id=ww_04a1b20ec59db';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  if (!isLoaded) {
    return <div />;
  }

  return (
    <div id="home">
      <div id="home-top">
        <div
          id="ww_04a1b20ec59db"
          v="1.3"
          loc="id"
          a='{"t":"responsive","lang":"zh-Hant","sl_lpl":1,"ids":["wl9234"],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","sl_tof":"7"}'
        >
          Weather for the Following Location:
          <a
            href="https://2ua.org/de/twn/tainan/karte/"
            id="ww_04a1b20ec59db_u"
            target="_blank"
          >
            karte von Tainan, Taiwan
          </a>
        </div>
      </div>
      <div id="home-bottom">
        <GoogleMap
          zoom={16}
          center={{ lat: centerLat, lng: centerLng }}
          mapContainerClassName="google-map"
        >
          <TrafficLayer />
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
        <div id="home-right">
          <input
            name="origin"
            className="search-box"
            placeholder="輸入起點"
            type="text"
            value={searchText1}
            onChange={handleChange}
          />
          <input
            name="destination"
            className="search-box"
            placeholder="輸入終點"
            type="text"
            value={searchText2}
            onChange={handleChange}
          />
          <div id="btn-container">
            <button id="submit-btn" onClick={submit}>
              搜尋
            </button>
            <button id="reset-btn" onClick={reset}>
              清除
            </button>
          </div>
          <div id="search-results">
            {isLoading ? <div className="loading">Loading...</div> : <div />}
            {searchResults
              .sort((a, b) => b.risk - a.risk)
              .map((result, i) => (
                <Result key={i} info={result} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
