import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    try {
        const urlCode = req.query.hash;
        console.log('mongodb', process.env.MONGODB_URI)
        console.log(urlCode)
        const item = await req.db.collection(`url`).findOne({ urlCode: urlCode })
        console.log('item', item)
        res.writeHead(302, { 'Location': item.originalUrl });
        res.end();
    } catch (err) {
        console.error(`Could not redirect`, err)
        res.status(400).end()
    }
})

export default (req, res) => handler.apply(req, res)