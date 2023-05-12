import React from "react";
import { Outlet, Link } from "react-router-dom";
import Search from "./Search"
import './Header.css'
const Header = (props) => {

    const resetView = () =>{//brings back to list view
        if(props.postBeingViewed){
            props.setPostBeingViewed(null)
        }

    }
    return (
        <>   
            <div id='header-background'/>
            <div id='header'>
                <Link style={{textDecoration:'none',color:'black'}} to="/" onClick={resetView}>
                    <span style={{marginLeft:50}}>[]</span>
                    <span>CrudBlog</span>
                </Link>
                <Search setArticleObjects={props.setArticleObjects} emptySearch={props.emptySearch}/>
            </div>
        </>
    )
        // healthstrategy.world
}

export default Header
