import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import shortid from 'shortid';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    const { originalUrl, baseUrl } = req.body;
    try {
        const item = await req.db.collection(`url`).findOne({ originalUrl: originalUrl })
        if (item)
            res.json(item)
        else {
            const hash = shortid.generate()
            const shortUrl = `${baseUrl}/${hash}`
            const item = { originalUrl, shortUrl, urlCode: hash, updatedAt: new Date() }
            await req.db.collection('url').insertOne(item)
            res.json(item)
        }
    } catch (err) {
        console.error(`Error gerenrating url`, err)
        res.status(400).send(err)
    }
})

export default (req, res) => handler.apply(req, res)