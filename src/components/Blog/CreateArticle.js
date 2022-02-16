import React,  { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArticleGroup from './ArticleGroup'
import { addArticle } from '../../redux/actions/articleActions'
import { useDispatch, useSelector } from 'react-redux'

export const IMAGE_EXTENSIONS = ['image/jpg', 'image/jpeg', 'image/png']

export default function CreateArticle() {
    const [title, setTitle] = useState('')
    const [titleTouched, setTitleTouched] = useState(false)
    const [image, setImage] = useState('')
    const [mainImageFile, setMainImageFile] = useState()
    const [error, setError] = useState('')
    const [content, setContent] = useState([
        {
            id: '1',
            subtitle: '',
            paragraph: '',
            illustrator: undefined,
            imageFile: undefined
        }
    ])
    const [author, setAuthor] = useState('')
    const { loading, addError, successMessage } = useSelector(state => state.addArticleStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        if (successMessage !== '') {
            setTitle('')
            setTitleTouched(false)
            setImage('')
            setMainImageFile(null)
            setError('')
            setContent([{
                id: '1',
                subtitle: '',
                paragraph: '',
                illustrator: undefined,
                imageFile: undefined
            }])
        }
    }, [successMessage])

    function addArticleImage(e) {
        const file = e.target.files[0]
        if (!file || !IMAGE_EXTENSIONS.includes(file.type)) return alert("Please choose an image")
        const imageReader = new FileReader()
        imageReader.onload = () => {
            const image = imageReader.result
            setImage(image)
            setMainImageFile(file)
        }
        imageReader.readAsDataURL(file)
    }

    function addParagraph() {
        setContent(prevContent => {
            return [
                ...prevContent,
                {
                    id: `${prevContent.length + 1}`,
                    subtitle: '',
                    paragraph: '',
                    illustrator: undefined,
                    imageFile: undefined
                }
            ]
        })
    }

    function deleteParagraph(id) {
        const newContent = content.filter(p => p.id !== id)
        setContent(newContent)
    }

    function handleParagraphChange({id, name, value, imageFile}) {
        const newContent = [...content]
        const changedParagraph = newContent.find(p => p.id === id)
        changedParagraph[name] = value
        changedParagraph['imageFile'] = imageFile
        setContent(newContent)
    }

    function validate() {
        let isValid = true
        if (!title) isValid = false
        content.forEach(p => {
            if (!p.paragraph) isValid = false
        })

        return isValid
    } 

    function handleCreateArticle(e) {
        e.preventDefault()
        if (!validate()) return setError('Please fill in the fields below properly')
        dispatch(addArticle(title, mainImageFile, content, author))
    }

    return (                
        <div className="py-8 px-16 bg-white h-screen text-center">
        <div className="flex justify-start items-center">
            <Link to="/"><h2 className="text-3xl text-gray-500">GentleNyan</h2></Link>

        </div>
            <form className="text-center w-3/5 mx-auto mt-6 p-7 bg-white" onSubmit={handleCreateArticle}>
                <h2 className="text-3xl text-gray-900 font-bold">Add New Article</h2>
                {error && <p className='text-red-500'>{error}</p>}
                {addError && <p className='text-red-500'>{addError}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                <div className="form-group">
                    <label htmlFor="name" className="label">Article Title</label>
                    <input
                        className={`text-input ${titleTouched && !title ? 'border border-red-500' : ''}`}
                        placeholder='eg.ArticleOne'
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => setTitleTouched(true)}
                    />
                    {titleTouched && !title && <p className="text-sm text-red-500">Please enter the title</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="articleImage" className="label">Article Image</label>
                    <input
                        className="text-input"
                        placeholder='eg.ArticleOne'
                        type="file"
                        name="articleImage"
                        onChange={addArticleImage}
                    />
                    {image && <img src={image} alt={`TITLE_${title}`}/>}
                </div>
                {content.map(paragraph => (
                    <ArticleGroup key={paragraph.id} {...paragraph} handleParagraphChange={handleParagraphChange} handleDeleteParagraph={deleteParagraph}/>
                ))}
                <p 
                    className="text-xlg py-2 px-3 bg-gray-900 mt-7 text-gray-200 rounded-sm hover:bg-gray-800 active:bg-black w-fit"
                    onClick={addParagraph}
                >
                    Add paragraph
                </p>
                <div className="form-group flex flex-row justify-start items-center">
                    <label htmlFor="author" className="label">Article Author</label>
                    <select className="ml-2" value={author} onChange={(e) => setAuthor(e.target.value)}>
                        <option value='Jack Shepherd'>Jack Shepherd</option>
                        <option value='Mathew Fox' >Matthew Fox</option>
                        <option value='Nhan Pham'>Nhan Pham</option>
                    </select>
                </div>
                <button 
                    className="submit-button"
                    type="submit"
                    disabled={loading}
                >
                    Create Article
                </button>
            </form>
        </div>
    )
}
