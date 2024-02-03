import express from 'express';

import cors from 'cors';
import fileDb from "./fileDb";
import commentsRouter from "./routers/comments";
import newsRouter from "./routers/news";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


app.use('/comments', commentsRouter);
app.use('/news', newsRouter);

const run  = async () => {

    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
}

void run();