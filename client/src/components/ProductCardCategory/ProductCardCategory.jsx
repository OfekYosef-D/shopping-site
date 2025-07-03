import React from 'react'
import styles from './ProductCardCategory.module.css'

const ProductCardCategory = ({ title, icon }) => { // Change props
    return (
        <div className={styles.cardContainer}>
            <div className={styles.iconContainer}>
                {icon} {/* Render the icon */}
            </div>
            <p className={styles.title}>{title}</p>
        </div>
    )
}

export default ProductCardCategory