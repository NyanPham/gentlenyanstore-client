import { db, storage } from '../../firebase'
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    onSnapshot, 
    orderBy, 
    serverTimestamp, 
} from 'firebase/firestore' 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { formatDoc } from '../../helper'


const ACTIONS = {
    CREATE_ARTICLE_START: 'create-article-start',
    CREATE_ARTICLE_SUCCESS: 'create-article-success',
    CREATE_ARTICLE_FAILURE: 'create-article-failure',

    GET_ARTICLES: 'get-articles',
}


export function addArticle(title, articleImage, content, author) {
    return async function (dispatch) {

        const newArticle = {
            title: title,
            articleImageURL: undefined,
            paraContent: [],
            visibility: 'public',
            by: author
        }
        console.log(articleImage)
        dispatch({ type: ACTIONS.CREATE_ARTICLE_START })
        try {
            const articleImageRef = ref(storage, `images/articles/${title}/${articleImage.name}`)
            await uploadBytes(articleImageRef, articleImage)
            const articleImageURL = await getDownloadURL(articleImageRef)
            newArticle['articleImageURL'] = articleImageURL
            for (let para of content) {
                if (!para.imageFile) {
                    newArticle.paraContent.push({
                        id: para.id,
                        subtitle: para.subtitle,
                        paragraph: para.paragraph,
                        imageFileURL: ''
                    })
                } else {
                    const paraImageRef = ref(storage, `images/articles/${title}/${para.imageFile.name}`)
                    await uploadBytes(paraImageRef, para.imageFile)
                    const paraImageURL = await getDownloadURL(paraImageRef)
                    newArticle.paraContent.push({
                        id: para.id,
                        subtitle: para.subtitle,
                        paragraph: para.paragraph,
                        imageFileURL: paraImageURL
                    })
                }
                
            }
            await addDoc(collection(db, 'articles'), {
                ...newArticle,
                createdAt: serverTimestamp()
            })
            dispatch({ type: ACTIONS.CREATE_ARTICLE_SUCCESS })
        } catch (error) {
            dispatch({ type: ACTIONS.CREATE_ARTICLE_FAILURE })
            console.error(error)
        }
        
    }
}

export function getArticles() {
    return async function (dispatch) {
        const articlesQuery = query(collection(db, 'articles'), 
                                        where('visibility', '==', 'public'), 
                                        orderBy('createdAt', 'desc')
        )

        onSnapshot(articlesQuery, snapshot => {
            dispatch({
                type: ACTIONS.GET_ARTICLES,
                payload: {
                    articles: snapshot.docs.map(formatDoc)
                }
            })
        })
    }
}


export default ACTIONS