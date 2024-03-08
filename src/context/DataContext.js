import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/product'
import { v4 as uuidv4 } from 'uuid';



const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [categories, setCategories,] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const [reqType, setreqType] = useState('')
    const [open, setOpen] = useState(false)
    const [openSignin, setOpenSignIn] = useState(false)
    const [selectedColor, setSelectedColor] = useState('White')
    const [selectedSize, setSelectedSize] = useState('M')
    const [items, setItems] = useState([])

    const handelNavigate = (e) => {
        navigate('/cart')
    }
    const addToCart = (product, size, color) => {
        const existingItem = items.find(item => item.id === product.id && item.size === selectedSize && item.color === selectedColor)
        if (existingItem) {
            updateQuantity(existingItem.id, existingItem.color, 1)
            setOpen(false)
            return
        }
        const newItem = {
            id: uuidv4(),
            name: product.name,
            price: product.price,
            image: product.imageSrc,
            size: selectedSize,
            color: selectedColor,
            quantity: 1
        }
        setItems([newItem, ...items])
        setOpen(false)
    }
    // update quantity 
    const updateQuantity = (itemId, colorId, amount) => {
        setItems(items.map((item) => item.id === itemId && item.color === colorId ? { ...item, quantity: item.quantity + amount } : item).filter(item => item.quantity > 0))
    }
    
    return (
        <DataContext.Provider value={{
            products, isLoading, setIsLoading, handelNavigate, reqType, setreqType, categories, setCategories, open, setOpen, selectedColor,
            setSelectedColor, selectedSize, setSelectedSize, setOpenSignIn, openSignin, items, setItems, addToCart, updateQuantity
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext