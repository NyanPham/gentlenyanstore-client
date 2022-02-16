import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchItems, resetSearchItems } from '../../redux/actions/searchActions'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
    const [searchedTerms, setSearchedTerms] = useState('')
    const [searchedItems, setSearchedItems] = useState([])
    const [visible, setVisible] = useState(false)
    const searchBarRef = useRef()
    const items = useSelector(state => state.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (searchedItems.length === 0) {
            return dispatch(resetSearchItems())
        }
        dispatch(setSearchItems(searchedItems, searchedTerms))
        navigate('/items/search-results')
    }, [searchedTerms])

    useEffect(() => {
        if (visible) searchBarRef.current.focus()
    }, [visible])

    function toggleSearchBar() {
        setVisible(prevVisible => !prevVisible)
    }

    function handleInputBlur() {
        if (searchedTerms) return 
        setVisible(false)
    }

    function handleSearchedTermsChange(e) {
        const relevantItems = items.filter(item => {
            return  (
                        item.name.toLowerCase().includes(searchedTerms.toLowerCase())
                        || item.code.toLowerCase().includes(searchedTerms.toLowerCase())
                        || item.category.toLowerCase().includes(searchedTerms.toLowerCase())
                        || item.tags?.some(tag => tag.toLowerCase().includes(searchedTerms.toLowerCase()))
                    )
        })
        setSearchedTerms(e.target.value)
        setSearchedItems(relevantItems)
    }
    
    return (
        <div className="relative flex items-center">
            <FontAwesomeIcon icon={faSearch} className="function-icon" onClick={toggleSearchBar}/>
            <input 
                className={`text-input mt-0 py-1 px-2 absolute right-12 w-72 ${visible ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-3 opacity-0 pointer-events-none'} duration-300 transition transform md:w-36 lg:w-72`} 
                value={searchedTerms} 
                onChange={handleSearchedTermsChange} 
                onBlur={handleInputBlur}
                ref={searchBarRef}
            />
        </div>
  )
}
