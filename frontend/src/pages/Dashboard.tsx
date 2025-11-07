
const stats = [
  {
    label: "Ventas Totales",
    value: "$12,500",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v9m-7-7h14" /></svg>
    ),
    color: "from-blue-500 to-blue-400",
  },
  {
    label: "Productos Vendidos",
    value: "320",
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
    ),
    color: "from-green-500 to-green-400",
  },
  {
    label: "Nuevos Clientes",
    value: "8",
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
    ),
    color: "from-yellow-500 to-yellow-400",
  },
];

const Dashboard = () => {
  return (
    <div className="w-full">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-1">Dashboard</h1>
          <p className="text-gray-500 text-lg">Resumen general de tu sistema de ventas</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-block w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center text-white font-bold text-xl shadow-lg">JR</span>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border-t-4 bg-gradient-to-br ${stat.color} bg-opacity-10`}
          >
            <div className="mb-4">{stat.icon}</div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-gray-600 text-lg font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
