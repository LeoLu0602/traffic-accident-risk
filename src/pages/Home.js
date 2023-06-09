import { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, TrafficLayer } from '@react-google-maps/api';
import Result from '../components/Result';

function Home() {
    const [lat, setLat] = useState(22.9968);
    const [lng, setLng] = useState(120.2169);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
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

    const simplifiedWeather = { 
        '晴天': '晴', 
        '晴時多雲': '晴', 
        '多雲時晴': '晴', 
        '多雲': '陰', 
        '多雲時陰': '陰', 
        '陰時多雲': '陰', 
        '陰天': '陰', 
        '多雲陣雨': '暴雨', 
        '多雲短暫雨': '雨', 
        '多雲短暫陣雨': '暴雨', 
        '午後短暫陣雨': '暴雨', 
        '短暫陣雨': '雨', 
        '多雲時晴短暫陣雨': '暴雨', 
        '多雲時晴短暫雨': '暴雨', 
        '晴時多雲短暫陣雨': '暴雨', 
        '晴短暫陣雨': '暴雨', 
        '短暫雨': '暴雨', 
        '多雲時陰短暫雨': 
        '暴雨', '多雲時陰短暫陣雨': 
        '暴雨', '陰時多雲短暫雨': 
        '暴雨', '陰時多雲短暫陣雨': 
        '暴雨', '雨天': '雨', 
        '晴午後陰短暫雨': '雨', 
        '晴午後陰短暫陣雨': '暴雨', 
        '陰短暫雨': '雨', 
        '陰短暫陣雨': '暴雨', 
        '陰午後短暫陣雨': '暴雨', 
        '多雲時陰有雨': '雨', 
        '多雲時陰陣雨': '暴雨', 
        '晴時多雲陣雨': '暴雨', 
        '多雲時晴陣雨': '暴雨', 
        '陰時多雲有雨': '雨', 
        '陰時多雲有陣雨': '暴雨', 
        '陰時多雲陣雨': '暴雨', 
        '陰有雨': '雨', 
        '陰有陣雨': '暴雨', 
        '陰雨': '雨', 
        '陰陣雨': '暴雨', 
        '陣雨': '暴雨', 
        '午後陣雨': '暴雨', 
        '有雨': '雨', 
        '多雲陣雨或雷雨': '暴雨', 
        '多雲短暫陣雨或雷雨': '暴雨', 
        '多雲短暫雷陣雨': '暴雨', 
        '多雲雷陣雨': '暴雨', 
        '短暫陣雨或雷雨後多雲': '暴雨', 
        '短暫雷陣雨後多雲': '暴雨', 
        '短暫陣雨或雷雨': '暴雨', 
        '晴時多雲短暫陣雨或雷雨': '暴雨', 
        '晴短暫陣雨或雷雨': '暴雨', 
        '多雲時晴短暫陣雨或雷雨': '暴雨', 
        '午後短暫雷陣雨': '暴雨', 
        '多雲時陰陣雨或雷雨': '暴雨', 
        '多雲時陰短暫陣雨或雷雨': '暴雨', 
        '多雲時陰短暫雷陣雨': '暴雨', 
        '多雲時陰雷陣雨': '暴雨', 
        '晴陣雨或雷雨': '暴雨', 
        '晴時多雲陣雨或雷雨': '暴雨', 
        '多雲時晴陣雨或雷雨': '暴雨', 
        '陰時多雲有雷陣雨': '暴雨', 
        '陰時多雲陣雨或雷雨': '暴雨', 
        '陰時多雲短暫陣雨或雷雨': '暴雨', 
        '陰時多雲短暫雷陣雨': '暴雨', 
        '陰時多雲雷陣雨': '暴雨', 
        '陰有陣雨或雷雨': '暴雨', 
        '陰有雷陣雨': '暴雨', 
        '陰陣雨或雷雨': '暴雨', 
        '陰雷陣雨': '暴雨', 
        '晴午後陰短暫陣雨或雷雨': '暴雨', 
        '晴午後陰短暫雷陣雨': '暴雨', 
        '陰短暫陣雨或雷雨': '暴雨', 
        '陰短暫雷陣雨': '暴雨', 
        '雷雨': '暴雨', 
        '陣雨或雷雨後多雲': '暴雨', 
        '陰陣雨或雷雨後多雲': '暴雨', 
        '陰短暫陣雨或雷雨後多雲': '暴雨', 
        '陰短暫雷陣雨後多雲': '暴雨', 
        '陰雷陣雨後多雲': '暴雨', 
        '雷陣雨後多雲': '暴雨', 
        '陣雨或雷雨': '暴雨', 
        '雷陣雨': '暴雨', 
        '午後雷陣雨': '暴雨', 
        '晴午後多雲局部雨': '雨', 
        '晴午後多雲局部陣雨': '暴雨', 
        '晴午後多雲局部短暫雨': '雨', 
        '晴午後多雲局部短暫陣雨': '暴雨', 
        '晴午後多雲短暫雨': '雨', 
        '晴午後多雲短暫陣雨': '暴雨', 
        '晴午後局部雨': '雨', 
        '晴午後局部陣雨': '暴雨', 
        '晴午後局部短暫雨': '雨', 
        '晴午後局部短暫陣雨': '暴雨', 
        '晴午後陣雨': '暴雨', 
        '晴午後短暫雨': '雨', 
        '晴午後短暫陣雨': '暴雨', 
        '晴時多雲午後短暫陣雨': '暴雨', 
        '多雲午後局部雨': '雨', 
        '多雲午後局部陣雨': '暴雨', 
        '多雲午後局部短暫雨': '雨', 
        '多雲午後局部短暫陣雨': '暴雨', 
        '多雲午後陣雨': '暴雨', 
        '多雲午後短暫雨': '雨', 
        '多雲午後短暫陣雨': '暴雨', 
        '多雲時陰午後短暫陣雨': '暴雨', 
        '陰時多雲午後短暫陣雨': '暴雨', 
        '多雲時晴午後短暫陣雨': '暴雨', 
        '晴午後多雲陣雨或雷雨': '暴雨', 
        '晴午後多雲雷陣雨': '暴雨', 
        '晴午後陣雨或雷雨': '暴雨', 
        '晴午後雷陣雨': '暴雨', 
        '晴午後多雲局部陣雨或雷雨': '暴雨', 
        '晴午後多雲局部短暫陣雨或雷雨': '暴雨', 
        '晴午後多雲局部短暫雷陣雨': '暴雨', 
        '晴午後多雲局部雷陣雨': '暴雨', 
        '晴午後多雲短暫陣雨或雷雨': '暴雨', 
        '晴午後多雲短暫雷陣雨': '暴雨', 
        '晴午後局部短暫雷陣雨': '暴雨', 
        '晴午後局部雷陣雨': '暴雨', 
        '晴午後短暫雷陣雨': '暴雨', 
        '晴雷陣雨': '暴雨', 
        '晴時多雲雷陣雨': '暴雨', 
        '晴時多雲午後短暫雷陣雨': '暴雨', 
        '多雲午後局部陣雨或雷雨': '暴雨', 
        '多雲午後局部短暫陣雨或雷雨': '暴雨', 
        '多雲午後局部短暫雷陣雨': '暴雨', 
        '多雲午後局部雷陣雨': '暴雨', 
        '多雲午後陣雨或雷雨': '暴雨', 
        '多雲午後短暫陣雨或雷雨': '暴雨', 
        '多雲午後短暫雷陣雨': '暴雨', 
        '多雲午後雷陣雨': '暴雨', 
        '多雲時晴雷陣雨': '暴雨', 
        '多雲時晴午後短暫雷陣雨': '暴雨', 
        '多雲時陰午後短暫雷陣雨': '暴雨', 
        '陰時多雲午後短暫雷陣雨': '暴雨', 
        '陰午後短暫雷陣雨': '暴雨', 
        '多雲局部陣雨或雪': '暴雨', 
        '多雲時陰有雨或雪': '雨', 
        '多雲時陰短暫雨或雪': '雨', 
        '多雲短暫雨或雪': '雨', 
        '陰有雨或雪': '雨', 
        '陰時多雲有雨或雪': '雨', 
        '陰時多雲短暫雨或雪': '雨', 
        '陰短暫雨或雪': '雨', 
        '多雲時陰有雪': '雨', 
        '多雲時陰短暫雪': '雨', 
        '多雲短暫雪': '雨', 
        '陰有雪': '雨', 
        '陰時多雲有雪': '雨', 
        '陰時多雲短暫雪': '雨', 
        '陰短暫雪': '雨', 
        '有雨或雪': '雨', 
        '有雨或短暫雪': '雨', 
        '陰有雨或短暫雪': '雨', 
        '陰時多雲有雨或短暫雪': '雨', 
        '多雲時陰有雨或短暫雪': '雨', 
        '多雲有雨或短暫雪': '雨', 
        '多雲有雨或雪': '雨', 
        '多雲時晴有雨或雪': '雨', 
        '晴時多雲有雨或雪': '雨', 
        '晴有雨或雪': '雨', 
        '短暫雨或雪': '雨', 
        '多雲時晴短暫雨或雪': '雨', 
        '晴時多雲短暫雨或雪': '雨', 
        '晴短暫雨或雪': '雨', 
        '有雪': '雨', 
        '多雲有雪': '雨', 
        '多雲時晴有雪': '雨', 
        '晴時多雲有雪': '雨', 
        '晴有雪': '雨', 
        '短暫雪': '雨', 
        '多雲時晴短暫雪': '雨', 
        '晴時多雲短暫雪': '雨', 
        '晴短暫雪': '雨', 
        '晴有霧': '霧或煙', 
        '晴晨霧': '霧或煙', 
        '晴時多雲有霧': '霧或煙', 
        '晴時多雲晨霧': '霧或煙', 
        '多雲時晴有霧': '霧或煙', 
        '多雲時晴晨霧': '霧或煙', 
        '多雲有霧': '霧或煙', 
        '多雲晨霧': '霧或煙', 
        '有霧': '霧或煙', 
        '晨霧': '霧或煙', 
        '陰有霧': '霧或煙', 
        '陰晨霧': '霧或煙', 
        '多雲時陰有霧': '霧或煙', 
        '多雲時陰晨霧': '霧或煙', 
        '陰時多雲有霧': '霧或煙', 
        '陰時多雲晨霧': '霧或煙', 
        '多雲局部雨': '雨', 
        '多雲局部陣雨': '暴雨', 
        '多雲局部短暫雨': '雨', 
        '多雲局部短暫陣雨': '暴雨', 
        '多雲時陰局部雨': '雨', 
        '多雲時陰局部陣雨': '暴雨', 
        '多雲時陰局部短暫雨': '雨', 
        '多雲時陰局部短暫陣雨': '暴雨', 
        '晴午後陰局部雨': '雨', 
        '晴午後陰局部陣雨': '暴雨', 
        '晴午後陰局部短暫雨': '雨', 
        '晴午後陰局部短暫陣雨': '暴雨', 
        '陰局部雨': '雨', 
        '陰局部陣雨': '暴雨', 
        '陰局部短暫雨': '雨', 
        '陰局部短暫陣雨': '暴雨', 
        '陰時多雲局部雨': '雨', 
        '陰時多雲局部陣雨': '暴雨', 
        '陰時多雲局部短暫雨': '雨', 
        '陰時多雲局部短暫陣雨': '暴雨', 
        '多雲有霧有局部雨': '雨', 
        '多雲有霧有局部陣雨': '暴雨', 
        '多雲有霧有局部短暫雨': '雨', 
        '多雲有霧有局部短暫陣雨': '暴雨', 
        '多雲有霧有陣雨': '暴雨', 
        '多雲有霧有短暫雨': '雨', 
        '多雲有霧有短暫陣雨': '暴雨', 
        '多雲局部雨有霧': '雨', 
        '多雲局部雨晨霧': '雨', 
        '多雲局部陣雨有霧': '暴雨', 
        '多雲局部陣雨晨霧': '暴雨', 
        '多雲局部短暫雨有霧': '雨', 
        '多雲局部短暫雨晨霧': '雨', 
        '多雲局部短暫陣雨有霧': '暴雨', 
        '多雲局部短暫陣雨晨霧': '暴雨', 
        '多雲陣雨有霧': '暴雨', 
        '多雲短暫雨有霧': '雨', 
        '多雲短暫雨晨霧': '雨', 
        '多雲短暫陣雨有霧': '暴雨', 
        '多雲短暫陣雨晨霧': '暴雨', 
        '有霧有短暫雨': '雨', 
        '有霧有短暫陣雨': '暴雨', 
        '多雲時陰有霧有局部雨': '雨', 
        '多雲時陰有霧有局部陣雨': '暴雨', 
        '多雲時陰有霧有局部短暫雨': '雨', 
        '多雲時陰有霧有局部短暫陣雨': '暴雨', 
        '多雲時陰有霧有陣雨': '暴雨', 
        '多雲時陰有霧有短暫雨': '雨', 
        '多雲時陰有霧有短暫陣雨': '暴雨', 
        '多雲時陰局部雨有霧': '雨', 
        '多雲時陰局部陣雨有霧': '暴雨', 
        '多雲時陰局部短暫雨有霧': '雨', 
        '多雲時陰局部短暫陣雨有霧': '暴雨', 
        '多雲時陰陣雨有霧': '雨', 
        '多雲時陰短暫雨有霧': '雨', 
        '多雲時陰短暫雨晨霧': '雨', 
        '多雲時陰短暫陣雨有霧': '暴雨', 
        '多雲時陰短暫陣雨晨霧': '暴雨', 
        '陰有霧有陣雨': '暴雨', 
        '陰局部雨有霧': '雨', 
        '陰局部陣雨有霧': '暴雨', 
        '陰局部短暫陣雨有霧': '暴雨', 
        '陰時多雲有霧有局部雨': '雨', 
        '陰時多雲有霧有局部陣雨': '暴雨', 
        '陰時多雲有霧有局部短暫雨': '雨', 
        '陰時多雲有霧有局部短暫陣雨': '暴雨', 
        '陰時多雲有霧有陣雨': '暴雨', 
        '陰時多雲有霧有短暫雨': '雨', 
        '陰時多雲有霧有短暫陣雨': '暴雨', 
        '陰時多雲局部雨有霧': '雨', 
        '陰時多雲局部陣雨有霧': '暴雨', 
        '陰時多雲局部短暫雨有霧': '雨', 
        '陰時多雲局部短暫陣雨有霧': '暴雨', 
        '陰時多雲陣雨有霧': '暴雨', 
        '陰時多雲短暫雨有霧': '雨', 
        '陰時多雲短暫雨晨霧': '雨', 
        '陰時多雲短暫陣雨有霧': '暴雨', 
        '陰時多雲短暫陣雨晨霧': '暴雨', 
        '陰陣雨有霧': '暴雨', 
        '陰短暫雨有霧': '雨', 
        '陰短暫雨晨霧': '雨', 
        '陰短暫陣雨有霧': '暴雨', 
        '陰短暫陣雨晨霧': '暴雨', 
        '多雲局部陣雨或雷雨': '暴雨', 
        '多雲局部短暫陣雨或雷雨': '暴雨', 
        '多雲局部短暫雷陣雨': '暴雨', 
        '多雲局部雷陣雨': '暴雨', 
        '多雲時陰局部陣雨或雷雨': '暴雨', 
        '多雲時陰局部短暫陣雨或雷雨': '暴雨', 
        '多雲時陰局部短暫雷陣雨': '暴雨', 
        '多雲時陰局部雷陣雨': '暴雨', 
        '晴午後陰局部陣雨或雷雨': '暴雨', 
        '晴午後陰局部短暫陣雨或雷雨': '暴雨', 
        '晴午後陰局部短暫雷陣雨': '暴雨', 
        '晴午後陰局部雷陣雨': '暴雨', 
        '陰局部陣雨或雷雨': '暴雨', 
        '陰局部短暫陣雨或雷雨': '暴雨', 
        '陰局部短暫雷陣雨': '暴雨', 
        '陰局部雷陣雨': '暴雨', 
        '陰時多雲局部陣雨或雷雨': '暴雨', 
        '陰時多雲局部短暫陣雨或雷雨': '暴雨', 
        '陰時多雲局部短暫雷陣雨': '暴雨', 
        '陰時多雲局部雷陣雨': '暴雨', 
        '多雲有陣雨或雷雨有霧': '暴雨', 
        '多雲有雷陣雨有霧': '暴雨', 
        '多雲有霧有陣雨或雷雨': '暴雨', 
        '多雲有霧有雷陣雨': '暴雨', 
        '多雲局部陣雨或雷雨有霧': '暴雨', 
        '多雲局部短暫陣雨或雷雨有霧': '暴雨', 
        '多雲局部短暫雷陣雨有霧': '暴雨', 
        '多雲局部雷陣雨有霧': '暴雨', 
        '多雲陣雨或雷雨有霧': '暴雨', 
        '多雲短暫陣雨或雷雨有霧': '暴雨', 
        '多雲短暫雷陣雨有霧': '暴雨', 
        '多雲雷陣雨有霧': '暴雨', 
        '多雲時晴短暫陣雨或雷雨有霧': '暴雨', 
        '多雲時陰有陣雨或雷雨有霧': '暴雨', 
        '多雲時陰有雷陣雨有霧': '暴雨', 
        '多雲時陰有霧有陣雨或雷雨': '暴雨', 
        '多雲時陰有霧有雷陣雨': '暴雨', 
        '多雲時陰局部陣雨或雷雨有霧': '暴雨', 
        '多雲時陰局部短暫陣雨或雷雨有霧': '暴雨', 
        '多雲時陰局部短暫雷陣雨有霧': '暴雨', 
        '多雲時陰局部雷陣雨有霧': '暴雨', 
        '多雲時陰陣雨或雷雨有霧': '暴雨', 
        '多雲時陰短暫陣雨或雷雨有霧': '暴雨', 
        '多雲時陰短暫雷陣雨有霧': '暴雨', 
        '多雲時陰雷陣雨有霧': '暴雨', 
        '陰局部陣雨或雷雨有霧': '暴雨', 
        '陰局部短暫陣雨或雷雨有霧': '暴雨', 
        '陰局部短暫雷陣雨有霧': '暴雨', 
        '陰局部雷陣雨有霧': '暴雨', 
        '陰時多雲有陣雨或雷雨有霧': '暴雨', 
        '陰時多雲有雷陣雨有霧': '暴雨', 
        '陰時多雲有霧有陣雨或雷雨': '暴雨', 
        '陰時多雲有霧有雷陣雨': '暴雨', 
        '陰時多雲局部陣雨或雷雨有霧': '暴雨', 
        '陰時多雲局部短暫陣雨或雷雨有霧': '暴雨', 
        '陰時多雲局部短暫雷陣雨有霧': '暴雨', 
        '陰時多雲局部雷陣雨有霧': '暴雨', 
        '陰時多雲陣雨或雷雨有霧': '暴雨', 
        '陰時多雲短暫陣雨或雷雨有霧': '暴雨', 
        '陰時多雲短暫雷陣雨有霧': '暴雨', 
        '陰時多雲雷陣雨有霧': '暴雨', 
        '陰短暫陣雨或雷雨有霧': '暴雨', 
        '陰短暫雷陣雨有霧': '暴雨', 
        '雷陣雨有霧': '暴雨', 
        '多雲局部雨或雪有霧': '雨', 
        '多雲時陰局部雨或雪有霧': '雨', 
        '陰時多雲局部雨或雪有霧': '雨', 
        '陰局部雨或雪有霧': '雨', 
        '短暫雨或雪有霧': '雨', 
        '有雨或雪有霧': '雨', 
        '短暫陣雨有霧': '暴雨', 
        '短暫陣雨晨霧': '暴雨', 
        '短暫雨有霧': '雨', 
        '短暫雨晨霧': '雨', 
        '有雨有霧': '雨', 
        '陣雨有霧': '雨', 
        '短暫陣雨或雷雨有霧': '暴雨', 
        '陣雨或雷雨有霧': '暴雨', 
        '下雪': '雨', 
        '積冰': '雨', 
        '暴風雪': '雨' 
    };
    
    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submit();
        }
    };

    const submit = () => {
        if (searchText === '') {
            return;
        }

        const apiKey = process.env.REACT_APP_API_KEY;
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchText)}&key=${apiKey}`;
        
        axios.get(geocodingUrl)
        .then((res) => {
            const results = res.data.results;

            if (results.length > 0) {
                const { lat, lng } = results[0].geometry.location;
                reverseGeocoding(lat, lng);
            }
            else {
                alert('請重新輸入地點');
            }
        })
        .catch((error) => {
            console.error('Geocoding error:', error);
        });
    };

    const reverseGeocoding = (lat, lng) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const reverseGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

        axios.get(reverseGeocodingUrl)
        .then((res) => {
            const locationArray = res.data.plus_code.compound_code.split(' ');
            const districtIndex = locationArray.indexOf('District,');
            const district = locationArray.slice(1, districtIndex).join(' ');

            if (district in districtEnglish2Chinese) {
                // (lat, lng) is in Tainan
                setLat(lat);
                setLng(lng);
                getWeather(districtEnglish2Chinese[district]);
            }
            else {
                alert('請重新輸入地點');
            }
        })
        .catch((error) => {
            console.error('Reverse geocoding error:', error);
        });
    };

    const getWeather = (district) => {
        const current_time = new Date();
        const current_hour = current_time.getHours();
        const time = current_hour < 6 ? 0 : current_hour < 18 ? 1 : 2;
        const weatherUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-079?Authorization=CWB-C8017091-8B5F-4A12-AB41-E99EF815C107&elementName=WeatherDescription';

        axios.get(weatherUrl)
        .then((res) => {
            const data = res.data;
            const weather = {};

            for (let i = 0; i < 37; i++) {
                const name = data['records']['locations'][0]['location'][i]['locationName'];
                const weatherElement = data['records']['locations'][0]['location'][i]['weatherElement'][0]['time'][time]['elementValue'][0]['value'].split('。')[0];
                weather[name] = weatherElement;
            }

            sendRequest(district, simplifiedWeather[weather[district]]);
        })
        .catch((error) => {
            console.error('Weather error:', error);
        });
    };

    const sendRequest = (district, weather) => {
        const backendUrl = `http://58.114.143.42:8000/?district=${district}&weather=${weather}`;
        setSearchResults([]);

        axios.get(backendUrl)
        .then((res) => {
            setSearchResults(res.data);
        })
        .catch((error) => {
            console.error('Request error', error);
        });
    };

    const reset = () => {
        // reset to NCKU's lat and lng
        setLat(22.9968); 
        setLng(120.2169);

        setSearchText('');
        setSearchResults([]);
    };

    const { isLoaded } =  useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries: ['places']
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
        <div id='home'>
            <div className='home-top'>
                <div id='ww_04a1b20ec59db' v='1.3' loc='id' a='{"t":"responsive","lang":"zh-Hant","sl_lpl":1,"ids":["wl9234"],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","sl_tof":"7"}'>
                    Weather for the Following Location: 
                    <a href='https://2ua.org/de/twn/tainan/karte/' id='ww_04a1b20ec59db_u' target='_blank'>karte von Tainan, Taiwan</a>
                </div>
            </div>
            <div className='home-bottom'>
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
                <div className='home-right'>
                    <input
                        className='search-box'
                        placeholder='輸入地點'
                        type='text'
                        value={searchText}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}  
                    />
                    <div id='btn-container'>
                        <button id='submit-btn' onClick={submit}>搜尋</button>
                        <button id='reset-btn' onClick={reset}>重設</button>
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