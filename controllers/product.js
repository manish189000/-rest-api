// const Product = require("../models/product");

// const getAllProducts = async (req, res) => {
//   // console.log("file product.js line product.js", req.query);
//   // const myData = await Product.find({ name: "iphone" });

//   const { company, name, featured, sort, select } = req.query; // get company through req.query
//   const queryObject = {};

//   if (company) {
//     queryObject.company = company;
//     // console.log(queryObject.company);
//   }

//   // if (name) {
//   //   queryObject.name = name;
//   //   // console.log(queryObject.company);
//   // }
//   // using regexa for same filter functionality

//   // for sort

//   // queryObject.sort = sortFix;

//   if (sort) {
//     let sortFix = sort.replace(",", "");
//     apiData = apiData.sort(sortFix);
//   }

//   if (select) {
//     let sortFix = sort.replace(",", "");
//     apiData = apiData.select(select);
//   }

//   if (name) {
//     queryObject.name = { $regex: name, $options: "i" };
//     // console.log(queryObject.company);
//   }

//   let apiData = Product.find(queryObject);

//   if (featured) {
//     queryObject.featued = featured;
//   }

//   console.log(queryObject);
//   // const myData = await Product.find(req.query);
//   // const myData = await Product.find(queryObject);
//   const myData = await apiData.sort("sort");
//   // res.status(200).json({ msg: "I am getAllproducts" });
//   res.status(200).json({ myData });
// };

// const getAllProductsTesting = async (req, res) => {
//   console.log(req.query);
//   // const myData = await Product.find({ company: "apple" });
//   // const myData = await Product.find(req.query);//sorting the
//   const myData = await Product.find(req.query).sort("name -price");
//   // res.status(200).json({ msg: "I am getAllproductsTesting" });

//   res.status(200).json({ myData });
// };

// module.exports = { getAllProducts, getAllProductsTesting };

const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query; // get company through req.query
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (featured) {
    queryObject.featured = featured; // Fixed typo from 'featued' to 'featured'
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.replace(",", " ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.replace(",", " "); // Fixed typo from 'sort' to 'select'
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1; // Fixed typo from 'req.qurey.page' to 'req.query.page'
  let limit = Number(req.query.limit) || 3; // Fixed typo from 'req.qurey.limit' to 'req.query.limit'

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  const myData = await apiData;

  res.status(200).json({ myData, nbHits: myData.length });
};

const getAllProductsTesting = async (req, res) => {
  const { page = 1, limit = 10, sort = "name -price" } = req.query; // Added default sort and pagination

  const sortFix = sort.replace(",", " ");
  const skip = (Number(page) - 1) * Number(limit);

  const myData = await Product.find()
    .sort(sortFix)
    .skip(skip)
    .limit(Number(limit));

  res.status(200).json({ myData, nbHits: myData.length });
};

module.exports = { getAllProducts, getAllProductsTesting };
