import React, { useState } from 'react'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay'
import MobileApp from '../components/MobileApp'

const Home = () => {
    const [category, setCategory] = useState("All")

    return (
        <>
            <div>
                {/* Header Section */}
                <Header />
                {/* Menu Section */}
                <ExploreMenu category={category} setCategory={setCategory} />
                {/* Food Display Section */}
                <FoodDisplay category={category} />
                {/* App Download Section */}
                <MobileApp />
            </div>
        </>
    )
}

export default Home
