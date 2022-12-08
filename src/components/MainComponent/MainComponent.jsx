import styles from './MainComponent.module.css';

import { useState } from "react";
// import { Routes, Router, Link } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import BlogPost from "../BlogPost/BlogPost";
import RelatedPost from '../RelatedPost/RelatedPost';
import PostsPagination from "../PostsPagination/PostsPagination";
import Footer from "../Footer/Footer";


import { postsContent, randomRelatedPosts } from "../../postsContent.js";


function MainModule() {

  const [currentPostsPosition, setCurrentPostsPosition] = useState(0);
  
  const postsPaginationHandler = function(sideOrNumber) {

    if (typeof sideOrNumber === "number") {
      setCurrentPostsPosition(sideOrNumber);
    };

    if (sideOrNumber === "right" && currentPostsPosition < postsContent.length - 1) {
      setCurrentPostsPosition((previousState) => previousState + 1);
    };

    if (sideOrNumber === "left" && currentPostsPosition > 0) {
      setCurrentPostsPosition((previousState) => previousState - 1);
    };

  };


  // Assim não teremos line depois do último post.
  let penultimatePost;

  if (postsContent.at(currentPostsPosition).length === 3) {
    penultimatePost = 1;
  };

  if (postsContent.at(currentPostsPosition).length === 2) {
    penultimatePost = 0;
  };


  return (

    <article className={styles.mainModule}>

      {/***** NAVBAR *****/}
      <NavBar/>

      <div className={styles.flexContainer}>
        <div className={styles.postsContainer}>
          
          {/***** POSTS *****/}
          {postsContent
            .at(currentPostsPosition)
            .map((content, index) => {
              return (
                <div key={content.key}>
                  <BlogPost
                    postData={content}
                  />

                  {/* Render div line  before penultimate post */}
                  {index <= penultimatePost && <div className={styles.line}/>} 
          
                </div>
              )
          })}
        </div>

        {/***** RELATED POSTS *****/}
        <aside className={styles.relatedPostsContainer}>

          <h2 className={styles.relatedPostsTitle}>Related Posts</h2>

          {randomRelatedPosts().map(related => {
            return (
              <RelatedPost
                key={related.key}
                relatedPostData={related}
              />
            )
          })}

        </aside>

      </div>

      <div className={styles.postsPaginationContainer}>
        {/***** POSTS PAGINATION *****/}
        <PostsPagination
          pages={postsContent}
          currentPostsPosition={currentPostsPosition}
          postsPaginationHandler={postsPaginationHandler}
        />

      </div>

      {/***** FOOTER *****/}
      <Footer/>

    </article>
  );
};

export default MainModule;