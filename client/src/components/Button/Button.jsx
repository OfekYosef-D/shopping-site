import React from 'react'
import styles from './Button.module.css' 

const Button = ({ name = "default", className = ""}) => {
  return (
    <>
      <button type="button" className={`${styles.btn} ${className}`}>
        {name}
      </button>
    </>
  )
}

export default Button
