import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/product'


const DataContext = createContext({})

const productDetails = {
    name: 'Basic Tee 6-Pack ',
    price: '$192',
    rating: 3.9,
    reviewCount: 117,
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
    imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
    colors: [
      { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
      { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
      { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
      { name: 'XXS', inStock: true },
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: 'XXL', inStock: true },
      { name: 'XXXL', inStock: false },
    ],
  }

  
export const DataProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [categories, setCategories,] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const [reqType, setreqType] = useState('')
    const [open, setOpen] = useState(false)
    const [selectedColor, setSelectedColor] = useState(productDetails.colors[0])
    const [selectedSize, setSelectedSize] = useState(productDetails.sizes[2])

    const handelNavigate = (e) => {
      navigate('/cart')
    }
    // product page
    // useEffect(() => {
    //   const fetchItems = async() => {
    //     try {
    //       const response = await api.get('products');
    //       setProducts(response.data)
    //     } catch(err) {
    //       console.log(err)
    //     }finally {
    //       setIsLoading(false)
    //     }
    //   }
    //   setTimeout(() => {
    //     (async() => fetchItems())()
    //   }, 3000)
    // })

 return (
    <DataContext.Provider value={{
        products, isLoading, setIsLoading, handelNavigate,reqType, setreqType, categories, setCategories, open, setOpen, selectedColor,
        setSelectedColor, selectedSize, setSelectedSize, productDetails
    }}>
        {children}
    </DataContext.Provider>
 )
}

export default DataContext