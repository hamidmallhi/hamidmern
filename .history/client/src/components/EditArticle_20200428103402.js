import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'



const EditArticle = props => {
const [title, setTitle] = useState('')
const [article, setArticle] = useState('')
const [author, setAuthor] = useState('')
const [message, setMessage] = useState('') 


    const changeOnClick = e => {
        e.preventDefault()

        const articles = {
            title,
            article,
            author
        }

        setTitle('')
        setArticle('')
        setAuthor('')

        axios
        .put(`/articles/update/${props.match.params.id}`, articles) 
        .then(res => setMessage((res.data === "Article is posted successfully" ? res.data="Article is updated successfully" 
        : res.data=”Update Error")))
        // .then(message === "Article is posted successfully" ? message="Article is updated successfully" : "")
        .catch(err => {
            console.log(err)  
        })
      
    }

    useEffect(() => {
        axios.get(`/articles/${props.match.params.id}`)

        .then(res => [
            setTitle(res.data.title),
            setArticle(res.data.article),
            setAuthor(res.data.author)
        ])
        .catch(err => console.log(err))
     
    },[props])  
    
    return (
        <AddArticleContainer>
        <div className="container">  
        <h1>Update Article</h1>
        
        <span className="message">{message}</span> 

        <form onSubmit={changeOnClick} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input 
          type="text" 
          value={author}
          onChange={ e => setAuthor(e.target.value)}
          className="form-control" 
          placeholder="Author Name" 
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
          type="text" 
          value={title}
          onChange={ e => setTitle(e.target.value)}
          className="form-control" 
          placeholder="Title" />
        </div>
        <div className="form-group">
            <label htmlFor="article">Article</label>
            <textarea 
            value={article}
            onChange={ e => setArticle(e.target.value)}
            className="form-control" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update Article</button>
      </form>
      </div>
      </AddArticleContainer>
    )
}

export default EditArticle

// main container

const AddArticleContainer = styled.div`
    margin: 3rem auto;
    padding: 4rem;
    width: 31.25rem;

    h1 {
        font-weight: 900;
        color: var(--dark-green);
    }

    .btn-primary {
        margin-top: 2rem;
        background: var(--dark-green);
        border: none;
        &:hover {
            background: var(--light-green);
        }
    }
    .message {
        font_weight: 900;
        color: tomato;
         padding: 1rem 1rem 1rem 0;  
    }

`;


