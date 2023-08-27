import React from 'react'
import { useSelector } from 'react-redux';
import { remove } from './store/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './empty-cart.gif'

const Cart = () => {
    const products = useSelector(state => state.cart)
    const dispatch = useDispatch()

          const removeItem = (id) => {
            dispatch(remove(id))
          }
  return (
    <main className='mt-150'>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        { products.length > 0 ?
        <div>
        {products.map(product => (
           <> 
                <img src={product.imageSrc} id={product.id}></img>
                <button onClick={() => removeItem(product.id)}>Remove</button>
        </>
            
        ))}
        </div> : 
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          {/* <img className='emptyCart' src={Loader}/> */}
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Your cart is empty!</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Add items to it now.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to='/' className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Go back home
              </Link>
            </div>
          </div>
        </main> 
        }
        </div>
    </main>
    
  )
}

export default Cart