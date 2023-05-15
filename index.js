
import express from "express";
import { MongoClient } from "mongodb";
import axios from "axios";
import cheerio from "cheerio";
import cors from "cors"
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());


// const MONGO_URL = "mongodb://127.0.0.1"; 
const MONGO_URL = 'mongodb+srv://Kalai1610:kalai1016@cluster0.8vjz3ac.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(MONGO_URL)
await client.connect();
console.log("Mongo is connected");


//Scrap the Amazon data...............

const amazonproducts = [];

const amazonfetchShelves = async () => {
    try {
        const response = await axios.get('https://www.amazon.com/s?crid=36QNR0DBY6M7J&k=shelves&ref=glow_cls&refresh=1&sprefix=s%2Caps%2C309');
        const html = response.data;
        const $ = cheerio.load(html);

        $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20').each((_idx, el) => {
            const shelf = $(el)
            const productImage = shelf.find('img.s-image').attr('src')
            const productName = shelf.find('span.a-size-base-plus.a-color-base.a-text-normal').text()
            const Ratings = shelf.find('div.a-section.a-spacing-none.a-spacing-top-micro > div > span').attr('aria-label');
            const productPrice = shelf.find('span.a-price > span.a-offscreen').text();
            amazonproducts.push({ productImage, productName, Ratings, productPrice })
        });

        return amazonproducts;
    } catch (error) {
        console.log(error)
    }
};
amazonfetchShelves().then((amazonproducts) => console.log(amazonproducts));

app.get("/amazon", async function (request, response) {
    const data = await client
        .db('amazon')
        .collection('amazonData')
        .find({}).toArray();
    response.send(data);
    console.log(data)
});

app.post("/amazon", async function (request, response) {
    const data = request.body;
    console.log(data)
    const res = await client.db('amazon').collection('amazonData').insertMany(amazonproducts);
    response.send(amazonproducts);
});

//Scrap the Snapdeal Data..............
const snapdealproducts = [];
const snapdealfetchShelves = async () => {
    try {
        const response = await axios.get('https://www.snapdeal.com/search?keyword=shelves&sort=rlvncy');
        const html = response.data;
        const $ = cheerio.load(html);

        // document.querySelector("#\\36 25156229564 > div.product-tuple-image > a > picture")
        // document.querySelector("#\\36 25156229564 > div.product-tuple-image")

        $('div.product-tuple-listing').each((_idx, el) => {
            const shelfs = $(el)
            const product_Image = shelfs.find('img.product-image').attr('src')
            const product_Name = shelfs.find('p.product-title').text()
            const product_Price = shelfs.find('span.product-price').text();
            const offer_Price = shelfs.find('div.product-discount>span').text();
            snapdealproducts.push({ product_Image, product_Name, product_Price, offer_Price })
        });

        return snapdealproducts;
    } catch (error) {
        console.log(error)
    }
};
snapdealfetchShelves().then((snapdealproducts) => console.log(snapdealproducts));

app.get("/snapdeal", async function (request, response) {
    const data = await client
        .db('snapdeal')
        .collection('snapdealData')
        .find({}).toArray();

    response.send(data);
    console.log(data)
});

app.post("/snapdeal", async function (request, response) {
    const data = request.body;
    console.log(data)
    const res = await client.db('snapdeal').collection('snapdealData').insertMany(snapdealproducts);
    response.send(snapdealproducts);
});

//Scrap the Flipkart Data.............

const flipkartproducts = [];
const flipkartfetchShelves = async () => {
    try {
        const response = await axios.get('https://www.flipkart.com/search?q=shelves');
        const html = response.data;
        const $ = cheerio.load(html);
     

        $('h1.yhB1nd span.B_NuCI').each((_idx, el) => {
            const shelfs = $(el)
            const product_Image = shelfs.find('img._396cs4').attr('src')
            const product_Name = shelfs.find('a.s1Q9rs').text()
            const product_Price = shelfs.find('div._30jeq3').text();
            const offer_Price = shelfs.find('div._3Ay6Sb>span').text();
            flipkartproducts.push({ product_Image, product_Name, product_Price, offer_Price })
        });

        return flipkartproducts;
    } catch (error) {
        console.log(error)
    }
};
flipkartfetchShelves().then((flipkartproducts) => console.log(flipkartproducts));

app.get("/flipkart", async function (request, response) {
    const data = await client
        .db('flipkart')
        .collection('flipkartData')
        .find({}).toArray();

    response.send(data);
    console.log(data)
});

app.post("/flipkart", async function (request, response) {
    const data = request.body;
    console.log(data)
    const res = await client.db('flipkart').collection('flipkartData').insertMany(flipkartproducts);
    response.send(flipkartproducts);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨✨✨✨✨`));


