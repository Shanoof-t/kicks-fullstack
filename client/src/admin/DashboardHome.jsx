import {
  faBagShopping,
  faIndianRupeeSign,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrder } from "../features/common/allOrders/allOrdersAPI";
import { setOrderDetails } from "../features/Dashboard_Home/dashboardHomeSlice";
import { fetchStats } from "../features/Dashboard_Home/dashboardHomeAPI";

function DashboardHome() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.allOrders.data);

  useEffect(() => {
    dispatch(fetchAllOrder());
    dispatch(fetchStats());
  }, []);

  const totalRevenue = useSelector((state) => state.dashboardHome.totalRevenue);
  const totalProductPurchased = useSelector(
    (state) => state.dashboardHome.totalProductPurchased
  );

  useEffect(() => {
    dispatch(setOrderDetails({ totalOrders: orders.length }));
  }, [orders]);

  const initialChartData = {
    series: [
      {
        name: "Sale Graph",
        data: [],
      },
    ],
    options: {
      chart: {
        id: "realtime",
        type: "line",
        height: 350,
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        zoom: {
          enabled: false,
        },
      },
      xaxis: {
        type: "datetime",
        categories: [],
      },
      yaxis: {
        title: {
          text: "Sales Amount",
        },
      },
    },
  };

  const [chartData, setChartData] = useState(initialChartData);

  const updateChartData = () => {
    const salesByDate = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).getTime();
      acc[date] = (acc[date] || 0) + order.total_amount;
      return acc;
    }, {});

    const categories = Object.keys(salesByDate);
    const data = Object.values(salesByDate);
    setChartData((prevData) => ({
      ...prevData,
      series: [
        {
          name: "Sales Amount",
          data,
        },
      ],
      options: {
        ...prevData.options,
        xaxis: {
          categories: categories.map(Number),
        },
      },
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateChartData();
    }, 1000);
    return () => clearInterval(interval);
  }, [orders]);

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-10 text-gray-900">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        <div className="bg-white p-4 lg:p-6 rounded-3xl shadow-lg flex items-center justify-between hover:shadow-xl transition duration-300">
          <div>
            <h1 className="text-base lg:text-lg font-semibold text-center text-black">
              Total Revenue
            </h1>
            <div className="flex items-center gap-3 lg:gap-4 mt-2">
              <FontAwesomeIcon
                icon={faIndianRupeeSign}
                className="text-3xl lg:text-4xl text-blue-500"
              />
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                {totalRevenue}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-3xl shadow-lg flex items-center justify-between hover:shadow-xl transition duration-300">
          <div>
            <h1 className="text-base lg:text-lg font-semibold text-black">
              Total Product Purchased
            </h1>
            <div className="flex items-center gap-3 lg:gap-4 mt-2">
              <FontAwesomeIcon
                icon={faBagShopping}
                className="text-3xl lg:text-4xl text-green-500"
              />
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                {totalProductPurchased}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:gap-6 mb-8">
        <div className=" p-4 lg:p-6  ">
          <h1 className="text-lg lg:text-xl font-semibold mb-4 text-gray-800">
            Sales Graph
          </h1>
          <div>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="line"
              height="300"
            />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h1 className="text-lg lg:text-xl font-semibold text-gray-800">
            Recent Orders
          </h1>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-2 lg:py-4 lg:px-6">Customer Name</th>
              <th className="py-3 px-2 lg:py-4 lg:px-6">Order ID</th>
              <th className="py-3 px-2 lg:py-4 lg:px-6">Date</th>
              <th className="py-3 px-2 lg:py-4 lg:px-6">Payment Method</th>
              <th className="py-3 px-2 lg:py-4 lg:px-6">Status</th>
              <th className="py-3 px-2 lg:py-4 lg:px-6">Amount</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="border-b border-gray-200 py-2 px-2 lg:py-4 lg:px-6">{`${order.shipping_address.first_name} ${order.shipping_address.last_name}`}</td>
                <td className="border-b border-gray-200 py-2 px-2 lg:py-4 lg:px-6">
                  {order._id}
                </td>
                <td className="border-b border-gray-200 py-2 px-2 lg:py-4 lg:px-6">
                  {order.createdAt}
                </td>
                <td className="border-b border-gray-200 py-2 px-2 lg:py-4 lg:px-6">
                  {order.payment_method}
                </td>
                <td className="border-b border-gray-200 py-2 px-2 lg:py-4 lg:px-6">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      order.status === "placed" || "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border-b border-gray-200 py-2 px-2 lg:py-4 lg:px-6">
                  ${order.total_amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardHome;
