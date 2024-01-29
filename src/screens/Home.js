import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

const Home = () => {

    const [search, setSearch] = useState('')

    //Carousel
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
    };


    //Accessing Data From Backend
    const [foodItem, setFoodItem] = useState([])
    const [foodCat, setFoodCat] = useState([])

    const loadData = async () => {
        let response = await fetch('http://localhost:5000/api/fooddata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        response = await response.json()

        setFoodItem(response[0])
        setFoodCat(response[1])
    }

    useEffect(() => {
        loadData();
    }, [])




    return (
        <div>
            <Navbar />

            <div style={{ backgroundColor: '#8f8f8f' }}>

                <div className="carousel">
                    <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        <div className="carousel-item"><img src="https://www.dineout.co.in/blog/wp-content/uploads/2017/06/1400x400-copy.jpg" alt="FoodImage 1" /></div>
                        <div className="carousel-item"><img src="https://www.kflaph.ca/en/health-topics/resources/Food-and-Healthy-Eating/ib-food-and-healthy-eating.jpg" alt="FoodImage 2" /></div>
                        <div className="carousel-item"><img src="https://www.foodresearchlab.com/wp-content/uploads/2023/10/Ice-cream-by-Weis-2.jpg" alt="FoodImage 3" /></div>
                        <div className="carousel-item"><img src="https://www.baptist-health.com/wp-content/uploads/2019/07/BHCO-1702225-March-2017-Newsletter.1400x400-10_0.png" alt="FoodImage 3" /></div>
                        <div className="carousel-item"><img src="https://pegasuseventsindia.files.wordpress.com/2014/06/catering-in-chicago1.jpg?w=1400&h=400&crop=1" alt="FoodImage 3" /></div>
                    </div>

                    <div className="search-container">
                        <input type="search" className="search-box" placeholder="What are you having today ?" value={search} onChange={(e) => {setSearch(e.target.value)}} />
                    </div>

                    <div className="carousel-indicators">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <label
                                key={index}
                                className={`indicator ${currentIndex === index ? 'active' : ''}`}
                                onClick={() => handleIndicatorClick(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div >
                {
                    foodCat.length !== 0 ? foodCat.map((i) => {
                        return (
                            <div>
                                <div className='category' key={i._id}>{i.CategoryName}</div>
                                <div className='cardoutercontainer'>
                                    {foodItem.length !== 0 ? foodItem.filter((j) => ((j.CategoryName === i.CategoryName) && (j.name.toLowerCase().includes(search)))).map((k) => {
                                        return (
                                            <Card key={k._id} foodItem={k} options={k.options[0]} />
                                        )
                                    }) : ''}
                                </div>
                            </div>
                        )
                    }) : ''
                }
            </div>
            <Footer />
        </div>
    )
}

export default Home