import { useEffect } from "react";

function Eda() {
    useEffect(() => {
        document.querySelector('.nav-item:nth-child(2) .nav-link').classList.toggle('nav-active');
    }, []);

    return(
        <div>EDA</div>
    );
}

export default Eda;