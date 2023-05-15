import React, { useState } from 'react'

function Snapcard({ prod, idx, count, setCount }) {

    const [show, setShow] = useState(false)
    function addtoCart() {
        setShow(!show)
        setCount(count + 1)
    }
    function removeCart() {
        setShow(!show)
        setCount(count - 1)
    }

    return (
        <div>
            <div key={idx} className="col mb-5">
                <div className="card h-100">
                    {/* <!-- Product image--> */}
                    <img className="card-img-top image" src={`${prod.product_Image}`} alt="..." />
                    {/* <!-- Product details--> */}
                    <div className="card-body p-4">
                        <div className="text-center">
                            {/* <!-- Product name--> */}
                            <h6 className="fw-bolder">{prod.product_Name}</h6>
                            {/* <!-- Product price--> */}
                            {prod.product_Price}<br />
                            <h6 className="fw-bolder">{prod.offer_Price}</h6>

                        </div>
                    </div>
                    {/* .........................................Product Button action....................................  */}

                    {!show ? <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                            <button className="btn btn-outline-dark mt-auto"
                                onClick={addtoCart}>Add to cart</button></div>
                    </div> : null}

                    {show ? <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                            <button className="btn btn-outline-dark mt-auto"
                                onClick={removeCart}>Remove Cart</button></div>
                    </div> : null}
                </div>
            </div>

        </div>

    )
}

export default Snapcard