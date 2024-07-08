import { Transactions } from "../models/transactionsSchema.js";
import Axios from "axios";

export const Initializer = async (req, res) => {
  try {
    const response = await Axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;
    await Transactions.deleteMany();
    await Transactions.insertMany(transactions);
    res.status(200).json({ message: "Database initialized successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getSearchedTransactions = async (req, res) => {
  try {
    const { month } = req.query;

    const monthNumber = new Date(`${month} 1, 2022`).getMonth() + 1;

    const transactions = await Transactions.aggregate([
      {
        $addFields: {
          month: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          month: monthNumber,
        },
      },
    ]);

    console.log(transactions);
    console.log(month);
    console.log(monthNumber);

    return res.status(200).json(transactions);
  } catch (err) {
    console.log(err);
  }
};

export const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(`${month} 1, 2022`);
    const endDate = new Date(`${month} 30, 2022`);
    endDate.setMonth(endDate.getMonth() + 1);

    const categories = await Transactions.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getStatisticsData = async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2021`).getMonth() + 1;

    const totalSales = await Transactions.aggregate([
      {
        $addFields: {
          month: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          month: monthNumber,
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);

    const notSoldCount = await Transactions.aggregate([
      {
        $addFields: {
          month: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          month: monthNumber,
          sold: false,
        },
      },
      {
        $count: "notSoldCount",
      },
    ]);

    res.status(200).json({
      totalSales: totalSales[0] ? totalSales[0].total : 0,
      soldCount: totalSales[0] ? totalSales[0].count : 0,
      notSoldCount: notSoldCount[0] ? notSoldCount[0].notSoldCount : 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2022`).getMonth() + 1;

    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const results = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Transactions.aggregate([
          {
            $addFields: {
              month: { $month: "$dateOfSale" },
            },
          },
          {
            $match: {
              month: monthNumber,
              price: { $gte: range.min, $lte: range.max },
            },
          },
          {
            $count: "count",
          },
        ]);

        return { range: range.range, count: count[0] ? count[0].count : 0 };
      })
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getCombinedData = async(req,res)=>{
  try{
    const {month} = req.query;
    const PORT = 5000;

    const transactions = await Axios.get(`http://localhost:${PORT}/getSearchedTransactions`, { params: { month } });
    const statistics = await Axios.get(`http://localhost:${PORT}/statistics`, { params: { month } });
    const barChartData = await Axios.get(`http://localhost:${PORT}/barchart`, { params: { month } });
    const pieChartData = await Axios.get(`http://localhost:${PORT}/piechart`, { params: { month } });

    res.status(200).json({
      transactions: transactions.data,
      statistics: statistics.data,
      barChartData: barChartData.data,
      pieChartData: pieChartData.data
    });


  }
  catch(err){
    console.log(err)
  }
}