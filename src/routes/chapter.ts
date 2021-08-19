import express from 'express';
import Chapter from '../models/chapter';

const router = express.Router();

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Chapter.find({moduleId: id}).then((data) => {
    res.json({
      statusCode: 200,
      payload: {
        chapters: data,
      },
    });
  });
})

router.post('/', (req, res) => {
  const {moduleId, value} = req.body;

  Chapter.create({name: value, moduleId: moduleId}).then((result) => res.json(result));
});

export default router;