import React from "react"
const backend = 'http://192.168.0.129:8000'

export async function getAllBlogPosts(setArticleObjects, articlesLoaded={}){
    if (!getSlug() || getSlug() == 'manage'){ 
        articlesLoaded.current = true //prevents prevents multiple queries
        let url = backend+'/getall'
        var data = await fetch(url)
            .then( response => response.json())
        data.sort((a, b)=>b.id - a.id) //[highestId, ... ,lowestId]
        setArticleObjects(data)
    }
}

export async function getSingleBlogPosts(setContent,setPostBeingViewed){
    console.log('happening')
    let url = backend+'/get/'+getSlug()
    var data = await fetch(url)
        .then( response => response.json())

    setContent(blogJsonToHtml(data))
    setPostBeingViewed(data)
}

export async function searchBlogPosts(setArticleObjects, searchTerm){
    let url = backend+'/search?search='+searchTerm
    var data = await fetch(url)
        .then( response => response.json())
    if(data.length){
        data.sort((a, b)=>b.id - a.id) //[highestId, ... ,lowestId]
        setArticleObjects(data)
    } else {
        setArticleObjects([{title:'nopostsfound'}])
    }
}

export function blogJsonToHtml(blogData){
    var blogDataCopy = {...blogData}
    var index=0

    let parsedContent = blogDataCopy.content.map(data => {
        index++
        switch(data.type){
            case 'paragraph':
                return <p key={index} style={{alignSelf:'start'}}>{data.content}</p>
            case 'subtitle':
                return <div key={index} style={{fontSize:'120%',fontWeight:'bold', marginTop:21}}>{data.content}</div>
            case 'image':
                return <img key={index} className="contentImage" src={data.content}/>
            case 'ad':
                return null
        }
    })
    blogDataCopy.parsedContent = parsedContent
    return blogDataCopy
} 

export function getSlug(){
    //document.url doesnt work in firefox
    return window.location.href.split('/').splice(-1)[0]
}

export const copyArticle = articleObj =>{
    //spread operator doesn't pass by value for nested dynamic values (arrays, objects, etc)
    let articleCopy = {...articleObj}
    let contentCopy = [...articleObj.content]
    articleCopy.content = contentCopy
    return articleCopy
}

export async function sendData(article, method, id=''){
    let articleCopy = copyArticle(article)
    let response 
    if(method=='POST'){
        delete articleCopy.id
    }
    articleCopy.content = articleCopy.content.map( item => {
        delete item.key
        return item
    })
    try {
        response = await fetch(backend+'/'+method+id,{
        method:method,
        body: JSON.stringify(articleCopy),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    } catch (e){
        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
        response = {status:400}
    }
    return response
}
// 
export const postArticle = (articleObj, editedArticles, setNewlyCreatedArticles, setEditedArticles, newlyCreatedArticles, setShowNewArticleForm) => {//ae multiple renders happenning here?
    sendData(articleObj,'POST')
    .then(response =>{
        let status = response.status
        let editedArticlesCopy = {...editedArticles} 
        if(status >= 200 && status < 300){ 
            response.json().then(postId=>{
                delete editedArticlesCopy[articleObj.id]
                articleObj.id = postId
                articleObj.success = true
                setNewlyCreatedArticles([...newlyCreatedArticles,articleObj])
                setShowNewArticleForm(false)
            })   
        } else {
            editedArticlesCopy[articleObj.id].success = false
        }
        setEditedArticles(editedArticlesCopy)
    })
}

export const updateArticle = (articleObj, editedArticles, setEditedArticles) => {
    let lookupField = '/'+articleObj.id+'/'
    sendData(articleObj,'PATCH',lookupField)
    .then(response =>{
        let status = response.status
        let editedArticlesCopy = {...editedArticles} 
        if(status >= 200 && status < 300){ 
            editedArticlesCopy[articleObj.id].success = true
        } else {
            editedArticlesCopy[articleObj.id].success = false
        }
        setEditedArticles(editedArticlesCopy)
    })
}

export const deleteArticle = (articleObj, editedArticles, setEditedArticles, deletedArticles, setDeletedArticles) => {
    let id = articleObj.id
    let lookupField = '/'+id+'/'
    sendData(articleObj,'DELETE',lookupField)
    .then(response =>{
        let status = response.status
        let editedArticlesCopy = {...editedArticles}
        if(status >= 200 && status < 300){ 
            if (id in editedArticles){
                delete editedArticles[id]
            }
            setDeletedArticles([id,...deletedArticles])
        } else {
            editedArticlesCopy[articleObj.id].success = false
        }
        setEditedArticles(editedArticlesCopy)
    })
}

/*

{
    "title": "dfgkjdflkgjldf",
    "thumbnail": "https://healthstrategy.s3.ap-southeast-2.amazonaws.com/testImg8.jpg",
    "main_image": "https://healthstrategy.s3.ap-southeast-2.amazonaws.com/testImg8.jpg",
    "description": "hfghfghfghfgh", 
    "content":[
        {
            "type": "paragraph",
            "content": "The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox.The lazy dog jumped over the quick fox."
        },
        {
            "type": "image",
            "content": "testImg12.jpg"
        },
        {
            "type": "paragraph",
            "content": "Then the lazy dog went to sleep."
        },
        {
            "type": "subtitle",
            "content": "What Does It Mean?"
        },
        {
            "type": "paragraph",
            "content": "The lazy dog does not do much exercise. "
        }
    ]
}
*/