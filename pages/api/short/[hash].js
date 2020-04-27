import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    try {
        const urlCode = req.query.hash;
        console.log(urlCode)
        const item = await req.db.collection(`url`).findOne({ urlCode: urlCode })
        res.writeHead(302, { 'Location': item.originalUrl });
        res.end();
    } catch (err) {
        console.error(`Could not redirect`, err)
        res.status(400).end()
    }
})

export default (req, res) => handler.apply(req, res)