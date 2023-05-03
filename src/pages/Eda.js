import GraphRow from '../components/GraphRow';

function Eda() {
    const explanation1 = 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.';

    return (
        <div id='eda'>
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiNGNhYjVmZjItNWFmMy00ZWI4LWExZDgtYzcwMTc5NDFiYmU1IiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' explanation={explanation1}/>
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiMTcxMDA4MTMtZWJlOC00MzdjLWI0OTktZTdlNTUyYzk3MzFlIiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' />
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiYzk0YWNjM2ItZWU3NC00NjcxLTkwMDQtNTU4MjRmMjQ5NjkxIiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' />
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiZjI3NjFmZjktOTA5ZC00ZDk4LTkwMWMtMzE4MDljYTI2NzU0IiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' />
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiYTYzMDlkMjEtOTk4NC00OGE3LWFmMTQtMWY5MTE0Yzk1Y2RiIiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' />
        </div>
    );
}

export default Eda;