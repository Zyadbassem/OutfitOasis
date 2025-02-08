import React, {useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom'


function Header() {

    // Items list on phones and its functions
    const items =  ['Top', 'Trousers', 'Shoes']
    const sectionToShow = useRef()

    // Show Function
    const showOtherList = () => {
        sectionToShow.current.style.display = 'flex'
    }

    // Hide function
    const hideSideSection = () => {
        const sectionToHide = document.getElementById("hidden-section")
        sectionToHide.style.display = 'none'
    }

    return (
        <header 
            className='
            flex
            items-center
            justify-between
            w-full
            max-w-[1300px]
            px-5
            mx-auto
            fixed
            left-0
            right-0
            top-0
            pt-5
            bg-black
            h-20
            z-10'
        >

            {/** Logo */}
            <Link to="/">
                <h2 
                className='
                logo
                font-sans
                text-4xl'
                >
                    OUTFITOASIS
                </h2>
            </Link>

            {/** Nav Links */}
            <ul 
                className='
                hidden
                sm:flex
                justify-between
                w-[60%]
                text-[#878787]
                font-thin'
            >
                <Link to="/tops" className='hover:text-[#636363]'>
                    <li className='text-xs'>TOP</li>
                </Link>

                <Link href="" className='hover:text-[#636363]'> 
                    <li className='text-xs'>TROUSERS</li>
                </Link>

                <Link href="" className='hover:text-[#636363]'>
                    <li className='text-xs'>SHOES</li>
                </Link>

                <Link to="/login" className='hover:text-[#636363]'>
                    <li className='text-xs'>LOGIN</li>
                </Link>


                <Link to="/signup" className='hover:text-[#636363]'>
                    <li className='text-xs'>SIGNUP</li>
                </Link>
            </ul>

            {/** Button to show nav buttons on phones*/}
            <i className="fa-solid fa-bars block sm:hidden cursor-pointer" id='nav-button' onClick={showOtherList} />

            {/** Nav Links on Phones*/}
            <ul 
                id='hidden-section'
                ref={sectionToShow}
                className='
                fixed
                bg-black
                top-0
                left-0
                right-0
                h-full
                items-center
                justify-start
                flex-col
                text-3xl
                gap-6
                hidden
                font-sans'
            >
                <a onClick={hideSideSection} className='mt-10 ml-auto mr-5 cursor-pointer'>x</a>
                <a className='my-5 hover:text-[#636363]'>Tops</a>
                <a className='my-5 hover:text-[#636363]'>Trousers</a>
                <a className='my-5 hover:text-[#636363]'>Shoes</a>
                <Link to="/login">
                    <li className='my-5'>Login</li>
                </Link>
                <Link to="/signup">
                    <li className='my-5'>Signup</li>
                </Link>
            </ul>    

        </header>    
    )
}

export default Header