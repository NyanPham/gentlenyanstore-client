import React from 'react'
import myPortrait from '../../assets/my-portrait.png'

export default function About() {
    return (
        <>
            <div className="bg-blue-900 flex justify-center items-center">
                <div className="w-3/4 py-8 md:w-3/5">
                    <h2 className="text-center text-3xl text-blue-100">About us</h2>
                    <h3 className="text-xl text-blue-100 mt-7">What is GentleNyan?</h3>
                    <p className="text-base text-blue-400 mt-2 leading-loose">
                        GentleNyan is simply the premier destination for male fashion
                        driven by a mission to help men express themselves 
                        through relevant and inspiring style. We have delivered one-of-a-kind
                        shopping experiences, featuring an expertly curated assortment of fashion
                        and highly personalized customer service.
                    </p>
                    <h3 className="text-xl text-blue-100 mt-7">Contact information</h3>
                    <p className="text-base text-blue-400 mt-2 leading-loose">
                        To speak with the shop owner by phone, feel free to cal
                        (+84) 947-057-091. If you are from outside of Vietnam, 
                        please contact us via this email address: nhanphamdev@gmail.com
                    </p>
                </div>
            </div>
            <div className="bg-blue-200 flex justify-center items-center">
                <div className="w-3/4 py-14 md:w-3/5">
                    <h2 
                        className="text-gray-900 text-center font-bold text-3xl"
                    >
                        Ohayo, my name is <span className="text-blue-500">Nhan Pham</span>
                    </h2>
                    <div className="mt-3 flex flex-col justify-center items-center gap-7 md:flex-row">
                        <div className="w-6/12 h-6/12 rounded-md overflow-hidden order-2 md:w-3/12 md:h-3/12 md:order-1">
                            <img className="max-w-full max-h-full shadow-3xl" src={myPortrait} alt="Nyan's portrait" />
                        </div>
                        <div className="w-full order-1 md:w-9/12 md:order-2">
                            <p className="mt-7 text-gray-700 leading-loose">
                                I am the person who built this ecommerce site. 
                                I’ve been self-learning web development since 
                                August 2021 and I’m so in love with JavaScript. 
                                I went through 4 years of English Major, 
                                thus had no experience about programming in general. 
                                With the thoughts and passion in childhood memory, 
                                I gathered my courage to start studying to code on my own. Finally, I had reached to the point of feeling like home with JavaScript and built fun project with the language. 
                            </p>
                            <p className="mt-7 text-gray-700 leading-loose">
                                I also love human languages, that’s why I can speak 
                                English and a bit of Japanese. Not to boast but I 
                                passed the JLPT N2 in December, 2021. That means I was 
                                studying Japanese and coding at the same time. 
                                Those were hard days, yet I will always treasure 
                                and walk on my own path.
                            </p>
                        </div>
                    </div>    
                </div>
            </div>
            
        </>
    )
}
