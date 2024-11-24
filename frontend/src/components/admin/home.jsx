import React, { useState, useEffect } from "react";
import AdminSidebar from "./adminsidebar";
import { BarChart } from "@mui/x-charts/BarChart";
import { useOrderStore } from "../store/zorder";
import { toast } from "react-toastify";
import Loading from "../common/loading";
import {
  Button,
  Stack,
  TextField,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AdminHomePage = () => {
  const [summaryData, setSummaryData] = useState({
    total: 0,
    pending: 0,
    shipping: 0,
    shipped: 0,
    completed: 0,
  });

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "80px", display: "flex" }}>
        <div style={{ flex: 2 }}>
          <Charts setSummaryData={setSummaryData} />
        </div>
        {/* Cards Section */}
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <Cards summaryData={summaryData} />
        </div>
      </div>
    </div>
  );
};

function Charts({ setSummaryData }) {
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [chartData, setChartData] = useState({
    pending: Array(12).fill(0),
    shipping: Array(12).fill(0),
    completed: Array(12).fill(0),
  });

  const { fetchOrders, orders } = useOrderStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchOrders();
      } catch (error) {
        toast.error("Failed to fetch orders.");
        console.error("Fetch Orders Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchOrders]);

  useEffect(() => {
    if (orders.length > 0) {
      filterAndMapOrders();
    }
  }, [orders, startDate, endDate]);

  const filterAndMapOrders = () => {
    let filtered = orders;

    if (startDate) {
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) >= startDate.toDate()
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) <= endDate.toDate()
      );
    }

    setFilteredOrders(filtered);

    const summary = {
      total: filtered.length,
      pending: 0,
      shipping: 0,
      shipped: 0,
      completed: 0,
    };

    const data = {
      pending: Array(12).fill(0),
      shipping: Array(12).fill(0),
      completed: Array(12).fill(0),
    };

    filtered.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      switch (order.status) {
        case "pending":
          data.pending[month] += 1;
          summary.pending += 1;
          break;
        case "shipping":
          data.shipping[month] += 1;
          summary.shipping += 1;
          break;
        case "shipped":
          summary.shipped += 1;
          break;
        case "completed":
          data.completed[month] += 1;
          summary.completed += 1;
          break;
        default:
          break;
      }
    });

    setChartData(data);
    setSummaryData(summary);
  };

  const handleDateFilter = () => {
    filterAndMapOrders();
  };

  return loading ? (
    <Loading />
  ) : (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" spacing={2} mb={2}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button variant="contained" color="primary" onClick={handleDateFilter}>
            Filter
          </Button>
        </Stack>
      </LocalizationProvider>

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <BarChart
          width={1200}
          height={600}
          series={[
            { data: chartData.pending, label: "Pending", stack: "stack1" },
            { data: chartData.shipping, label: "Shipping", stack: "stack1" },
            { data: chartData.completed, label: "Completed" },
          ]}
          xAxis={[
            {
              data: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              scaleType: "band",
            },
          ]}
          yAxis={[
            {
              min: 0,
              max: 100,
              label: "Orders",
            },
          ]}
        />
      </div>
    </div>
  );
}

function Cards({ summaryData }) {
  const { total, pending, shipping, shipped, completed } = summaryData;

  return (
    <Stack spacing={2}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Orders Total
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Total Orders: {total}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Orders Pending
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Pending Orders: {pending}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Orders Shipping
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Shipping Orders: {shipping}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Orders Shipped
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Shipped Orders: {shipped}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Orders Completed
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Completed Orders: {completed}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
}

export default AdminHomePage;
