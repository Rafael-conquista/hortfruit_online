import axios from 'axios'

async function findAll(req, res, next) {
    try {
        const fruits = await axios.get('https://www.fruityvice.com/api/fruit/all')
        return res.status(200).json(fruits.data)
    } catch(error) {
        return res.status(error.response?.status || 500).json({error: error.response?.data?.error || "The request could not have been finished"})
    }
}

export { findAll };