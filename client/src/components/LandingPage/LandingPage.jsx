import React from 'react'
import styles from './LandingPage.module.css'
import Button from '../Button/Button'
import { Search } from 'lucide-react'

const LandingPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.title}>
                    Discover a smarter way to <br />shop online
                </div>
                <div className={styles.subtitle}>
                    Browse, select, and enjoy seamless shopping!
                </div>
                <div className={styles.searchGroup}>
                    <div className={styles.searchInputWrapper}>
                        <input type="search" placeholder="What do you want to buy?" className={styles.searchInput} />
                        <Search size={20} strokeWidth={2.5} className={styles.searchIcon} />
                    </div>
                    <Button name="Find" className={styles.searchButton} />
                </div>
            </div>
            <div className={styles.imageContainer}>
                <img src='/images/womanbags-unsplash.jpg' alt="Shopping" />
            </div>
        </div>
    )
}

export default LandingPage
