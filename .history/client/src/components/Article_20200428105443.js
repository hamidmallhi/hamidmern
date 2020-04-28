import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import spinner from '../../spinner1.gif'
import {Link} from 'react-router-dom'


const Article = props => {
const [title, setTitle] = useState('')
const [article, setArticle] = useState('')
const [author, setAuthor] = useState('')

    useEffect(() => {
        axios.get(`/articles/${props.match.params.id}`)

        .then(res => [
            setTitle(res.data.title),
            setArticle(res.data.article),
            setAuthor(res.data.author)
        ])
        .catch(err => console.log(err))
     
    })

    return (
        <MainContainer>
        {!title || !article || !author ? (
                <img src={spinner} alt="loading.." />
            ) : (
                 <div>
                    <h2>{title}</h2>
                    <p>{article} </p>
                    <p className="badge badge-secondary p-2">{author} </p> 
                    <br/>
                    <Link to="/" type="submit" className="btn btn-primary">Back to Home</Link>
                 </div>
                )
        }
        </MainContainer> 
    )
}

export default Article

// main container

const MainContainer = styled.div`
margin: 6rem auto;
padding: 3rem 14rem;

h2 {
    text-align: center;
    font-weight: 900;
    color: var(--dark-green); 
}
img {
    width: 10rem;
    display: block;
    margin: 0 auto;
}

}
.btn-primary {
    background: var(--dark-green);
    border: none;
    &:hover {
        background: var(--light-green);
    }
}
`;

