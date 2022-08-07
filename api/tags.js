const express = require('express');
const tagsRouter = express.Router();

const { getAllTags, getPostsbyTagName } = require('../db');

// const { client } = require('../db');

// ******This seemed to be breaking the script with a "getAllTags has already been declared" error but we were never told to remove it ?
// async function getAllTags() {
//     try {
//         const { rows } = await client.query (`        
//         SELECT * FROM tags
//         `);
//         return rows;
//     } catch (error) {
//         throw error;
//     }    
// };


tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
  
    res.send({
      tags
    });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    const tagName = req.params.tagName;
    try {
      // use our method to get posts by tag name from the db
      const posts = await getPostsbyTagName(tagName);
      // send out an object to the client { posts: // the posts }
      res.send({ posts })
    } catch ({ name, message }) {
      // forward the name and message to the error handler
      next ({ name, message });
    }
});

module.exports = tagsRouter;