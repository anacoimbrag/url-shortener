import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
import shortid from 'shortid';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    const { originalUrl } = req.body;
    try {
        const item = await req.db.collection(`url`).findOne({ originalUrl: originalUrl })
        if (item)
            res.json(item)
        else {
            const hash = shortid.generate()
            const shortUrl = `http://url-shortner.anacoimbrag.now.sh/${hash}`
            const item = { originalUrl, shortUrl, urlCode: hash, updatedAt: new Date() }
            await req.db.collection('url').insertOne(item)
            res.json(item)
        }
    } catch (err) {
        console.error(`Error gerenrating url`, err)
    }
})

export default (req, res) => handler.apply(req, res)