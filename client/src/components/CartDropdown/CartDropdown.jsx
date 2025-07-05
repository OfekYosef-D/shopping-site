import React from 'react'
import styles from './CartDropdown.module.css'
import { Plus, Minus, Trash2, ShoppingBag, X } from 'lucide-react'

const CartDropdown = ({ onClose, cart, cartStats, updateQuantity, removeFromCart, clearCart }) => {
    console.log('CartDropdown rendered with cart:', cart)
    console.log('CartDropdown cartStats:', cartStats)

    const handleCheckout = () => {
        // TODO: Implement checkout logic
        alert(`Proceeding to checkout with ${cartStats.itemCount} items for $${cartStats.totalPrice.toFixed(2)}`)
        onClose()
    }

    if (cart.length === 0) {
        return (
            <div className={styles.cartDropdown}>
                <div className={styles.cartHeader}>
                    <h3 className={styles.cartTitle}>Shopping Cart</h3>
                    <button 
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close cart"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className={styles.emptyCart}>
                    <ShoppingBag size={48} className={styles.emptyIcon} />
                    <p className={styles.emptyText}>Your cart is empty</p>
                    <p className={styles.emptySubtext}>Add some products to get started!</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.cartDropdown}>
            <div className={styles.cartHeader}>
                <h3 className={styles.cartTitle}>Shopping Cart ({cartStats.itemCount})</h3>
                <button 
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close cart"
                >
                    <X size={20} />
                </button>
            </div>

            <div className={styles.cartItems}>
                {cart.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                        <div className={styles.itemImage}>
                            <img 
                                src={item.image} 
                                alt={item.title}
                                loading="lazy"
                            />
                        </div>
                        
                        <div className={styles.itemDetails}>
                            <h4 className={styles.itemTitle}>{item.title}</h4>
                            <p className={styles.itemCategory}>{item.category}</p>
                            <div className={styles.itemPrice}>
                                <span className={styles.unitPrice}>${item.price}</span>
                                {item.quantity > 1 && (
                                    <span className={styles.totalPrice}>
                                        Total: ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={styles.itemActions}>
                            <div className={styles.quantityControls}>
                                <button
                                    className={styles.quantityBtn}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    aria-label="Decrease quantity"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className={styles.quantity}>{item.quantity}</span>
                                <button
                                    className={styles.quantityBtn}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            
                            <button
                                className={styles.removeBtn}
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Remove ${item.title} from cart`}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.cartFooter}>
                <div className={styles.cartSummary}>
                    <div className={styles.totalSection}>
                        <span className={styles.totalLabel}>Total ({cartStats.itemCount} items):</span>
                        <span className={styles.totalAmount}>${cartStats.totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                <div className={styles.cartActions}>
                    <button
                        className={styles.clearCartBtn}
                        onClick={clearCart}
                        aria-label="Clear all items from cart"
                    >
                        Clear Cart
                    </button>
                    <button
                        className={styles.checkoutBtn}
                        onClick={handleCheckout}
                        aria-label="Proceed to checkout"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CartDropdown)
