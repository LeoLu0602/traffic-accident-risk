import { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, TrafficLayer, DirectionsRenderer } from '@react-google-maps/api';
import Result from '../components/Result';

function Home() {
    const [lat1, setLat1] = useState();
    const [lng1, setLng1] = useState();
    const [lat2, setLat2] = useState();
    const [lng2, setLng2] = useState();
    const [searchText1, setSearchText1] = useState('');
    const [searchText2, setSearchText2] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [directions, setDirections] = useState(null);
    
    const districtEnglish2Chinese = {
        // 'Houbi': '後壁區',
        // 'Yanshuei': '鹽水區',
        // 'Beimen': '北門區',
        // 'Syuejia': '學甲區',
        // 'Siaying': '下營區',
        // 'Jiangiyun': '將軍區',
        // 'Madou': '麻豆區',
        // 'Jiali': '佳里區',
        // 'Shanhua': '善化區',
        // 'Sigan': '西港區',
        // 'Anding': '安定區',
        // 'Sinshih': '新市區',
        // 'Qigu': '七股區',
        // 'Annan': '安南區',
        // 'Yongkang': '永康區',
        // 'Anping': '安平區',
        // 'South': '南區',
        // 'Gueiren': '歸仁區',
        // 'Rende': '仁德區',
        // 'West Central': '中西區',
        // 'Baihe': '白河區',
        // 'Xinying': '新營區',
        // 'Dongshan': '東山區',
        // 'Liouying': '柳營區',
        // 'Lioujia': '六甲區',
        // 'Nansi': '楠西區',
        // 'Guantian': '官田區',
        // 'Nanhua': '南化區',
        // 'Danei': '大內區',
        // 'Yujing': '玉井區',
        // 'Shanshang': '山上區',
        // 'Sinhua': '新化區',
        // 'Zoujhen': '左鎮區',
        // 'Guaanmiao': '關廟區',
        // 'Longci': '龍崎區',
        // 'East': '東區',
        // 'North': '北區',
    };

    const simplifiedWeather = { 
        // '晴天': '晴', 
        // '晴時多雲': '晴', 
        // '多雲時晴': '晴', 
        // '多雲': '陰', 
        // '多雲時陰': '陰', 
        // '陰時多雲': '陰', 
        // '陰天': '陰', 
        // '多雲陣雨': '暴雨', 
        // '多雲短暫雨': '雨', 
        // '多雲短暫陣雨': '暴雨', 
        // '午後短暫陣雨': '暴雨', 
        // '短暫陣雨': '雨', 
        // '多雲時晴短暫陣雨': '暴雨', 
        // '多雲時晴短暫雨': '暴雨', 
        // '晴時多雲短暫陣雨': '暴雨', 
        // '晴短暫陣雨': '暴雨', 
        // '短暫雨': '暴雨', 
        // '多雲時陰短暫雨': 
        // '暴雨', '多雲時陰短暫陣雨': 
        // '暴雨', '陰時多雲短暫雨': 
        // '暴雨', '陰時多雲短暫陣雨': 
        // '暴雨', '雨天': '雨', 
        // '晴午後陰短暫雨': '雨', 
        // '晴午後陰短暫陣雨': '暴雨', 
        // '陰短暫雨': '雨', 
        // '陰短暫陣雨': '暴雨', 
        // '陰午後短暫陣雨': '暴雨', 
        // '多雲時陰有雨': '雨', 
        // '多雲時陰陣雨': '暴雨', 
        // '晴時多雲陣雨': '暴雨', 
        // '多雲時晴陣雨': '暴雨', 
        // '陰時多雲有雨': '雨', 
        // '陰時多雲有陣雨': '暴雨', 
        // '陰時多雲陣雨': '暴雨', 
        // '陰有雨': '雨', 
        // '陰有陣雨': '暴雨', 
        // '陰雨': '雨', 
        // '陰陣雨': '暴雨', 
        // '陣雨': '暴雨', 
        // '午後陣雨': '暴雨', 
        // '有雨': '雨', 
        // '多雲陣雨或雷雨': '暴雨', 
        // '多雲短暫陣雨或雷雨': '暴雨', 
        // '多雲短暫雷陣雨': '暴雨', 
        // '多雲雷陣雨': '暴雨', 
        // '短暫陣雨或雷雨後多雲': '暴雨', 
        // '短暫雷陣雨後多雲': '暴雨', 
        // '短暫陣雨或雷雨': '暴雨', 
        // '晴時多雲短暫陣雨或雷雨': '暴雨', 
        // '晴短暫陣雨或雷雨': '暴雨', 
        // '多雲時晴短暫陣雨或雷雨': '暴雨', 
        // '午後短暫雷陣雨': '暴雨', 
        // '多雲時陰陣雨或雷雨': '暴雨', 
        // '多雲時陰短暫陣雨或雷雨': '暴雨', 
        // '多雲時陰短暫雷陣雨': '暴雨', 
        // '多雲時陰雷陣雨': '暴雨', 
        // '晴陣雨或雷雨': '暴雨', 
        // '晴時多雲陣雨或雷雨': '暴雨', 
        // '多雲時晴陣雨或雷雨': '暴雨', 
        // '陰時多雲有雷陣雨': '暴雨', 
        // '陰時多雲陣雨或雷雨': '暴雨', 
        // '陰時多雲短暫陣雨或雷雨': '暴雨', 
        // '陰時多雲短暫雷陣雨': '暴雨', 
        // '陰時多雲雷陣雨': '暴雨', 
        // '陰有陣雨或雷雨': '暴雨', 
        // '陰有雷陣雨': '暴雨', 
        // '陰陣雨或雷雨': '暴雨', 
        // '陰雷陣雨': '暴雨', 
        // '晴午後陰短暫陣雨或雷雨': '暴雨', 
        // '晴午後陰短暫雷陣雨': '暴雨', 
        // '陰短暫陣雨或雷雨': '暴雨', 
        // '陰短暫雷陣雨': '暴雨', 
        // '雷雨': '暴雨', 
        // '陣雨或雷雨後多雲': '暴雨', 
        // '陰陣雨或雷雨後多雲': '暴雨', 
        // '陰短暫陣雨或雷雨後多雲': '暴雨', 
        // '陰短暫雷陣雨後多雲': '暴雨', 
        // '陰雷陣雨後多雲': '暴雨', 
        // '雷陣雨後多雲': '暴雨', 
        // '陣雨或雷雨': '暴雨', 
        // '雷陣雨': '暴雨', 
        // '午後雷陣雨': '暴雨', 
        // '晴午後多雲局部雨': '雨', 
        // '晴午後多雲局部陣雨': '暴雨', 
        // '晴午後多雲局部短暫雨': '雨', 
        // '晴午後多雲局部短暫陣雨': '暴雨', 
        // '晴午後多雲短暫雨': '雨', 
        // '晴午後多雲短暫陣雨': '暴雨', 
        // '晴午後局部雨': '雨', 
        // '晴午後局部陣雨': '暴雨', 
        // '晴午後局部短暫雨': '雨', 
        // '晴午後局部短暫陣雨': '暴雨', 
        // '晴午後陣雨': '暴雨', 
        // '晴午後短暫雨': '雨', 
        // '晴午後短暫陣雨': '暴雨', 
        // '晴時多雲午後短暫陣雨': '暴雨', 
        // '多雲午後局部雨': '雨', 
        // '多雲午後局部陣雨': '暴雨', 
        // '多雲午後局部短暫雨': '雨', 
        // '多雲午後局部短暫陣雨': '暴雨', 
        // '多雲午後陣雨': '暴雨', 
        // '多雲午後短暫雨': '雨', 
        // '多雲午後短暫陣雨': '暴雨', 
        // '多雲時陰午後短暫陣雨': '暴雨', 
        // '陰時多雲午後短暫陣雨': '暴雨', 
        // '多雲時晴午後短暫陣雨': '暴雨', 
        // '晴午後多雲陣雨或雷雨': '暴雨', 
        // '晴午後多雲雷陣雨': '暴雨', 
        // '晴午後陣雨或雷雨': '暴雨', 
        // '晴午後雷陣雨': '暴雨', 
        // '晴午後多雲局部陣雨或雷雨': '暴雨', 
        // '晴午後多雲局部短暫陣雨或雷雨': '暴雨', 
        // '晴午後多雲局部短暫雷陣雨': '暴雨', 
        // '晴午後多雲局部雷陣雨': '暴雨', 
        // '晴午後多雲短暫陣雨或雷雨': '暴雨', 
        // '晴午後多雲短暫雷陣雨': '暴雨', 
        // '晴午後局部短暫雷陣雨': '暴雨', 
        // '晴午後局部雷陣雨': '暴雨', 
        // '晴午後短暫雷陣雨': '暴雨', 
        // '晴雷陣雨': '暴雨', 
        // '晴時多雲雷陣雨': '暴雨', 
        // '晴時多雲午後短暫雷陣雨': '暴雨', 
        // '多雲午後局部陣雨或雷雨': '暴雨', 
        // '多雲午後局部短暫陣雨或雷雨': '暴雨', 
        // '多雲午後局部短暫雷陣雨': '暴雨', 
        // '多雲午後局部雷陣雨': '暴雨', 
        // '多雲午後陣雨或雷雨': '暴雨', 
        // '多雲午後短暫陣雨或雷雨': '暴雨', 
        // '多雲午後短暫雷陣雨': '暴雨', 
        // '多雲午後雷陣雨': '暴雨', 
        // '多雲時晴雷陣雨': '暴雨', 
        // '多雲時晴午後短暫雷陣雨': '暴雨', 
        // '多雲時陰午後短暫雷陣雨': '暴雨', 
        // '陰時多雲午後短暫雷陣雨': '暴雨', 
        // '陰午後短暫雷陣雨': '暴雨', 
        // '多雲局部陣雨或雪': '暴雨', 
        // '多雲時陰有雨或雪': '雨', 
        // '多雲時陰短暫雨或雪': '雨', 
        // '多雲短暫雨或雪': '雨', 
        // '陰有雨或雪': '雨', 
        // '陰時多雲有雨或雪': '雨', 
        // '陰時多雲短暫雨或雪': '雨', 
        // '陰短暫雨或雪': '雨', 
        // '多雲時陰有雪': '雨', 
        // '多雲時陰短暫雪': '雨', 
        // '多雲短暫雪': '雨', 
        // '陰有雪': '雨', 
        // '陰時多雲有雪': '雨', 
        // '陰時多雲短暫雪': '雨', 
        // '陰短暫雪': '雨', 
        // '有雨或雪': '雨', 
        // '有雨或短暫雪': '雨', 
        // '陰有雨或短暫雪': '雨', 
        // '陰時多雲有雨或短暫雪': '雨', 
        // '多雲時陰有雨或短暫雪': '雨', 
        // '多雲有雨或短暫雪': '雨', 
        // '多雲有雨或雪': '雨', 
        // '多雲時晴有雨或雪': '雨', 
        // '晴時多雲有雨或雪': '雨', 
        // '晴有雨或雪': '雨', 
        // '短暫雨或雪': '雨', 
        // '多雲時晴短暫雨或雪': '雨', 
        // '晴時多雲短暫雨或雪': '雨', 
        // '晴短暫雨或雪': '雨', 
        // '有雪': '雨', 
        // '多雲有雪': '雨', 
        // '多雲時晴有雪': '雨', 
        // '晴時多雲有雪': '雨', 
        // '晴有雪': '雨', 
        // '短暫雪': '雨', 
        // '多雲時晴短暫雪': '雨', 
        // '晴時多雲短暫雪': '雨', 
        // '晴短暫雪': '雨', 
        // '晴有霧': '霧或煙', 
        // '晴晨霧': '霧或煙', 
        // '晴時多雲有霧': '霧或煙', 
        // '晴時多雲晨霧': '霧或煙', 
        // '多雲時晴有霧': '霧或煙', 
        // '多雲時晴晨霧': '霧或煙', 
        // '多雲有霧': '霧或煙', 
        // '多雲晨霧': '霧或煙', 
        // '有霧': '霧或煙', 
        // '晨霧': '霧或煙', 
        // '陰有霧': '霧或煙', 
        // '陰晨霧': '霧或煙', 
        // '多雲時陰有霧': '霧或煙', 
        // '多雲時陰晨霧': '霧或煙', 
        // '陰時多雲有霧': '霧或煙', 
        // '陰時多雲晨霧': '霧或煙', 
        // '多雲局部雨': '雨', 
        // '多雲局部陣雨': '暴雨', 
        // '多雲局部短暫雨': '雨', 
        // '多雲局部短暫陣雨': '暴雨', 
        // '多雲時陰局部雨': '雨', 
        // '多雲時陰局部陣雨': '暴雨', 
        // '多雲時陰局部短暫雨': '雨', 
        // '多雲時陰局部短暫陣雨': '暴雨', 
        // '晴午後陰局部雨': '雨', 
        // '晴午後陰局部陣雨': '暴雨', 
        // '晴午後陰局部短暫雨': '雨', 
        // '晴午後陰局部短暫陣雨': '暴雨', 
        // '陰局部雨': '雨', 
        // '陰局部陣雨': '暴雨', 
        // '陰局部短暫雨': '雨', 
        // '陰局部短暫陣雨': '暴雨', 
        // '陰時多雲局部雨': '雨', 
        // '陰時多雲局部陣雨': '暴雨', 
        // '陰時多雲局部短暫雨': '雨', 
        // '陰時多雲局部短暫陣雨': '暴雨', 
        // '多雲有霧有局部雨': '雨', 
        // '多雲有霧有局部陣雨': '暴雨', 
        // '多雲有霧有局部短暫雨': '雨', 
        // '多雲有霧有局部短暫陣雨': '暴雨', 
        // '多雲有霧有陣雨': '暴雨', 
        // '多雲有霧有短暫雨': '雨', 
        // '多雲有霧有短暫陣雨': '暴雨', 
        // '多雲局部雨有霧': '雨', 
        // '多雲局部雨晨霧': '雨', 
        // '多雲局部陣雨有霧': '暴雨', 
        // '多雲局部陣雨晨霧': '暴雨', 
        // '多雲局部短暫雨有霧': '雨', 
        // '多雲局部短暫雨晨霧': '雨', 
        // '多雲局部短暫陣雨有霧': '暴雨', 
        // '多雲局部短暫陣雨晨霧': '暴雨', 
        // '多雲陣雨有霧': '暴雨', 
        // '多雲短暫雨有霧': '雨', 
        // '多雲短暫雨晨霧': '雨', 
        // '多雲短暫陣雨有霧': '暴雨', 
        // '多雲短暫陣雨晨霧': '暴雨', 
        // '有霧有短暫雨': '雨', 
        // '有霧有短暫陣雨': '暴雨', 
        // '多雲時陰有霧有局部雨': '雨', 
        // '多雲時陰有霧有局部陣雨': '暴雨', 
        // '多雲時陰有霧有局部短暫雨': '雨', 
        // '多雲時陰有霧有局部短暫陣雨': '暴雨', 
        // '多雲時陰有霧有陣雨': '暴雨', 
        // '多雲時陰有霧有短暫雨': '雨', 
        // '多雲時陰有霧有短暫陣雨': '暴雨', 
        // '多雲時陰局部雨有霧': '雨', 
        // '多雲時陰局部陣雨有霧': '暴雨', 
        // '多雲時陰局部短暫雨有霧': '雨', 
        // '多雲時陰局部短暫陣雨有霧': '暴雨', 
        // '多雲時陰陣雨有霧': '雨', 
        // '多雲時陰短暫雨有霧': '雨', 
        // '多雲時陰短暫雨晨霧': '雨', 
        // '多雲時陰短暫陣雨有霧': '暴雨', 
        // '多雲時陰短暫陣雨晨霧': '暴雨', 
        // '陰有霧有陣雨': '暴雨', 
        // '陰局部雨有霧': '雨', 
        // '陰局部陣雨有霧': '暴雨', 
        // '陰局部短暫陣雨有霧': '暴雨', 
        // '陰時多雲有霧有局部雨': '雨', 
        // '陰時多雲有霧有局部陣雨': '暴雨', 
        // '陰時多雲有霧有局部短暫雨': '雨', 
        // '陰時多雲有霧有局部短暫陣雨': '暴雨', 
        // '陰時多雲有霧有陣雨': '暴雨', 
        // '陰時多雲有霧有短暫雨': '雨', 
        // '陰時多雲有霧有短暫陣雨': '暴雨', 
        // '陰時多雲局部雨有霧': '雨', 
        // '陰時多雲局部陣雨有霧': '暴雨', 
        // '陰時多雲局部短暫雨有霧': '雨', 
        // '陰時多雲局部短暫陣雨有霧': '暴雨', 
        // '陰時多雲陣雨有霧': '暴雨', 
        // '陰時多雲短暫雨有霧': '雨', 
        // '陰時多雲短暫雨晨霧': '雨', 
        // '陰時多雲短暫陣雨有霧': '暴雨', 
        // '陰時多雲短暫陣雨晨霧': '暴雨', 
        // '陰陣雨有霧': '暴雨', 
        // '陰短暫雨有霧': '雨', 
        // '陰短暫雨晨霧': '雨', 
        // '陰短暫陣雨有霧': '暴雨', 
        // '陰短暫陣雨晨霧': '暴雨', 
        // '多雲局部陣雨或雷雨': '暴雨', 
        // '多雲局部短暫陣雨或雷雨': '暴雨', 
        // '多雲局部短暫雷陣雨': '暴雨', 
        // '多雲局部雷陣雨': '暴雨', 
        // '多雲時陰局部陣雨或雷雨': '暴雨', 
        // '多雲時陰局部短暫陣雨或雷雨': '暴雨', 
        // '多雲時陰局部短暫雷陣雨': '暴雨', 
        // '多雲時陰局部雷陣雨': '暴雨', 
        // '晴午後陰局部陣雨或雷雨': '暴雨', 
        // '晴午後陰局部短暫陣雨或雷雨': '暴雨', 
        // '晴午後陰局部短暫雷陣雨': '暴雨', 
        // '晴午後陰局部雷陣雨': '暴雨', 
        // '陰局部陣雨或雷雨': '暴雨', 
        // '陰局部短暫陣雨或雷雨': '暴雨', 
        // '陰局部短暫雷陣雨': '暴雨', 
        // '陰局部雷陣雨': '暴雨', 
        // '陰時多雲局部陣雨或雷雨': '暴雨', 
        // '陰時多雲局部短暫陣雨或雷雨': '暴雨', 
        // '陰時多雲局部短暫雷陣雨': '暴雨', 
        // '陰時多雲局部雷陣雨': '暴雨', 
        // '多雲有陣雨或雷雨有霧': '暴雨', 
        // '多雲有雷陣雨有霧': '暴雨', 
        // '多雲有霧有陣雨或雷雨': '暴雨', 
        // '多雲有霧有雷陣雨': '暴雨', 
        // '多雲局部陣雨或雷雨有霧': '暴雨', 
        // '多雲局部短暫陣雨或雷雨有霧': '暴雨', 
        // '多雲局部短暫雷陣雨有霧': '暴雨', 
        // '多雲局部雷陣雨有霧': '暴雨', 
        // '多雲陣雨或雷雨有霧': '暴雨', 
        // '多雲短暫陣雨或雷雨有霧': '暴雨', 
        // '多雲短暫雷陣雨有霧': '暴雨', 
        // '多雲雷陣雨有霧': '暴雨', 
        // '多雲時晴短暫陣雨或雷雨有霧': '暴雨', 
        // '多雲時陰有陣雨或雷雨有霧': '暴雨', 
        // '多雲時陰有雷陣雨有霧': '暴雨', 
        // '多雲時陰有霧有陣雨或雷雨': '暴雨', 
        // '多雲時陰有霧有雷陣雨': '暴雨', 
        // '多雲時陰局部陣雨或雷雨有霧': '暴雨', 
        // '多雲時陰局部短暫陣雨或雷雨有霧': '暴雨', 
        // '多雲時陰局部短暫雷陣雨有霧': '暴雨', 
        // '多雲時陰局部雷陣雨有霧': '暴雨', 
        // '多雲時陰陣雨或雷雨有霧': '暴雨', 
        // '多雲時陰短暫陣雨或雷雨有霧': '暴雨', 
        // '多雲時陰短暫雷陣雨有霧': '暴雨', 
        // '多雲時陰雷陣雨有霧': '暴雨', 
        // '陰局部陣雨或雷雨有霧': '暴雨', 
        // '陰局部短暫陣雨或雷雨有霧': '暴雨', 
        // '陰局部短暫雷陣雨有霧': '暴雨', 
        // '陰局部雷陣雨有霧': '暴雨', 
        // '陰時多雲有陣雨或雷雨有霧': '暴雨', 
        // '陰時多雲有雷陣雨有霧': '暴雨', 
        // '陰時多雲有霧有陣雨或雷雨': '暴雨', 
        // '陰時多雲有霧有雷陣雨': '暴雨', 
        // '陰時多雲局部陣雨或雷雨有霧': '暴雨', 
        // '陰時多雲局部短暫陣雨或雷雨有霧': '暴雨', 
        // '陰時多雲局部短暫雷陣雨有霧': '暴雨', 
        // '陰時多雲局部雷陣雨有霧': '暴雨', 
        // '陰時多雲陣雨或雷雨有霧': '暴雨', 
        // '陰時多雲短暫陣雨或雷雨有霧': '暴雨', 
        // '陰時多雲短暫雷陣雨有霧': '暴雨', 
        // '陰時多雲雷陣雨有霧': '暴雨', 
        // '陰短暫陣雨或雷雨有霧': '暴雨', 
        // '陰短暫雷陣雨有霧': '暴雨', 
        // '雷陣雨有霧': '暴雨', 
        // '多雲局部雨或雪有霧': '雨', 
        // '多雲時陰局部雨或雪有霧': '雨', 
        // '陰時多雲局部雨或雪有霧': '雨', 
        // '陰局部雨或雪有霧': '雨', 
        // '短暫雨或雪有霧': '雨', 
        // '有雨或雪有霧': '雨', 
        // '短暫陣雨有霧': '暴雨', 
        // '短暫陣雨晨霧': '暴雨', 
        // '短暫雨有霧': '雨', 
        // '短暫雨晨霧': '雨', 
        // '有雨有霧': '雨', 
        // '陣雨有霧': '雨', 
        // '短暫陣雨或雷雨有霧': '暴雨', 
        // '陣雨或雷雨有霧': '暴雨', 
        // '下雪': '雨', 
        // '積冰': '雨', 
        // '暴風雪': '雨' 
    };
    
    const handleChange = (e) => {
        if (e.target.name === 'origin') {
            setSearchText1(e.target.value);
        }
        else {
            setSearchText2(e.target.value);
        }
    };

    const submit = async () => {
        if (searchText1 === '' || searchText2 === '') {
            return;
        }

        try {
            const apiKey = process.env.REACT_APP_API_KEY;
            const geocodingUrl1 = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchText1)}&key=${apiKey}`;
            const geocodingUrl2 = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchText2)}&key=${apiKey}`;
    
            const res1 = await axios.get(geocodingUrl1);
            const res2 = await axios.get(geocodingUrl2);
            const results1 = res1.data.results;
            const results2 = res2.data.results;

            if (results1.length === 0) {
                alert('請重新輸入起點');
                return;
            }

            if (results2.length === 0) {
                alert('請重新輸入終點');
                return;
            }

            const newLat1 = results1[0].geometry.location.lat;
            const newLng1 = results1[0].geometry.location.lng;
            const newLat2 = results2[0].geometry.location.lat;
            const newLng2 = results2[0].geometry.location.lng;

            setLat1(newLat1);
            setLng1(newLng1);
            setLat2(newLat2);
            setLng2(newLng2);
        }
        catch (error) {
            console.error('Geocoding error:', error);
        }
    };

    const getRoutes = () => {
        if (!lat1 || !lng1 || !lat2 || !lng2) {
            return;
        }

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
                console.log(result.routes[0].overview_path.map(x => [x.lat(), x.lng()]));
            }
        });
    };

    const reverseGeocoding = (lat, lng) => {
        // const apiKey = process.env.REACT_APP_API_KEY;
        // const reverseGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

        // axios.get(reverseGeocodingUrl)
        // .then((res) => {
        //     const locationArray = res.data.plus_code.compound_code.split(' ');
        //     const districtIndex = locationArray.indexOf('District,');
        //     const district = locationArray.slice(1, districtIndex).join(' ');

        //     if (district in districtEnglish2Chinese) {
        //         // (lat, lng) is in Tainan
        //         setLat(lat);
        //         setLng(lng);
        //         getWeather(districtEnglish2Chinese[district]);
        //     }
        //     else {
        //         alert('請重新輸入地點, 或嘗試在地名前加上「臺南」');
        //     }
        // })
        // .catch((error) => {
        //     console.error('Reverse geocoding error:', error);
        // });
    };

    const getWeather = (district) => {
        // const current_time = new Date();
        // const current_hour = current_time.getHours();
        // const time = current_hour < 6 ? 0 : current_hour < 18 ? 1 : 2;
        // const weatherUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-079?Authorization=CWB-C8017091-8B5F-4A12-AB41-E99EF815C107&elementName=WeatherDescription';

        // axios.get(weatherUrl)
        // .then((res) => {
        //     const data = res.data;
        //     const weather = {};

        //     for (let i = 0; i < 37; i++) {
        //         const name = data['records']['locations'][0]['location'][i]['locationName'];
        //         const weatherElement = data['records']['locations'][0]['location'][i]['weatherElement'][0]['time'][time]['elementValue'][0]['value'].split('。')[0];
        //         weather[name] = weatherElement;
        //     }

        //     sendRequest(district, simplifiedWeather[weather[district]]);
        // })
        // .catch((error) => {
        //     console.error('Weather error:', error);
        // });
    };

    const sendRequest = (district, weather) => {
        // const backendUrl = `https://traffic-accident-risk-backend.onrender.com/api/myfunction?district=${district}&weather=${weather}`;
        // setSearchResults([]);

        // axios.get(backendUrl)
        // .then((res) => {
        //     setSearchResults(res.data);
        // })
        // .catch((error) => {
        //     console.error('Request error', error);
        // });
    };

    const reset = () => {
        setSearchText1('');
        setSearchText2('');
        setSearchResults([]);
        setDirections(null);
    };

    const { isLoaded } =  useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries: ['places']
    });

    useEffect(getRoutes, [lng2]);

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
        <div id='home'>
            <div id='home-top'>
                <div id='ww_04a1b20ec59db' v='1.3' loc='id' a='{"t":"responsive","lang":"zh-Hant","sl_lpl":1,"ids":["wl9234"],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","sl_tof":"7"}'>
                    Weather for the Following Location: 
                    <a href='https://2ua.org/de/twn/tainan/karte/' id='ww_04a1b20ec59db_u' target='_blank'>karte von Tainan, Taiwan</a>
                </div>
            </div>
            <div id='home-bottom'>
                <GoogleMap
                    zoom={16}
                    center={{ lat: 22.9968, lng: 120.2169 }}
                    mapContainerClassName='google-map'
                >
                    <TrafficLayer />
                    {directions && <DirectionsRenderer directions={directions} />}    
                </GoogleMap>
                <div id='home-right'>
                    <input
                        name='origin'
                        className='search-box'
                        placeholder='輸入起點'
                        type='text'
                        value={searchText1}
                        onChange={handleChange}
                    />
                    <input
                        name='destination'
                        className='search-box'
                        placeholder='輸入終點'
                        type='text'
                        value={searchText2}
                        onChange={handleChange}
                    />
                    <div id='btn-container'>
                        <button id='submit-btn' onClick={submit}>搜尋</button>
                        <button id='reset-btn' onClick={reset}>清除</button>
                    </div>
                    <div id='search-results'>
                        { searchResults.sort((a, b) => b.risk - a.risk).map((result, i) => <Result key={i} info={result} />) }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;