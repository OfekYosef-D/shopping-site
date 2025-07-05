import React, { useState, useRef, useEffect } from 'react';
import styles from './Navbar.module.css';
import { ShoppingBasket , Search, ShoppingCart, CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartDropdown from '../CartDropdown/CartDropdown';

const Navbar = ({ cartItemCount = 0, cart, cartStats, updateQuantity, removeFromCart, clearCart }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartRef = useRef(null);

    // Close cart when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setIsCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };
    return (
        <div className={styles.navbar}>
            <div className={styles.navContent}>
                <div className={styles.navLinks}>
                    <ShoppingBasket size={30} strokeWidth={2.5} />
                    <Link to="/" className={styles.navLink}>HOME</Link>
                    <Link to="/products" className={styles.navLink}>PRODUCTS</Link>
                    <Link to="/about" className={styles.navLink}>ABOUT</Link>
                </div>
                <div className={styles.rightIcons}>
                    <Link to="/search" className={styles.navLink}><Search size={24} strokeWidth={2.5}/></Link>
                    
                    {/* Cart Icon with Badge and Dropdown */}
                    <div className={styles.cartContainer} ref={cartRef}>
                        <button 
                            className={styles.cartButton}
                            onClick={toggleCart}
                            aria-label={`Shopping cart with ${cartItemCount} items`}
                            aria-expanded={isCartOpen}
                        >
                            <ShoppingCart size={24} strokeWidth={2.5}/>
                            {cartItemCount > 0 && (
                                <span className={styles.cartBadge}>{cartItemCount}</span>
                            )}
                        </button>
                        {isCartOpen && (
                            <CartDropdown 
                                onClose={() => setIsCartOpen(false)}
                                cart={cart}
                                cartStats={cartStats}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                clearCart={clearCart}
                            />
                        )}
                    </div>
                    
                    <Link to="/profile" className={styles.navLink}><CircleUserRound size={24} strokeWidth={2.5}/></Link>
                </div>
            </div>
            {/* <div className={styles.centeredLine}></div> */}
        </div>
    )
}

export default Navbar
