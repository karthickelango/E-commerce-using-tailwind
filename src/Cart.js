import React from 'react'
import { useSelector } from 'react-redux';
import { remove } from './store/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './empty-cart.gif'

const Cart = () => {
  const products = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const Value = products.map(product => product.price)
  const result = Array.from(Value,Number);
  const totalValue = result.reduce((a,b) => a + b, 0)

  const removeItem = (id) => {
    dispatch(remove(id))
  }
  return (
    <main className='mt-150'>
      {products.length > 0 ?
        <div className='flex mx-auto max-w-7xl'>
          <div className="w-3/5 px-4 sm:px-6  lg:px-8 ">
          {products.map(product => (
            <>
            <div class="flex font-sans border-1 mb-40 p-20 br-5">
              <div class="flex-none w-48 relative">
                <img src={product.imageSrc} id={product.id} class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <button onClick={() => removeItem(product.id)}>Remove</button>
              </div>
              <form class="flex-auto p-6">
                <div class="flex flex-wrap">
                  <h1 class="flex-auto text-lg font-semibold text-slate-900">
                    {product.name}
                  </h1>
                  <div class="text-lg font-semibold text-slate-500">
                  ₹ {product.price}
                  </div>
                  <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                    In stock
                  </div>
                </div>
                <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                  <div class="space-x-2 flex text-sm" style={{alignItems: "baseline"}}>
                    <p className='w-9 h-9'>Size:</p>
                    <label>
                      <input class="sr-only peer" name="size" type="radio" value="xs" checked />
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                        S
                      </div>
                    </label>
                  </div>
                </div>
                <div class="flex space-x-4 mb-6 text-sm font-medium">
                  <div class="flex-auto flex space-x-4">
                    <button class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button"
                      onClick={() => removeItem(product.id)}>
                      Remove from bag
                    </button>
                  </div>
                </div>
              </form>
            </div>
            </>
          ))}
          </div>
          <div className="w-2/5 px-4 sm:px-6  lg:px-4 sticky-card">
          <div className='card font-sans border-1 mb-40 br-5'>
              <h5 className='br-1 p-3 text-start mt-0 color-secondary'>Price details</h5>
            <div className='p-3 d-f-j'>
              Price of ({products.length} items): <span className='text-end'>₹ {totalValue}</span>
            </div>
            <div className='p-3 d-f-j'>
            Discount: <span className='text-color-green'>₹ 0</span>
            </div>
            <div className='p-3 d-f-j'>
              Delivery Charges: <span className='text-color-green'>Free</span>
            </div>
            <div className='divider-dashed'></div>
            <div className='p-3 d-f-j fw-700'>
                Total value: <span>₹ {totalValue}</span>
            </div>
            <div className='divider-dashed'></div>
            <div className='p-3 d-f-j fw-700'>
            <span className='text-color-green'>You will save ₹0 on this order</span>
            </div>
            </div>
            </div>
        </div> :
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Your cart is empty!</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Add items to it now.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to='/' className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Go back to home
              </Link>
            </div>
          </div>
        </main>
      }
    </main>

  )
}

export default Cart