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


const LoginForm = () => {
    const { setOpenSignIn, openSignin } = useContext(DataContext)
    const [isLogIn, setIsLogIn] = useState(true)

    const closeModel = () => {
        setOpenSignIn(false)
    }

    return (
        <main className='mt-150'>
            <Transition.Root show={openSignin} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpenSignIn}>
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
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            > {
                                    !isLogIn ? <Dialog.Panel className="flex transform text-left text-base transition w-80">
                                        <div className="relative flex items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                            <button
                                                type="button"
                                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                                onClick={() => closeModel()}>
                                                <span className="sr-only">Close</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                            <div className="border-gray-900/10">
                                                <h2 className="text-base font-semibold leading-7 text-gray-900">Looks like you're new here!</h2>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">Sign up with your mobile number to get started</p>

                                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                                    <div className="w-64">
                                                        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Mobile number</label>
                                                        <div className="mt-2">
                                                            <input id="number" name="number" type="number" autocomplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Continue
                                                </button>
                                                <h4 className='p-3 d-f-c fw-400' onClick={() => setIsLogIn(!isLogIn)}>
                                                    <span className='text-color-green'>Existing User? Sign in</span>
                                                </h4>
                                            </div>
                                        </div>
                                    </Dialog.Panel> : <Dialog.Panel className="flex transform text-left text-base transition w-80">
                                        <div className="relative flex items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                            <button
                                                type="button"
                                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                                onClick={() => closeModel()}>
                                                <span className="sr-only">Close</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                            <div className="border-gray-900/10">
                                                <h2 className="text-base font-semibold leading-7 text-gray-900">Welcome Back!</h2>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">Sign in with your mobile number to get started</p>

                                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                                    <div className="w-64">
                                                        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Mobile number</label>
                                                        <div className="mt-2">
                                                            <input id="number" name="number" type="number" autocomplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Sign in
                                                </button>
                                                <h4 className='p-3 d-f-c fw-400' onClick={() => setIsLogIn(!isLogIn)}>
                                                    <span className='text-color-green'>New User? Create an account</span>
                                                </h4>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                }

                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </main>
    )
}

export default LoginForm