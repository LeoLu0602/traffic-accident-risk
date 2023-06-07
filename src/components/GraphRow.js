function GraphRow(props) {
    const { src, explanation } = props;

    return (
        <div className='graph-row'>
            <div className='hide' />
            <iframe className='graph' title='Report Section' src={src} frameborder='0' allowFullScreen='true'></iframe>
            { explanation }
        </div>
    );
}

export default GraphRow;