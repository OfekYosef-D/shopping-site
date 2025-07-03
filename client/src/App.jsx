import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'


function App() {
  const [productsCategories, setProductsCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories')
        const categories = await response.json()
        setProductsCategories(categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const productsData = await response.json()
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setProductsLoading(false)
      }
    }

    fetchProducts()
  }, [])
  

  return (
    <>
      <Navbar />
      <main>
        {/* Outlet renders the child route components */}
        <Outlet context={{ productsCategories, loading, products, productsLoading }} />
      </main>
    </>
  )
}

export default App
