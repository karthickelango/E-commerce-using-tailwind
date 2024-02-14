import React from 'react'
import DataContext from './context/DataContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PreviewPage from './PreviewPage'
import { openPreview } from './store/previewSlice'
import LoginForm from './LoginForm'

const Home = () => {
  const { isLoading } = useContext(DataContext)
  const productcolor = {
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: true, selected: false },
        { name: 'XS', inStock: true, selected: false },
        { name: 'S', inStock: true, selected: false },
        { name: 'M', inStock: true, selected: false },
        { name: 'L', inStock: true, selected: false },
        { name: 'XL', inStock: true, selected: false },
        { name: 'XXL', inStock: true, selected: false },
        { name: 'XXXL', inStock: false, selected: false },
    ],
}

  const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: '480',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
      productcolor
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: '350',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
      productcolor
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: '890',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
      productcolor
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '350',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      productcolor
    },
    {
      id: 5,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '350',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      productcolor
    },
    {
      id: 6,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '350',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      productcolor
    },
    {
      id: 7,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '350',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      productcolor
    },
    {
      id: 8,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '350',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      productcolor
    },
  ]
  const dispatch = useDispatch()
  const addToPreview = (product) => {
    dispatch(openPreview(product))
  }
  const { setOpen } = useContext(DataContext)
  return (
    <main>
      {!isLoading &&
        <div className='alignCenter'>
          <div class="bars"></div>
        </div>
      }
      {
        isLoading &&
        <>
          <div className="bg-white mt-150">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Products</h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8" onClick={() => setOpen(true)}>
                {products.map((product) => (
                  <div id={product.id} className="group" onClick={() => addToPreview(product)}>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg  xl:aspect-h-8 xl:aspect-w-7 position-relative">
                      <img
                        src={product.imageSrc}
                        className="h-full w-full res-image object-center"
                      />
                      <span className='quick-view bg-opacity-75'>Quick View</span>
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700 text-center">{product.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900 text-center">₹ {product.price}</p>
                  </div>
                ))}
              </div>
            </div>
            <PreviewPage></PreviewPage>
          </div>
        </>
      }
    </main>
  )
}

export default Home