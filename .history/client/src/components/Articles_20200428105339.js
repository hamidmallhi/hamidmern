import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import spinner from '../../spinner1.gif'
import {Link} from 'react-router-dom'
import axios from 'axios'



const Articles = ({posts, getArticles}) => {
    
    // to run the function getArticles() in useEffect hook (from App.js through props)
    useEffect(getArticles, [])

    const [articles, setArticles] = useState([])

      // delete article by id
    const deleteArticle = id => {

        axios.delete(`/articles/${id}`)
        .then(res => alert(res.data))
        setArticles(articles.filter(article => article._id !== id))
        getArticles()
    }
    

    return (
        <MainContainer>
            {!posts.length ? <img src={spinner} alt="loading.." /> :

                posts.map((article, key) => (
                <div className="container" key={key}>
                
                <h2>{article.title}</h2>

                {(article.article).length > 500 ? 
                    (
                    <div>
                       { (article.article).substring(0, 500) }
                       <span> ...</span> 
                       <Link to={{
                        pathname: `/article/${article._id}`
                        }}>
                        <p>read more...</p>
                        </Link>
                    </div>
                    ) :
                    <p>
                        {article.article}
                    </p>
                }
                
                <span className="badge badge-secondary p-2">
                {article.author}
                </span>
                <div className="row my-5">
                    <div className="col-sm-2">
                        <Link to={`/update/${article._id}`} className="btn btn-outline-success">
                        Edit Article
                        </Link>
                    </div>
                    <div className="col-sm-2">
                        <button onClick={() => deleteArticle(article._id)} className="btn btn-outline-danger">
                        Delete Article
                        </button>
                    </div>
                </div>
                <hr />
                </div>
            ))}
        </MainContainer>
    )
}

export default Articles

// main container

const MainContainer = styled.div`
    margin: 7rem, 0;
    
    img {
        width: 10rem;
        display: block;
        margin: 0 auto;
    }
`;
