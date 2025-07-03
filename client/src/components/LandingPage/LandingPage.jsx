import { useOutletContext } from 'react-router-dom'
import { useMemo } from 'react'
import styles from './LandingPage.module.css'
import Button from '../Button/Button'
import { Search, Monitor, Gem, Shirt, ShoppingBag } from 'lucide-react'
import ProductCardCategory from '../ProductCardCategory/ProductCardCategory'

const LandingPage = () => {
    // Get data from parent App component
    const { productsCategories, loading } = useOutletContext()
    
    const categoryIcons = useMemo(() => ({
        'electronics': <Monitor size={40} />,
        'jewelery': <Gem size={40} />,
        "men's clothing": <Shirt size={40} />,
        "women's clothing": <ShoppingBag size={40} />
    }), []);

    const getCategoryIcon = (category) => {
        return categoryIcons[category] || <ShoppingBag size={40} />
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <p className={styles.title}>
                        Discover a smarter way to <br />shop online
                    </p>
                    <p className={styles.subtitle}>
                        Browse, select, and enjoy seamless shopping!
                    </p>
                    <div className={styles.searchGroup}>
                        <div className={styles.searchInputWrapper}>
                            <input
                                type="search"
                                placeholder="What do you want to buy?"
                                className={styles.searchInput}
                                id="search-input"
                                name="search"
                                aria-label="Search for products"
                            />
                            <Search size={20} strokeWidth={2.5} className={styles.searchIcon} />
                        </div>
                        <Button name="Find" className={styles.searchButton} />
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img 
                        src='/images/womanbags.webp' 
                        alt="Shopping" 
                        loading="eager"
                        width="600" 
                        height="400"
                        fetchPriority="high"
                        decoding="sync"
                    />
                </div>
            </div>
            <div className={styles.categoriesContainer}>
                <p className={styles.categoriesTitle}>Product Categories</p>
                <div className={styles.cardsContainer}>
                    {loading ? (
                        <p className={styles.loadingCard}>Loading Categories...</p>
                    ) : (
                        productsCategories.map((category, index) => (
                            <ProductCardCategory
                                key={index}
                                title={category}
                                icon={getCategoryIcon(category)}
                            />
                        )))}
                </div>
            </div>
        </>
    )
}

export default LandingPage
