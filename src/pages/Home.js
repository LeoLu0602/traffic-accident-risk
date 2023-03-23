function Home() {
    // useEffect(() => {
    //     document.querySelector('.nav-item:nth-child(1) .nav-link').classList.toggle('nav-active');
    // }, []);

    return(
        <div id='home'>
            <iframe
                id='map' 
                src='https://www.google.com/maps/d/u/0/embed?mid=1NlEM_e2JqrixSlWUanbQRZNQ6D1SmF0&ehbc=2E312F'
                width="38%" height="620"
            />
            <div>
                <div>
                    <span className='fa fa-search form-control-feedback' />
                    <input id='search-box' type='text' className='form-control' />
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default Home;