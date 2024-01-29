import React, { useState, useEffect } from 'react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
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
                    <input type="text" className="search-box" placeholder="Enter your search" />
                    <button className="search-button">Search</button>
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
    );
};

export default Carousel;
