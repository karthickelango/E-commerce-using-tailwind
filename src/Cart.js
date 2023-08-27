import React from 'react'
import { useSelector } from 'react-redux';
import { remove } from './store/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
    const products = useSelector(state => state.cart)
    const dispatch = useDispatch()

          const removeItem = (id) => {
            dispatch(remove(id))
          }
  return (
    <main className='mt-150'>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="bars"></div>

        { products.length > 0 ?
        <div>
        {products.map(product => (
           <> 
                <img src={product.imageSrc} id={product.id}></img>
                <button onClick={() => removeItem(product.id)}>Remove</button>
        </>
            
        ))}
        </div> : 
            <div className='alignCenter empty'>
            {/* <img className='emptyCart' src={Loader}/> */}
            <h5>Your cart is empty!</h5>
            <p>Add items to it now.</p>
            <Link to='/'>
            <button className='waves-effect chart-btn btn default-btn'>Shop now</button>
            </Link>
        </div>     
        }
        </div>
    </main>
    
  )
}

export default Cart