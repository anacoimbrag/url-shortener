import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';
import next from "next"
import { createServer } from 'http'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const urlCode = req.query.hash;
    const item = await req.db.collection(`url`).findOne({ urlCode: urlCode })
    console.log('url to redirect', item)
    res.writeHead(302, {
        'Location': item.originalUrl
    });
    res.end();
})

export default (req, res) => handler.apply(req, res)