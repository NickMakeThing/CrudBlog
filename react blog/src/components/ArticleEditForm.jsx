import React, {useState, useEffect, useRef} from "react";
import { postArticle, updateArticle, deleteArticle, copyArticle } from "./CRUD";
import ArticleContentForm from "./ArticleContentForm";
import './ArticleEditForm.css'

const ArticleEditForm = ({
    obj,
    editedArticles, 
    setEditedArticles,
    deletedArticles, 
    setDeletedArticles,
    postHandle,
    updateHandle,
    deleteHandle,
}) => {
    const [contentShown, setContentShown] = useState(null)

    const clickShowContent = postID => {
        if (contentShown == postID){
            setContentShown(null)
        } else {
            setContentShown(postID)
        }
    }

    const createEdit = (event,articleObj,sectionEdited,index=null) => {
        let newData = event.target.value
        let edit 
        if(articleObj.id in editedArticles){
            edit = {...editedArticles[articleObj.id]}
        } else {
            edit = {...articleObj}
        }
        if(sectionEdited == 'content'){
            edit[sectionEdited][index].content = newData
        } else {
            edit[sectionEdited] = newData
        }
        setEditedArticles({...editedArticles, [articleObj.id]:edit })
    }

    const renderButtons = obj => {
        if (obj.id == -1) {
            return <button onClick={()=>postHandle(obj)}>create</button>
        } else {
            return <>
                <button onClick={()=>updateHandle(obj)}>update</button>
                <button onClick={()=>deleteHandle(obj)}>delete</button>
            </>
        }
    }
    
    let crud = {status: '', color:''}
    if('success' in obj){
        if (obj.success){
            crud = {status: 'success', color:'green'}
        } else {
            crud = {status: 'failed', color:'red'}
        }
    } 
    return (
        <div className='edit-form'>
            <div className='form-item'>
                <b>title:</b>
                <input className='form-input' defaultValue={obj.title} onChange={event=>{createEdit(event,obj,'title')}}/> 
            </div>
            <div className='form-item'>
                <b>thumbnail:</b>
                <input className='form-input' defaultValue={obj.thumbnail} onChange={event=>{createEdit(event,obj,'thumbnail')}}/> 
            </div>
            <div className='form-item'>
                <b>main image:</b>
                <input className='form-input' defaultValue={obj.main_image} onChange={event=>{createEdit(event,obj,'main_image')}}/> 
            </div>
            <div className='form-item'>
                <b>description:</b>
                <input className='form-input' defaultValue={obj.description} onChange={event=>{createEdit(event,obj,'description')}}/> 
            </div>
            <div className='form-item'>
                <b>content:</b> <button onClick={()=>clickShowContent(obj.id)}>show</button>
                <div className='content-container'>
                    <ArticleContentForm 
                                obj = {obj}
                                contentShown = {contentShown}
                                editedArticles = {editedArticles}
                                setEditedArticles = {setEditedArticles}
                                createEdit = {createEdit}
                    />
                </div>
            </div>
            {renderButtons(obj)}
            <span style={{marginLeft:'10px', color:crud.color}}>
                {crud.status}
            </span>
        </div>
    )
}

export default ArticleEditForm