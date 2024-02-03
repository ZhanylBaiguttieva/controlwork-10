import {Router} from 'express';
import {CommentWithoutId, NewsWithoutId} from "../types";
import fileDb from "../fileDb";
const commentsRouter = Router();
commentsRouter.get('/', async (req, res)=>{
    try {
        const news_id = req.query.news_id;
        const {comments} = await fileDb.getItems();
        const commentArray = comments.filter(p => p.news_id === news_id);
        res.send(commentArray);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

commentsRouter.delete('/:id', async (req, res)=>{
    const {comments, news} = await fileDb.getItems();
    const comment_id = req.params.id;
    const indexToDelete = comments.findIndex(comment => comment.id === comment_id);
    if (indexToDelete !== -1) {
        comments.splice(indexToDelete,1);
        await fileDb.save();
        res.send(comments);
    } else {
        res.status(404).send('Comment not found');
    }
});
commentsRouter.post('/', async(req, res)=>{

    if(req.body.news_id && req.body.description) {
        const comment: CommentWithoutId = {
            news_id: req.body.news_id,
            author: req.body.author,
            description: req.body.description,
        };
        const newComment = await fileDb.addComment(comment);
        res.send(newComment);
    } else {
        res.status(404).send('news_id and description are required');
    }
});

export default commentsRouter;