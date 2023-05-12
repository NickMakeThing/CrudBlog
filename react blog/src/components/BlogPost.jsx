import React, {useState, useEffect, useRef} from "react";
import { blogJsonToHtml, getSingleBlogPosts } from "./CRUD"
import './mediaQueries.css'
import './BlogPost.css'

const BlogPost = (props) => {
    const [content, setContent] = useState([])

    useEffect(()=>{
        if (props.postBeingViewed){
            setContent(blogJsonToHtml(props.postBeingViewed))
        } else {
            getSingleBlogPosts(setContent, props.setPostBeingViewed)
        }
        // return () => {
        //     // props.getPostsOnUnmount()
        // }
    },[])
    /* 
    content posted to database should follow the structure seen at bottom of CRUD.js
    */
    const date = Date(content.date).split(' ').slice(1,4).join(' ')
    return (
        <div className='blogpost-container'>
            <div className='blogpost-title-container'>
                <span className='blogpost-title'>{content.title}</span>
            </div>  
            <div className='blogpost-description'>
                <i style={{opacity:0.7}}>{content.description}</i>
                <div className='blogpost-date'>{date}</div>
            </div>
           
            {/* when i use % on max width, it shifts it to the left when encapsulated by another div */}
            <img className='mainImage' src={content.main_image}/>

            <div className='blogpost-content'>
                {content.parsedContent}
            </div>
        </div>
    )
}

export default BlogPost
