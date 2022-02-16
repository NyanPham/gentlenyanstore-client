import React, { useState } from 'react'
import { IMAGE_EXTENSIONS } from './CreateArticle'


export default function ArticleGroup({ id, subtitle, paragraph, illustrator, handleParagraphChange, handleDeleteParagraph }) {
    const [touched, setTouched] = useState({
        subtitle: false,
        paragraph: false
    })

    function handleInputChange(e) {
        if (e.type === 'blur') {
            return setTouched(prevTouched => {
                return {...prevTouched, [e.target.name]: true}
            })
        }
        if (e.target.name === 'illustrator') {
            return handleAddImage(e)
        } 
        handleParagraphChange({
            id,
            name: e.target.name,
            value: e.target.value
        })
    }

    function handleAddImage(e) {
        const file = e.target.files[0]
        if (!file) return
        if (!IMAGE_EXTENSIONS.includes(file.type)) return
        const imageReader = new FileReader()
        imageReader.onload = () => {
            const image = imageReader.result
            handleParagraphChange({
                id,
                name: e.target.name,
                value: image,
                imageFile: file
            })
        }
        imageReader.readAsDataURL(file)
    }

    return (
        <div className="article-group">
            <h3 className="text-2xl text-gray-900 mt-7">Paragraph {id}</h3>
            <div className="form-group">
                <label htmlFor="subtitle" className="label">Subtitle</label>
                <input
                    // className={`text-input ${touched.subtitle && !subtitle ? 'border-red-500 border' : ''}`}
                    className="text-input"
                    placeholder='eg.LoremIpsum'
                    type="text"
                    name="subtitle"
                    value={subtitle}
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                />
                {/* {touched.subtitle && !subtitle && <p className="text-red-500 text-sm">Please enter the subtitle</p>} */}
            </div>
            <div className="form-group">
                <label htmlFor="paragraph" className="label">Paragraph</label>
                <textarea 
                    className={`text-input ${touched.paragraph && !paragraph ? 'border-red-500 border' : ''}`}                   
                    id="paragraph" placeholder='eg.ArticleContent' 
                    name="paragraph"
                    value={paragraph}
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                />
                {touched.paragraph && !paragraph && <p className="text-red-500 text-sm">Please enter the paragraph</p>}
            </div>
            <div className="form-group">
                <label htmlFor="illustrator" className="label">Illustrator</label>
                <input
                    className="text-input"
                    type="file"
                    name="illustrator"
                    onChange={handleInputChange}
                />
                {illustrator && <img src={illustrator} alt={illustrator} />}
            </div>
            {id >= 2 && <button onClick={() => handleDeleteParagraph(id)}>Delete Paragraph</button>}
        </div>
    )
}
