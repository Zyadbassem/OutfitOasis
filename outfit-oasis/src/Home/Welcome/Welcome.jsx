import { useRef } from 'react';
import welcomeImage from '../../assets/welcomeimage.png'
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';

function Welcome() {
    
    //  Access our image that will be animated
    const itemToChangeOpacity = useRef()
    const sectionRef = useRef()


    // GSAP
    gsap.registerPlugin(useGSAP, ScrollTrigger)
    useGSAP(() => {
        
        // Whole Section
        gsap.fromTo(sectionRef.current,  
        {opacity: 0, y: 50}, 
        {    
           opacity: 1,
           y: 0,
           duration: 2,
           ease: 'power3.out'
        })

        // Image
        gsap.to(itemToChangeOpacity.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: itemToChangeOpacity.current,
                start: "top center",
                end: "bottom top",
                scrub: true
            }
        })

    })


    return(
            <section 
                className='
                welcome-section
                w-full
                max-w-[1300px]
                mx-auto
                h-full
                flex
                mt-[20%]
                border-x-0
                items-start
                p-6
                mb-11
                lg:mt-28'
            >

                {/** Main promotional  words*/}
                <div 
                ref={sectionRef}
                className='
                welcome-right-section
                mt-12
                flex
                flex-col
                items-start
                justify-start
                h-[50vh]
                w-[100%]
                mx-auto
                lg:w-auto
                lg:ml-auto
                lg:mx-0
                lg:mt-20
                lg:max-w-[50%]'>
                    <h2 className='text-xl mb-7 sm:text-3xl'>EXPLORE THE BEST ONLINE STORE</h2>
                    <p className='text-[12px] text-[#878787] max-w-72 font-thin sm:text-[18px] sm:max-w-[70%] lg:text-[15px] lg:max-w-max'>
                    Step into the ultimate destination for fashion lovers with our online clothing store! 
                    Discover a curated collection of stylish apparel for every occasion,
                    from casual wear to formal outfits that make a statement. 
                    Whether you’re looking for timeless classics or the latest trends, we have something for everyone.
                    With high-quality fabrics, unbeatable prices, and a seamless shopping experience,
                    finding your perfect look has never been easier.
                    Enjoy secure payments, fast delivery, and exceptional customer service.
                    Refresh your wardrobe today and explore the best in online fashion!
                    </p>
                </div>

                {/** Image div */}
                <div 
                    className='
                    welcome-image-div
                    w-80
                    border-t
                    border-r
                    rounded-[50%]
                    absolute
                    bottom-1
                    p-10
                    left-[-15%]
                    sm:w-80
                    lg:w-96
                    lg:left-0
                    lg:right-0
                    lg:mr-auto
                    xl:left-[8%]
                    2xl:left-[20%]' 
                    ref={itemToChangeOpacity}
                >
                    <img src={welcomeImage} alt="welcome-image" />
                </div>
            </section>
    )
}

export default Welcome