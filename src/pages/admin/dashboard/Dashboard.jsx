import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const stats = {
    totalMovies: 128,
    totalUsers: 5420,
    totalTickets: 21450,
    revenue: 1350000000,
  };

  const revenueData = [
    { day: "T2", revenue: 120 },
    { day: "T3", revenue: 180 },
    { day: "T4", revenue: 150 },
    { day: "T5", revenue: 220 },
    { day: "T6", revenue: 300 },
    { day: "T7", revenue: 420 },
    { day: "CN", revenue: 380 },
  ];

  const formatMoney = (money) => money.toLocaleString("vi-VN") + " VNĐ";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">🎬 Dashboard hệ thống đặt vé</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">Tổng số phim</p>
          <p className="text-3xl font-bold mt-2">🎬 {stats.totalMovies}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">Người dùng</p>
          <p className="text-3xl font-bold mt-2">👥 {stats.totalUsers}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">Vé đã bán</p>
          <p className="text-3xl font-bold mt-2">🎟️ {stats.totalTickets}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">Doanh thu</p>
          <p className="text-2xl font-bold mt-2 text-green-600">
            💰 {formatMoney(stats.revenue)}
          </p>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          📈 Doanh thu theo ngày (triệu VNĐ)
        </h2>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
