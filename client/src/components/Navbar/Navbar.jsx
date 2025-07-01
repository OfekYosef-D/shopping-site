import React from 'react';
import styles from './Navbar.module.css';
import { ShoppingBasket , Search, ShoppingCart, CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                    <Link to="/cart" className={styles.navLink}><ShoppingCart size={24} strokeWidth={2.5}/></Link>
                    <Link to="/profile" className={styles.navLink}><CircleUserRound size={24} strokeWidth={2.5}/></Link>
                </div>
            </div>
            <div className={styles.centeredLine}></div>
        </div>
    )
}

export default Navbar
