import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })

    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData.length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div >
                                                    {arrayData.Order_date ? <div className='myorderslist'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='' >
                                                            <div className="card mt-3" style={{ margin: 'auto', width: "60%", maxHeight: "360px" }}>
                                                                <div className="myordercardbody">
                                                                    <h5 className="myordercardtitle">{arrayData.name}</h5>
                                                                    <div className='myordercard' style={{ height: "38px" }}>
                                                                        <span className='m-1'>qty : {arrayData.qty}</span>
                                                                        <span className='m-1'>size : {arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    }

                                                </div>
                                                
                                                )
                                            })
                                            
                                            )
                                        }) : ""
                                        )
                                    }) : ""}
                </div>


            </div>

            <Footer />
        </div>
    )
}