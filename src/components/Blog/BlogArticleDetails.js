import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function BlogArticleDetails() {
    const { articleId } = useParams()
    const articles = useSelector(state => state.articles)
    const [currentArticle, setCurrentArticle] = useState()
    
    useEffect(() => {
        const article = articles.find(article => article.id === articleId)
        if (article) setCurrentArticle(article)
    }, [articleId, articles])

    const date = currentArticle?.createdAt.toDate().toLocaleDateString(
        undefined, {
            weekday: 'long', year: 'numeric', day: 'numeric', month: 'long'
        }
    )

    console.log(articleId)
    return (
        <div className="py-7 px-12">
            <h2 className="text-3xl pb-7 font-semibold text-blue-900 w-full border-b border-b-gray-400">{currentArticle?.title}</h2>
            <p className="text-base mt-3 text-gray-500 uppercase tracking-wider font-medium">{date}</p>
            <div className="text-base mt-5 space-y-12 text-gray-900 text-light leading-relaxed">
                {currentArticle?.paraContent.map(para => (
                    <div key={para.id} className="space-y-5">
                        <h3 className="text-xl font-semibold text-gray-900">{para.subtitle}</h3>
                        <p className="text-base leading-relaxed">{para.paragraph}</p>
                        {para.imageFileURL && (
                            <div className="w-3/5 mx-auto">
                                <img className="max-w-full max-h-full object-cover mx-auto" src={para.imageFileURL} alt={para.subtitle}/>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <p className="italic text-sm text-right mt-8">Written by: {currentArticle?.by}</p>
        </div>
    )
}
