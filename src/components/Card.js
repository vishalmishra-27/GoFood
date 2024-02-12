import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

const Card = (props) => {

    let dispatch = useDispatchCart()
    let data = useCart()
    const priceRef = useRef()
    let options = props.options
    let priceOptions = Object.keys(options)
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    let finalPrice = qty * parseInt(options[size])

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    const handleAddToCart = async () => {
        let food = []
        for (const iterator of data) {
            if (iterator.id === props.foodItem._id) {
                food = iterator

                break;
            }
        }

        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }

            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return
            }

            return
        }

        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }

    return (
        <div className="card">
            <img src={props.foodItem.img} alt="FoodItem" style={{ width: "100%", height: "15rem", objectFit: "cover" }} />
            <div className="cardinnercontainer">
                <h4><b>{props.foodItem.name}</b></h4>
                <select onChange={(e) => { setQty(e.target.value) }}>
                    {
                        Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })
                    }
                </select>

                <select onChange={(e) => { setSize(e.target.value) }} ref={priceRef}>
                    {priceOptions.map((i) => {
                        return (
                            <option key={i} value={i} >{i}</option>
                        )
                    })}
                </select>

                <div className='price' >
                    ₹{finalPrice}/-
                </div>
                <hr />
                <button className='addtocartbutton' onClick={handleAddToCart} >ADD TO CART</button>
            </div>
        </div>
    )
}

export default Card