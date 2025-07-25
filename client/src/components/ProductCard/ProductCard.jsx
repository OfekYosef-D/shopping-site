import React from 'react'
import styles from './ProductCard.module.css'
import { Star, ShoppingCart } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'

const ProductCard = ({ id, title, price, desc, category, image, rating }) => {
    const { addToCart } = useOutletContext()
    
    // Truncate long titles and descriptions
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
    }

    const handleAddToCart = () => {
        console.log('Adding to cart:', { id, title, price, image, category })
        addToCart({
            id,
            title,
            price,
            image,
            category
        })
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.imageContainer}>
                <img 
                    src={image} 
                    alt={title}
                    className={styles.productImage}
                    loading="lazy"
                />
                <div className={styles.categoryBadge}>
                    {category}
                </div>
            </div>
            
            <div className={styles.contentContainer}>
                <h3 className={styles.title}>
                    {truncateText(title, 50)}
                </h3>
                
                <p className={styles.description}>
                    {truncateText(desc, 80)}
                </p>
                
                <div className={styles.ratingContainer}>
                    <div className={styles.stars}>
                        <Star size={16} fill="#ffd700" color="#ffd700" />
                        <span className={styles.ratingText}>
                            {rating?.rate} ({rating?.count})
                        </span>
                    </div>
                </div>
                
                <div className={styles.priceContainer}>
                    <span className={styles.price}>${price}</span>
                    <button 
                        className={styles.addToCartBtn}
                        onClick={handleAddToCart}
                        aria-label={`Add ${title} to cart`}
                    >
                        <ShoppingCart size={16} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard