const app = require('./app');

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = 3000;
app.listen(port, () => {
    console.log(`app listening on ${port}`);
})