const express = require('express');
const app = express();
const path = require('path');

const workingHoursMiddleware = (req, res, next) => {
    const currentDate = new Date();
    const day = currentDate.getDay(); 
    const hour = currentDate.getHours(); 

    if (day >= 1 && day <=  5 && hour >= 9 && hour < 17) {
        next(); 
    } else {
        res.send('<h1>Sorry, the website is only available during working hours (Monday to Friday, 9 AM to 5 PM).</h1>');
    }
};


app.use(workingHoursMiddleware);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
