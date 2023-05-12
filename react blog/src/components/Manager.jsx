import React, {useState,useRef} from "react";
import ArticleEditForm from "./ArticleEditForm";
import { postArticle, updateArticle, deleteArticle, copyArticle } from "./CRUD";

const Manager = (props) => {
    const [editedArticles, setEditedArticles] = useState({})
    const [newlyCreatedArticles, setNewlyCreatedArticles] = useState([])
    const [deletedArticles, setDeletedArticles] = useState([])
    const [showNewArticleForm, setShowNewArticleForm] = useState(false)
    const [newArticleForm, setNewArticleForm] = useState({
        id:-1,
        title:'',
        thumbnail:'',
        main_image:'',
        description:'',
        content:[]
    })
    
    const postHandle = obj => postArticle(obj, editedArticles, setNewlyCreatedArticles, setEditedArticles, newlyCreatedArticles, setShowNewArticleForm)
    const updateHandle = obj => updateArticle(obj, editedArticles, setEditedArticles)
    const deleteHandle = obj =>deleteArticle(obj, editedArticles, setEditedArticles, deletedArticles, setDeletedArticles)
    const articles = [...newlyCreatedArticles,...props.articleObjects].filter(obj=>!deletedArticles.includes(obj.id))
    
    const createArticleForm = (obj) => {
        if (obj.id in editedArticles){
            obj = editedArticles[obj.id]
        }
        return <ArticleEditForm  
            key={obj.id}
            obj = {obj}
            editedArticles = {editedArticles}
            setEditedArticles = {setEditedArticles}
            deletedArticles = {deletedArticles}
            setDeletedArticles = {setDeletedArticles}
            postHandle = {postHandle}
            updateHandle = {updateHandle}
            deleteHandle = {deleteHandle}
        />
    }
    const renderArticleForms = () =>{
        return articles.map(obj=>createArticleForm(obj))
    }
    return(
        <div style={{padding:'50px'}}>
            <button onClick={()=>{setShowNewArticleForm(!showNewArticleForm)}}>
                +New Article
            </button>
            {showNewArticleForm ? createArticleForm(newArticleForm) : ''}
            {renderArticleForms()}
        </div>
    )
}


export default Manager
