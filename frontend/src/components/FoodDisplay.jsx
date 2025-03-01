import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)
  
  // console.log("Food List Data:", food_list)
  return (
    <>
      <div className="food-display mt-4" id="food-display">
        <h2 className="text-purple-600 font-medium text-2xl sm:text-3xl">Discover the Best Dishes Around You :</h2>
        <div className="food-display-list mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {food_list?.map((item, index) =>
              (category === "All" || category === item.category) && (
              <FoodItem key={item._id} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} star={item.stars} />
            ))}
        </div>
      </div>
    </>
  )
}

export default FoodDisplay
