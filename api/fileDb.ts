import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Comment, CommentWithoutId,NewsItem, NewsWithoutId} from "./types";
const fileName = './db.json';
let dataNews: NewsItem[] = [];
let dataComment: Comment[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            const parsedData = JSON.parse(fileContents.toString());

            if(parsedData.news) {
                dataNews = parsedData.news;
            } else {
                dataNews = [];
            }

            if(parsedData.comments) {
                dataComment = parsedData.comments;
            } else {
                dataComment = [];
            }
        } catch (e) {
           dataNews = [];
           dataComment = [];
        }
    },
    async getItems() {
        const dataToGet = {
            news: dataNews,
            comments: dataComment,
        }
        return dataToGet;
    },

    async addComment(file: CommentWithoutId) {
        const id = crypto.randomUUID();
        const response = {id, ...file};

        dataComment.push(response);
        await this.save();

        return response;
    },
    async addNews(file: NewsWithoutId) {
        const id = crypto.randomUUID();
        const response = {id, ...file};
        dataNews.push(response);
        await this.save();

        return response;
    },
    async save() {
        const dataToSave = {
            news: dataNews,
            comments: dataComment,
        }
        return fs.writeFile(fileName, JSON.stringify(dataToSave));
    }
};

export default fileDb;