import React, { useContext } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import DataContext from './context/DataContext'
import { useSelector } from 'react-redux'
import { add } from './store/cartSlice'
import { useDispatch } from 'react-redux'
import { removeItem } from './store/previewSlice'
import product from './api/product'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const PreviewPage = () => {
    const productDetails = useSelector(state => state.previewpage)
    const { open, setOpen, selectedColor,
        setSelectedColor, selectedSize, setSelectedSize, items, setItems } = useContext(DataContext)
    const dispatch = useDispatch()
    const addToCart = (product) => {
        const existingItem = items.find(item => item.id === product.id && item.size === selectedSize && item.color === selectedColor)  
        console.log(existingItem)
        if (existingItem) {
            updateQuantity(existingItem.id,existingItem.color, 1)
            setOpen(false)
            return
        }
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageSrc,
            size: selectedSize,
            color: selectedColor,
            quantity: 1
        }
        setItems([newItem, ...items])
        dispatch(removeItem(product.id))
        setOpen(false)
    }
    // update quantity 
    const updateQuantity = (itemId, colorId, amount) => {
        setItems(items.map((item) => item.id === itemId && item.color === colorId ? {...item, quantity: item.quantity + amount} : item).filter(item => item.quantity > 0))
    }
    const closeModel = (product) => {
        dispatch(removeItem(product.id))
        setOpen(false)
    }
    const getSize = (s) => {
        setSelectedSize(s)
    }
    const getColor = (s) => {
        setSelectedColor(s)
    }
    return (
        <main className='mt-150'>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        {
                                            productDetails.map(product => (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                                        onClick={() => closeModel(product)}>
                                                        <span className="sr-only">Close</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                                        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                                            <div id={product.id}>
                                                                <img src={product.imageSrc} alt={productDetails.imageAlt} className="object-cover object-center" />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-8 lg:col-span-7">
                                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>
                                                            <p className="text-2xl text-gray-900">₹ {product.price}</p>

                                                            <section aria-labelledby="options-heading" className="mt-10">
                                                                <h3 id="options-heading" className="sr-only">
                                                                    Product options
                                                                </h3>

                                                                {/* Colors */}
                                                                <div>
                                                                    <h4 className="text-sm font-medium text-gray-900">Color</h4>

                                                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                                                        <span className="flex items-center space-x-3">
                                                                            {product.productcolor.colors.map((color) => (
                                                                                <RadioGroup.Option
                                                                                    key={color.name}
                                                                                    value={color.name}
                                                                                    onClick={() => getColor(color.name)}
                                                                                    className={({ active, checked }) =>
                                                                                        classNames(
                                                                                            color.selectedClass,
                                                                                            active && checked ? 'ring ring-offset-1' : '',
                                                                                            !active && checked ? 'ring-2' : '',
                                                                                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <RadioGroup.Label as="span" className="sr-only">
                                                                                        {color.name}
                                                                                    </RadioGroup.Label>
                                                                                    <span
                                                                                        aria-hidden="true"
                                                                                        className={classNames(
                                                                                            color.class,
                                                                                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                                                        )}
                                                                                    />
                                                                                </RadioGroup.Option>
                                                                            ))}
                                                                        </span>
                                                                    </RadioGroup>
                                                                </div>

                                                                {/* Sizes */}
                                                                <div className="mt-10">
                                                                    <div className="flex items-center justify-between">
                                                                        <h4 className="text-sm font-medium text-gray-900">Size</h4>
                                                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                                            Size guide
                                                                        </a>
                                                                    </div>

                                                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                                                        <div className="grid grid-cols-4 gap-4">
                                                                            {product.productcolor.sizes.map((size) => (
                                                                                <RadioGroup.Option
                                                                                    key={size.name}
                                                                                    value={size.name}
                                                                                    disabled={!size.inStock}
                                                                                    onClick={() => getSize(size.name)}
                                                                                    className={({ active }) =>
                                                                                        classNames(
                                                                                            size.inStock
                                                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                                                            active ? 'ring-2 ring-indigo-500' : '',
                                                                                            ' relative flex items-center justify-center rounded-md py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                                                                        )
                                                                                    }
                                                                                    style={{ backgroundColor: selectedSize === size.name ? '#4f46e5' : ' ' }}
                                                                                >
                                                                                    {({ active, checked }) => (
                                                                                        <>
                                                                                            <RadioGroup.Label as="span" style={{ color: selectedSize === size.name ? 'white' : ' ' }}>{size.name}</RadioGroup.Label>
                                                                                            {size.inStock ? (
                                                                                                <span
                                                                                                    className={classNames(
                                                                                                        active ? 'border' : 'border-2',
                                                                                                        checked ? 'border-transparent' : 'border-transparent',
                                                                                                        'pointer-events-none absolute -inset-px rounded-md'
                                                                                                    )}
                                                                                                    aria-hidden="true"
                                                                                                />
                                                                                            ) : (
                                                                                                <span
                                                                                                    aria-hidden="true"
                                                                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                                                >
                                                                                                    <svg
                                                                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                                                        viewBox="0 0 100 100"
                                                                                                        preserveAspectRatio="none"
                                                                                                        stroke="currentColor"
                                                                                                    >
                                                                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                                                    </svg>
                                                                                                </span>
                                                                                            )}
                                                                                        </>
                                                                                    )}
                                                                                </RadioGroup.Option>
                                                                            ))}
                                                                        </div>
                                                                    </RadioGroup>
                                                                </div>
                                                                <div id={product.id}>
                                                                    <button
                                                                        onClick={() => addToCart(product)}
                                                                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                                    >
                                                                        Add to bag
                                                                    </button>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </main>
    )
}

export default PreviewPage