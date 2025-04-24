"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
    Users,
    Target,
    DollarSign,
    Plus,
    Download,
    ChevronDown,
    Calendar,
    ArrowUpDown
} from "lucide-react";

const Icons = {
    users: Users,
    target: Target,
    dollarSign: DollarSign,
    plus: Plus,
    download: Download,
    chevronDown: ChevronDown,
    calendar: Calendar,
    sort: ArrowUpDown
};

const Dashboard = () => {
    const metrics = [
        { title: "Empleados Activos", value: "124", change: "+12%", icon: "users" },
        { title: "Departamentos", value: "36", icon: "target" },
        { title: "Valor generado por los empleados", value: "$48,250", change: "+18%", icon: "dollarSign" }
    ];

    const salesProcess = [
        { id: 1, name: "Contacto inicial", deals: 24, progress: 30 },
        { id: 2, name: "Presentación", deals: 18, progress: 50 },
        { id: 3, name: "Negociación", deals: 12, progress: 75 },
        { id: 4, name: "Cierre", deals: 8, progress: 90 }
    ];

    const recruitmentStages = [
        {
          id: 1,
          name: "Recepción de CVs",
          candidates: 45,
          progress: 100
        },
        {
          id: 2,
          name: "Preselección",
          candidates: 30,
          progress: 67
        },
        {
          id: 3,
          name: "Entrevista Técnica",
          candidates: 15,
          progress: 33
        },
        {
          id: 4,
          name: "Entrevista RH",
          candidates: 8,
          progress: 18
        },
        {
          id: 5,
          name: "Contratación",
          candidates: 4,
          progress: 9
        }
      ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                {metrics.map((metric) => (
                    <Card key={metric.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {metric.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metric.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {metric.change} vs mes anterior
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Proceso de Reclutacion</CardTitle>
                    <CardDescription>Etapas del reclutacion de ventas</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Etapa</TableHead>
                            <TableHead>Candidatos</TableHead>
                            <TableHead>Progreso</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recruitmentStages.map((stage) => (
                            <TableRow key={stage.id}>
                                <TableCell className="font-medium">{stage.name}</TableCell>
                                <TableCell>{stage.candidates}</TableCell>
                                <TableCell>
                                <Progress value={stage.progress} className="h-2" />
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
export default Dashboard;