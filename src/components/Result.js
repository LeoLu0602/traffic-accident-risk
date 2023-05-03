function Result({ info }) {
    const { location, risk } = info;

    return (
        <div id='result' className={risk === 1 ? 'green' : risk === 2 ? 'yellow' : 'red'}>
            <div>{location}</div>
        </div>
    );
}

export default Result;