'use client'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

ChartJS.register(ArcElement, Tooltip, Legend)

const ChartStatsUserByProduct = ({ stats, totalUniqueClients }) => {
  const chartData = {
    labels: stats.map(s => `${s.client_state_name} (${s.client_state_slug})`),
    datasets: [{
      data: stats.map(s => s.calls_count),
      backgroundColor: stats.map(s => s.color),
      borderWidth: 1
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const value = context.raw
            const percentage = ((value / total) * 100).toFixed(2)
            return `${context.label}: ${value} (${percentage}%)`
          }
        }
      }
    }
  }

  const calculatePercent = (value, total) => 
    total > 0 ? ((value / total) * 100).toFixed(2) : '0.00'

  const totalCalls = stats.reduce((sum, s) => sum + s.calls_count, 0)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Resumen de desempeño</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100%-60px)]">
        {/* Gráfico */}
        <div className="h-[350px] lg:h-full">
          <Pie 
            data={chartData} 
            options={chartOptions}
            className="w-full h-full"
          />
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Llamadas</TableHead>
                <TableHead className="text-right">Porcentaje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.map((stat) => (
                <TableRow key={stat.client_state_id}>
                  <TableCell className="flex items-center">
                    <span 
                      className="inline-block w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: stat.color }}
                    />
                    {stat.client_state_name}
                  </TableCell>
                  <TableCell className="text-right">{stat.calls_count}</TableCell>
                  <TableCell className="text-right">
                    {calculatePercent(stat.calls_count, totalCalls)}%
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-medium">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">{totalCalls}</TableCell>
                <TableCell className="text-right">100%</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="p-4 bg-muted/50 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium">Clientes únicos atendidos:</span>
              <span className="font-bold text-primary">{totalUniqueClients}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChartStatsUserByProduct