require("dotenv").config({ path: "../.env" });


const mongoose=require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url =process.env.ATLASDB_URL;

main ()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(mongo_url);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data =initData.data.map((obj) => ({...obj,owner:"68c028f99fb20fa5ad8ba055"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();
