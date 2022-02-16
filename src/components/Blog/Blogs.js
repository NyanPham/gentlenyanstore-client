import React from 'react'
import BlogArticlePreview from './BlogArticlePreview'
import { useSelector } from 'react-redux'

export default function Blogs() {
    const articles = useSelector(state => state.articles)
    const currentUser = useSelector(state => state.currentUser)
    console.log(articles)
    

    return (
        <div className="py-7 px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white">
            {articles.map((article, index)=> {
                return <BlogArticlePreview 
                    key={`article_${index}`}
                    {...article}
                />
            })}
            {currentUser?.uid === process.env.REACT_APP_FIREBASE_ADMIN_ID && (
                <BlogArticlePreview isArticleCreator={true}/>
            )}
        </div>
    )
}
