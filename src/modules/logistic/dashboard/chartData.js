export const barChartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Unidades Vendidas",
        data: [50, 75, 60, 90, 100],
        backgroundColor: "#3b82f6",
      },
    ],
  };
  
  export const lineChartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Rendimiento por Producto",
        data: [30, 45, 60, 40, 70],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };