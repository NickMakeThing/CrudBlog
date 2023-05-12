import React, {useState,useRef} from "react";
import ArticleContentInput from "./ArticleContentInput";
import { copyArticle } from "./CRUD";
import './ArticleEditForm.css'
const ArticleContentForm = ({
    obj,
    contentShown,
    editedArticles, 
    setEditedArticles,
    createEdit,
}) => {
    const [contentTypeSelector, setContentTypeSelector] = useState('paragraph')
    const keyGenerator = useRef(0)
    
    if (!contentShown) {return}
    
    const addContent = (event, articleObj) =>{ 
        let articleCopy = {...articleObj}
        let newContent = {
            type:contentTypeSelector,
            content:''
        }
        articleCopy.content = [newContent, ...articleCopy.content] 
        setEditedArticles({...editedArticles, [articleObj.id]:articleCopy })
    }
    const renderContentInputs = () => { 
        return obj.content.map(item => {
            if(!('key' in item)){
                item.key = keyGenerator.current
                keyGenerator.current++
            }
            return <ArticleContentInput 
                key={item.key}
                obj={obj}
                item={item}
                editedArticles={editedArticles} 
                setEditedArticles={setEditedArticles}
                createEdit={createEdit}
            />
        })
    }
    return(
        <div>
            <div key={obj.id+'-content-add'}>
                <button onClick={event=>addContent(event,obj)}>
                    Add Content
                </button>
                <select name='type' defaultValue='paragraph' onChange={event=>setContentTypeSelector(event?.target.value)}>
                    <option value='paragraph'>paragraph</option>
                    <option value='image'>image</option>
                    <option value='subtitle'>subtitle</option>
                </select>
            </div>
            {renderContentInputs()}
        </div>
    )
}

export default ArticleContentForm