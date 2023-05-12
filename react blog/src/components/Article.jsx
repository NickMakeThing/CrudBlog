import React from "react";
import { Outlet, Link } from "react-router-dom";
import './Article.css'

const Article = (props) => {
    return (
        <div className='article'>
            <Link style={{textDecoration:'none'}} to={"/blog_post/"+props.postObj.title} onClick={()=>{props.setPostBeingViewed(props.postObj)}}>
                <img className='article-image' src={props.postObj.main_image} />
                <span className='article-title'>{props.postObj.title}</span>
            </Link>
            <div className='article-description'>{props.postObj.description}</div>
        </div>
    )
}

export default Article
