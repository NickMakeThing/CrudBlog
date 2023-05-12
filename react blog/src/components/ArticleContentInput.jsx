import React, {useState,useRef} from "react";
import { copyArticle } from "./CRUD";
import './ArticleEditForm.css'

const ArticleContentInput = ({
    obj,
    item,
    editedArticles,
    setEditedArticles,
    createEdit,
}) => {

    const moveContent = (direction,articleObj,index) => {
        let articleCopy = copyArticle(articleObj) 
        let lastIndex = articleObj.content.length-1
        let contentItem = articleCopy.content.splice(index,1)[0]  
        if (direction == 'up' && index > 0) {
            articleCopy.content.splice(index-1,0,contentItem)
        } else if (direction == 'down' && index < lastIndex) {
            articleCopy.content.splice(index+1,0,contentItem)
        } else {
            return
        }
        setEditedArticles({...editedArticles, [articleObj.id]:articleCopy })
    }

    const deleteContent = (index,articleObj) => {
        let articleCopy = {...articleObj}
        articleCopy.content.splice(index,1)[0]   
        setEditedArticles({...editedArticles, [articleObj.id]:articleCopy })
    }
    
    let content = obj.content
    let input
    let index = content.indexOf(item) 
    if (item.type == 'paragraph'){
        input = <textarea className='form-input' defaultValue={item.content} onChange={event=>createEdit(event,obj,'content',index)}/>
    } else {
        input = <input className='form-input' defaultValue={item.content} onChange={event=>createEdit(event,obj,'content',index)}/>
    }

    return(
        <div className='form-item'>  
            <b>{item.type}</b>
            <button className='content-delete' onClick={()=>deleteContent(index,obj)}>delete</button>
            <span>
                <button onClick={()=>moveContent('up',obj,index)}>↑</button>
                <button onClick={()=>moveContent('down',obj,index)}>↓</button>
            </span>
            {input}
        </div>
    )
}

export default ArticleContentInput