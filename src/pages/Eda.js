import GraphRow from '../components/GraphRow';

function Eda() {
    const explanation1 = 'HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page\'s appearance/presentation (CSS) or functionality/behavior (JavaScript).';
    const explanation2 = 'Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.';
    const explanation3 = 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.';
    const explanation4 = 'As its official tagline states, React is a library for building user interfaces. React is not a framework – it\'s not even exclusive to the web. It\'s used with other libraries to render to certain environments. For instance, React Native can be used to build mobile applications.';
    const explanation5 = 'Python is a high level general-purpose programming language. It uses a multi-paradigm approach, meaning it supports procedural, object-oriented, and some functional programming constructs.';

    return (
        <div id='eda'>
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiNGNhYjVmZjItNWFmMy00ZWI4LWExZDgtYzcwMTc5NDFiYmU1IiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' explanation={explanation1}/>
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiMTcxMDA4MTMtZWJlOC00MzdjLWI0OTktZTdlNTUyYzk3MzFlIiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' explanation={explanation2} />
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiYzk0YWNjM2ItZWU3NC00NjcxLTkwMDQtNTU4MjRmMjQ5NjkxIiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' explanation={explanation3} />
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiZjI3NjFmZjktOTA5ZC00ZDk4LTkwMWMtMzE4MDljYTI2NzU0IiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' explanation={explanation4} />
            <GraphRow src='https://app.powerbi.com/view?r=eyJrIjoiYTYzMDlkMjEtOTk4NC00OGE3LWFmMTQtMWY5MTE0Yzk1Y2RiIiwidCI6ImMyZTc3NTNmLWFhMDUtNGFiYy04YzAyLTI5M2FkMTIyY2ExOSIsImMiOjEwfQ%3D%3D' explanation={explanation5} />
        </div>
    );
}

export default Eda;