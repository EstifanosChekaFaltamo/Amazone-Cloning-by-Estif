import React from 'react'
import { categoryImage } from "./CategorFull"
import CategoryCard from "./CategoryCard"
import classes from "./category.module.css"
function Category() {
    return (
        <>
            <section className={classes.category_container}>
                {
                    categoryImage.map((infos) => {
                        return < CategoryCard data={infos} key={infos.id} />
                    })
                }
            </section>
        </> 
    )
}

export default Category;