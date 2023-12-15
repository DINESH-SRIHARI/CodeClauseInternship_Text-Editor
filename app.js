const bodyParser = require('body-parser')
const express=require('express')
const app=express()
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({exented:true}))
app.get('/',(req,res)=>{
    res.render('Welcome')
})
app.get('/doc',(req,res)=>{
    res.render('home')
})
app.post('/download',async(req,res)=>{
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
})
app.listen('5000',()=>{
    console.log('hi')
})