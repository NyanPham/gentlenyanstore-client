import React from 'react'
import { Link } from 'react-router-dom'
// import AddArticleButton from './CreateArticle'

export default function BlogArticlePreview(props) {
    const {
        id = null,
        title = null,
        articleImageURL = null,
        paraContent = null,
        isArticleCreator = false
    } = props

    return (
        <div className="w-full p-7 hover:shadow-lg hover:border hover:border-gray-300 hover:scale-105 transform transition">
            {isArticleCreator
                ? (
                    <Link
                        to='/blog/create-article'
                        className="w-full h-52 flex justify-center items-center bg-gray-200 hover:opacity-70 transition text-5xl"
                    >
                        +
                    </Link>
                )
                : (
                    <Link  
                        to={`/blog/${id}`}
                        className="w-full h-52 flex justify-center items-center bg-gray-200 hover:opacity-70 transition"
                    >
                        <img className="max-w-full max-h-full" src={articleImageURL} alt={title} />
                    </Link>
                )
            }
            <h3 className="text-base font-semibold mt-7">{isArticleCreator ? 'Add new article' : title}</h3>
            {isArticleCreator 
                ? (null)
                : (
                    <>
                    <p className="h-16 overflow-hidden text-ellipsis text-sm font-light mt-2">{paraContent[0].paragraph}...</p>
                    <Link to={`/blog/${id}`}>
                        <button className="mt-2 text-red-500 hover:text-red-400 active:text-red-600 transition">Read more</button>
                    </Link>
                    </>
                )
            }
            
        </div>
    )
}
