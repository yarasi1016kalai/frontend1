import React, { useEffect } from 'react'
import Flipcard from './Flipcard';

function Flipkart({ count, setCount }) {
    const FlipkartData = () => {
        fetch("https://webscrap-backend-5i69.onrender.com/flipkart")
            .then((data) => data.json())
            .then((res) => setCount(res));
    }
    useEffect(() => FlipkartData(), [])
    console.log(count)

    return (
        <div>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {count.map((prod, idx,) => <Flipcard
                            prod={prod}
                            key={idx}
                            count={count}
                            setCount={setCount}
                        />)}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Flipkart