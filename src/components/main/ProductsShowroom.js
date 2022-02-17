import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductPreview from './ProductPreview'

const SPECIFIC_COLLECTION = ['inNewArrival', 'inNewCollection', 'onSale']
const SPECIFIC_CATEGORIES_OR_TAGS=['t-shirts', 't-shirt', 'polo-shirt', 'long-sleeve', 'short-sleeve', 'accessories', 'gadget', 'gadgets', 'sunglasses', 'shoes', 'footwear', 'sneakers', 'jackets', 'jeans', 'suit']
const TITLE_MAP = {
    inNewArrival: 'New Arrival',
    inNewCollection: 'New Collection',
    onSale: 'Price Drop',
    't-shirts': 'T-Shirts',
    'long-sleeve': 'Long Sleeve',
    'short-sleeve': 'Short Sleeve',
    'polo-shirt': 'Polo Shirts',
    accessories: 'Male Accessories',
    gadgets: 'Gadgets',
    gadget: 'Gadgets',
    sunglasses: 'Male Sunglasses',
    shoes: 'Male Shoes', 
    sneakers: 'Male Sneakers',
    footwear: 'Male Footwear',
    jacket: 'Jackets for Men',
    jeans: 'Jeans',
    suit: 'Suits for Men'
}

export default function ProductsShowroom() {
    const [productsToShow, setProductsToShow] = useState([])
    const { tag } = useParams()
    const products = useSelector(state => state.products)

    const { items: foundItems, terms } = useSelector(state => state.searchedItems)
    useEffect(() => {
        if (tag === 'search-results') return setProductsToShow(foundItems)
        if (!SPECIFIC_COLLECTION.includes(tag) && !SPECIFIC_CATEGORIES_OR_TAGS.includes(tag)) return getAllProducts()
        if (SPECIFIC_COLLECTION.includes(tag)) return getSpecificTagProducts(tag)
        getSpecificCategoryProducts(tag)
    }, [tag, terms, products])

    function getAllProducts() {
        setProductsToShow(products)
    }

    function getSpecificTagProducts(tag) {
        const correspondingProducts = products.filter(product => product[tag] === true)
        setProductsToShow(correspondingProducts)
    }

    function getSpecificCategoryProducts(tag) {
        const correspondingProducts = products.filter(product => product.category === tag || product.tags?.includes(tag))
        setProductsToShow(correspondingProducts)
    }

    return (
        <div className="showroom">
            <h2 className="text-2xl font-normal text-left">
                {tag === 'search-results'
                    ? (`Results: ${terms}`)
                    :   (SPECIFIC_COLLECTION.includes(tag) || SPECIFIC_CATEGORIES_OR_TAGS.includes(tag) 
                        ? TITLE_MAP[tag] 
                        : 'All items'
                        )
                }
            </h2>
            <div className="product-grid">
                {productsToShow?.map((product, index) => (
                    <ProductPreview key={`specific_item_${index}`} {...product} />
                ))} 
            </div>
        </div>
    ) 
}
