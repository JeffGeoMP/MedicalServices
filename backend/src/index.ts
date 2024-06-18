import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', require('./routes/routes.login'));
app.use('/promotions', require('./routes/routes.promotions'));
app.use('/assistance', require('./routes/routes.assistance'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
