import React, { useState, useMemo } from 'react'
import styles from './ProductsPage.module.css'
import { useOutletContext } from 'react-router-dom'
import ProductCard from '../ProductCard/ProductCard'
import { Filter, SortAsc, SortDesc, X, ChevronDown } from 'lucide-react'

const ProductsPage = () => {
    const { products, productsLoading, productsCategories } = useOutletContext()
    
    // Filter and Sort States
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('default')
    const [priceRange, setPriceRange] = useState({ min: '', max: '' })
    const [minRating, setMinRating] = useState(0)
    const [showFilters, setShowFilters] = useState(false)

    // Memoized filtered and sorted products
    const filteredProducts = useMemo(() => {
        if (!products) return []
        
        let filtered = [...products]
        
        // 1. Filter by Category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory)
        }
        
        // 2. Filter by Price Range
        if (priceRange.min) {
            filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min))
        }
        if (priceRange.max) {
            filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max))
        }
        
        // 3. Filter by Minimum Rating
        if (minRating > 0) {
            filtered = filtered.filter(product => product.rating?.rate >= minRating)
        }
        
        // 4. Sort Products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price)
                break
            case 'rating-high':
                filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
                break
            case 'rating-low':
                filtered.sort((a, b) => (a.rating?.rate || 0) - (b.rating?.rate || 0))
                break
            case 'name-az':
                filtered.sort((a, b) => a.title.localeCompare(b.title))
                break
            case 'name-za':
                filtered.sort((a, b) => b.title.localeCompare(a.title))
                break
            case 'default':
            default:
                // Keep original order (by ID)
                filtered.sort((a, b) => a.id - b.id)
                break
        }
        
        return filtered
    }, [products, selectedCategory, sortBy, priceRange, minRating])

    if (productsLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading products...</div>
            </div>
        )
    }

    const resetFilters = () => {
        setSelectedCategory('all')
        setSortBy('default')
        setPriceRange({ min: '', max: '' })
        setMinRating(0)
    }

    const activeFiltersCount = [
        selectedCategory !== 'all',
        sortBy !== 'default',
        priceRange.min || priceRange.max,
        minRating > 0
    ].filter(Boolean).length

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Our Products</h1>
                    <p className={styles.subtitle}>
                        Discover amazing products ({filteredProducts.length} items)
                    </p>
                </div>

                {/* Mobile Filter Toggle */}
                <button 
                    className={styles.mobileFilterToggle}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter size={20} />
                    Filters
                    {activeFiltersCount > 0 && (
                        <span className={styles.filterBadge}>{activeFiltersCount}</span>
                    )}
                </button>
            </div>

            <div className={styles.contentWrapper}>
                {/* Filter Sidebar */}
                <div className={`${styles.filterSidebar} ${showFilters ? styles.showMobile : ''}`}>
                    <div className={styles.filterHeader}>
                        <h3 className={styles.filterTitle}>
                            <Filter size={18} />
                            Filters & Sort
                        </h3>
                        {activeFiltersCount > 0 && (
                            <button className={styles.resetButton} onClick={resetFilters}>
                                <X size={16} />
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Category Filter */}
                    <div className={styles.filterGroup}>
                        <label htmlFor="category-select" className={styles.filterLabel}>Category</label>
                        <div className={styles.selectWrapper}>
                            <select 
                                id="category-select"
                                name="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="all">All Categories</option>
                                {productsCategories.map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={16} className={styles.selectIcon} />
                        </div>
                    </div>

                    {/* Sort By */}
                    <div className={styles.filterGroup}>
                        <label htmlFor="sort-select" className={styles.filterLabel}>Sort By</label>
                        <div className={styles.selectWrapper}>
                            <select 
                                id="sort-select"
                                name="sortBy"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="default">Default</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating-high">Rating: High to Low</option>
                                <option value="rating-low">Rating: Low to High</option>
                                <option value="name-az">Name: A to Z</option>
                                <option value="name-za">Name: Z to A</option>
                            </select>
                            <ChevronDown size={16} className={styles.selectIcon} />
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className={styles.filterGroup}>
                        <fieldset className={styles.priceFieldset}>
                            <legend className={styles.filterLabel}>Price Range</legend>
                            <div className={styles.priceRange}>
                                <label htmlFor="price-min" className={styles.srOnly}>Minimum price</label>
                                <input
                                    id="price-min"
                                    name="priceMin"
                                    type="number"
                                    placeholder="Min"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                    className={styles.priceInput}
                                    aria-label="Minimum price"
                                />
                                <span className={styles.priceSeparator}>-</span>
                                <label htmlFor="price-max" className={styles.srOnly}>Maximum price</label>
                                <input
                                    id="price-max"
                                    name="priceMax"
                                    type="number"
                                    placeholder="Max"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                    className={styles.priceInput}
                                    aria-label="Maximum price"
                                />
                            </div>
                        </fieldset>
                    </div>

                    {/* Rating Filter */}
                    <div className={styles.filterGroup}>
                        <fieldset className={styles.ratingFieldset}>
                            <legend className={styles.filterLabel}>Minimum Rating</legend>
                            <div className={styles.ratingFilter} role="radiogroup" aria-label="Minimum rating filter">
                                {[0, 1, 2, 3, 4].map(rating => (
                                    <button
                                        key={rating}
                                        id={`rating-${rating}`}
                                        name="minRating"
                                        onClick={() => setMinRating(rating)}
                                        className={`${styles.ratingButton} ${minRating === rating ? styles.active : ''}`}
                                        aria-pressed={minRating === rating}
                                        aria-label={rating === 0 ? 'Any rating' : `${rating} stars and above`}
                                        type="button"
                                    >
                                        {rating === 0 ? 'Any' : `${rating}+ ⭐`}
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </div>

                {/* Products Grid */}
                <div className={styles.productsSection}>
                    {/* Sort Bar (Desktop) */}
                    <div className={styles.sortBar}>
                        <div className={styles.resultCount}>
                            Showing {filteredProducts.length} of {products.length} products
                        </div>
                        <div className={styles.quickSort}>
                            <button 
                                onClick={() => setSortBy(sortBy === 'price-low' ? 'price-high' : 'price-low')}
                                className={styles.quickSortBtn}
                                aria-label={`Sort by price ${sortBy === 'price-low' ? 'high to low' : 'low to high'}`}
                            >
                                {sortBy === 'price-low' ? <SortDesc size={16} /> : <SortAsc size={16} />}
                                Price
                            </button>
                            <button 
                                onClick={() => setSortBy(sortBy === 'rating-high' ? 'rating-low' : 'rating-high')}
                                className={styles.quickSortBtn}
                                aria-label={`Sort by rating ${sortBy === 'rating-high' ? 'low to high' : 'high to low'}`}
                            >
                                {sortBy === 'rating-high' ? <SortDesc size={16} /> : <SortAsc size={16} />}
                                Rating
                            </button>
                        </div>
                    </div>

                    <div className={styles.productsGrid}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    desc={product.description}
                                    category={product.category}
                                    image={product.image}
                                    rating={product.rating}
                                />
                            ))
                        ) : (
                            <div className={styles.noResults}>
                                <Filter size={48} />
                                <h3>No products found</h3>
                                <p>Try adjusting your filters to see more results</p>
                                <button onClick={resetFilters} className={styles.resetResultsBtn}>
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Overlay */}
            {showFilters && (
                <div 
                    className={styles.mobileOverlay}
                    onClick={() => setShowFilters(false)}
                />
            )}
        </div>
    )
}

export default React.memo(ProductsPage)