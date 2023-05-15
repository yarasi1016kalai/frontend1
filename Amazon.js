
import React, { useEffect } from "react";
import Card from "./Card";


function Amazon({ count, setCount }) {

    const AmazonData = () => {
        fetch("https://webscrap-backend-5i69.onrender.com/amazon")
            .then((data) => data.json())
            .then((res) => setCount(res));
    }
    useEffect(() => AmazonData(), [])
    console.log(count)
    return (

        <div>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {count.slice(0, 10).map((prod, idx,) => <Card
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
export default Amazon


