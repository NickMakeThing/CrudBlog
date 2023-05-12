import React, {useState, memo} from "react";
import { Outlet, Link } from "react-router-dom";
import { searchBlogPosts, getAllBlogPosts } from './CRUD'
import './Search.css'
const Search = memo((props) => {

    const [searchText, setSearchText] = useState('')
    
    const getSearchResults = () => {
        if(searchText){
            searchBlogPosts(props.setArticleObjects, searchText)
        } else {
            getAllBlogPosts(props.setArticleObjects)
        }
    } 

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            getSearchResults()
        }
    }

    return (
        <div id='search' >
            <input id='search-input' placeholder="Search" onKeyDown={handleEnterKey} onChange={e=>{setSearchText(e.target.value)}}/>
            <img style={{ cursor:'pointer', opacity:0.5}} height='15px' onClick={getSearchResults} src='https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg'/>
        </div> 
    )
})

export default Search

