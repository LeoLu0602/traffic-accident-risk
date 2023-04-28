function GraphRow(props) {
    const { src, explanation } = props;
    return (
        <div className='graph-row'>
            <iframe className='graph' title='Report Section' src={src} frameborder='0' allowFullScreen='true'></iframe>
            <div className='explanation'>{explanation}</div>
        </div>
    );
}

export default GraphRow;