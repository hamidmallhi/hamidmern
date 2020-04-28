import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/layouts/Header'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Articles from './components/Articles'
import Article from './components/Article'
import AddArticle from './components/AddArticle'
import EditArticle from './components/EditArticle'


const App = () => {
  
  const [posts, setPosts] = useState([])

  const getArticles = () => {
    axios.get('/articles')
    .then(res => setPosts(res.data))
    .catch(err => console.log(err))
  }
  
  useEffect(() => {

    getArticles()

  },[])

  return (
      <div className="App">
        <Header />
        <Navbar />
          <Route exact path = "/" render={() => <Articles posts={posts} getArticles={getArticles} />} />
          <Route path = "/article/:id" render={(props) => <Article {...props} posts={posts}/>} />
          <Route path = "/update/:id" render={(props) => <EditArticle {...props} posts={posts}/>} />
          <Route path = "/add-article" component={AddArticle} />
          <Footer />
      </div>
  )
}


export default App;

