import React, {useState, useEffect, useRef} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Article from "./components/Article"
import Header from "./components/Header"
import Footer from "./components/Footer"
import BlogPost from "./components/BlogPost"
import Manager from "./components/Manager"
import {createDummyArticles} from './testingUtility/testingFunctions'
import { getAllBlogPosts } from "./components/CRUD"
import './App.css'

// todo:
// put components in their own folders
// fixed: blank search wouldnt work
const App = () => {
    const [articleObjects, setArticleObjects] = useState([])
    const [postBeingViewed, setPostBeingViewed] = useState(null)
    const articlesLoaded = useRef(false)
    useEffect(()=>{
        if(!articlesLoaded.current){
            getAllBlogPosts(setArticleObjects,articlesLoaded)
        }
    },[postBeingViewed])
    
    // const getPostsOnUnmount = () => { 
    //     if(!articleObjects.length){
    //         getAllBlogPosts(setArticleObjects)
    //     }
    // }
    
    const articles = articleObjects.map(obj => {
        if(obj.title == 'nopostsfound'){
            return <div>
                No posts could be found from this search.
            </div>
        }
        return <Article key={obj.title} postObj={obj} setPostBeingViewed={setPostBeingViewed}/>
    })

    return (
        // problems:
        // no page load when going straight to post eg :http://localhost:5173/blog_post/Integer%20sit%20amet.
        <BrowserRouter>
            <div style={{fontFamily: 'Roboto'}}>
                <Header {...{setPostBeingViewed, postBeingViewed, setArticleObjects}}/>
                <Routes>
                    <Route index element={<div id='articles-container'>{articles}</div>}/>
                    <Route path="blog_post/:title" element={<BlogPost {...{setPostBeingViewed, postBeingViewed}}/>} /> {/* getPostsOnUnmount */}
                    <Route path="manage" element={<Manager articleObjects={articleObjects}/>}/>
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>  
    )
}

export default App
