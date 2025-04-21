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

export const Icons = {
    users: Users,
    target: Target,
    dollarSign: DollarSign,
    plus: Plus,
    download: Download,
    chevronDown: ChevronDown,
    calendar: Calendar,
    sort: ArrowUpDown
};

export const Dashboard = () => {
    const metrics = [
        { title: "Clientes Activos", value: "124", change: "+12%", icon: "users" },
        { title: "Oportunidades", value: "36", change: "+5%", icon: "target" },
        { title: "Ventas Mes", value: "$48,250", change: "+18%", icon: "dollarSign" }
    ];

    const salesProcess = [
        { id: 1, name: "Contacto inicial", deals: 24, progress: 30 },
        { id: 2, name: "Presentación", deals: 18, progress: 50 },
        { id: 3, name: "Negociación", deals: 12, progress: 75 },
        { id: 4, name: "Cierre", deals: 8, progress: 90 }
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
                    <CardTitle>Proceso de ventas</CardTitle>
                    <CardDescription>Etapas del funnel de ventas</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Etapa</TableHead>
                                <TableHead>Oportunidades</TableHead>
                                <TableHead>Progreso</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {salesProcess.map((stage) => (
                                <TableRow key={stage.id}>
                                    <TableCell className="font-medium">{stage.name}</TableCell>
                                    <TableCell>{stage.deals}</TableCell>
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