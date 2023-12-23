const bodyParser = require('body-parser');
const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('Welcome');
});

app.get('/doc', (req, res) => {
    res.render('home');
});

app.post('/download', async (req, res) => {
    try {
        const { htmlContent } = req.body;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Your PDF generation logic goes here
        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf();

        await browser.close();

        // Send the PDF as a download
        res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
