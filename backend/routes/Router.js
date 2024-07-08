import express from "express";
import {
  Initializer,
  getPieChartData,
  getSearchedTransactions,
  getStatisticsData,
  getBarChartData,
  getCombinedData
} from "../controllers/TransactionController.js";

const router = express.Router();

router.get("/initialize", Initializer);
router.get("/searchedTransactions", getSearchedTransactions);
router.get('/piechart',getPieChartData)
router.get('/statistics',getStatisticsData)
router.get('/barchart',getBarChartData)
router.get('/combined',getCombinedData)


export default router;
