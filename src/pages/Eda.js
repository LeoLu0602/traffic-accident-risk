import GraphRow from '../components/GraphRow';

function Eda() {
    const explanation1 = <div className='explanation'>
                            以下是我們將不同車禍要素對於交通風險的影響進行分析。
                            <br/>
                            圖表附有篩選器，可以選擇列表內的影響要素、地區分布、時間段，
                            <br/>調整圖表中內容，使用者能自行操作圖表，即時看到感興趣的車禍狀況分析圖表。
                         </div>;
    const explanation2 = <div className='explanation'>
                            分類的標準為 :
                            <br/>
                            <br/>
                            <ul>
                                <li>孩童: 18 歲以下</li>
                                <li>成人: 19 - 64 歲</li>
                                <li>長者: 65 歲以上</li>
                            </ul>
                            <br/>
                            從圖表中可以看出
                            <br/>
                            <br/>
                            <ul>
                                <li>孩童、成年人、長者三者的車禍發生都是集中在上下班通勤時段。</li>
                                <br/>
                                <li>其中孩童的分布跟成年人的類似，可能是因為部分成年人開車帶小孩上下學，導致孩童的風險分布是跟成年人呈現正相關的。  </li>
                            </ul>
                         </div>;
    const explanation3 = <div className='explanation'>
                            <ul>
                                <li>男女車禍發生的時間分布長得很類似，推測是男性駕駛的人數較多，產生的結果。</li>
                                <br/>
                                <li>以美國的統計數據為例，有 1.057 億女性擁有駕照，1.043 億男性擁有駕照。但是男性每年造成約 610 萬起事故，女性每年造成 440 萬起事故。</li>
                                <br/>
                                <li>所以推測性別是影響因素之一。</li>
                            </ul>
                         </div>;
    const explanation4 = <div className='explanation'>
                            肇因編號的對應名稱為：
                            <br/>
                            <br/>
                            <ol>
                                <li>未依規定讓車</li>
                                <li>未注意車前狀態</li>
                                <li>其他引起事故之違規或不當行為</li>
                                <li>違反特定標誌(線)禁制</li>
                                <li>違反號誌管制或指揮、左轉彎未依規定、右轉彎未依規定、迴轉未依規定</li>
                                <li>未保持行車安全距離、未保持行車安全間隔、變換車道或方向不當、逆向行駛、橫越道路不慎、違規超車、未靠右行駛</li>
                                <li>酒醉(後)駕駛失控</li>
                                <li>其他</li>
                            </ol>
                            <br/>
                            數據顯示 1. 未依規定讓車 的影響最大，推廣路權的優先順序是首要之急。
                            <br/>
                            <br/>
                            細項分布的比例根據地域相差較大，比起其他因素更受地區影響，推測是跟道路設計有關。
                         </div>;
    const explanation5 = <div className='explanation'>
                            <ul>
                                <li>貨車在圖表上的高峰較為平滑，跟上班時段有關。</li>
                                <br/>
                                <li>行人發生交通事故的比例很高，對於用路人很不友善。</li>
                            </ul>
                         </div>;

    return (
        <div id='eda'>
            <div id='eda-title'>下列是把政府的歷史資料進行分析，並且圖表化和視覺化，讓數據變成易懂、容易找出特徵的方式，有利了解台南交通現況。</div>
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiODQ4MjI0MTQtMWVkZC00ZGIwLWFjMTQtZDYzODhkM2E5YWNhIiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' explanation={explanation1}/>
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiZmYyODMyZjYtNzgzMi00NjI4LThlOTMtZmJhMTRiMTA3NGNkIiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' explanation={explanation2} /> 
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiMTQ4OWEyNjItM2QyOC00MmY4LTk1ZjItY2ZiODhlOGM1MDA1IiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' explanation={explanation3} />
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiNzQ3ZWQzOGEtZDQyNS00N2FkLThjYWQtM2Y4ZmE1MmZmZGVkIiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' explanation={explanation4} />
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiNWIyNDczNDctZjgyMi00YzZjLWI3MzItOTZkOTQ2Nzg4N2U0IiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' explanation={explanation5} />
            <div id='eda-conclusion'>
                總結
                <br/>
                <br/>
                <ul>
                    <li>車禍發生聚集在通勤時段是很正常、合理的，但我們要如何在車流量大的情況避免車禍的發生，是我們要關注的議題。</li>
                    <br />
                    <li>台南的交通事故傷亡比例是全國最高，駕駛與行人要小心用路、注意安全。</li>
                    <br />
                    <li>道路規劃、人行道設計是台南、甚至台灣交通的通病，等待我們一同解決這難題。</li>
                    <br />
                    <li>資料來源 :
                        <br/>
                        <br />
                        <a className='no-underline' href='https://data.tainan.gov.tw/dataset/policedata016'>臺南市道路交通事故原因傷亡統計</a>
                        <br/>
                        <br />
                        <a className='no-underline' href='https://data.tainan.gov.tw/dataset/trafowner'>臺南市道路交通事故當事者區分統計</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Eda;