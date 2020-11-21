import express from 'express';

const app = express();

app.get('', async (req, res) => {
  res.json({
    msg: 'hello world',
  });
});

const server = app.listen(3000, () => {
  console.log('ready at http://localhost:3000');
})
