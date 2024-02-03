import {Router} from 'express';
import {NewsWithoutId} from "../types";
import fileDb from "../fileDb";
const newsRouter = Router();
newsRouter.get('/', async (req, res)=>{
    try {
        const {news} = await fileDb.getItems();
        res.send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

newsRouter.get('/:id', async (req, res)=>{
    const {news} = await fileDb.getItems();
    const newsItem  = news.find(p => p.id === req.params.id);
    res.send(newsItem);
});

newsRouter.delete('/:id', async (req, res)=>{
    const {news} = await fileDb.getItems();
    const news_id = req.params.id;
    const idToDelete = news.findIndex(newsItem => newsItem.id === news_id);
    if (idToDelete !== -1) {
        news.splice(idToDelete,1);
        await fileDb.save();
        res.send(news);
    } else {
        res.status(404).send('News not found');
    }
});

newsRouter.post('/', async(req, res)=>{

    if(req.body.header && req.body.content) {
        const newsItem: NewsWithoutId = {
            header: req.body.header,
            content: req.body.content,

        };
        const newNewsItem = await fileDb.addNews(newsItem);
        res.send(newNewsItem);
    } else {
        res.status(404).send('Header and content are required');
    }

});

export default newsRouter;