import React, { useState, useEffect, Suspense } from "react"
import {
  Button,
  Row,
  Col,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Select,
  Input
} from "@/components/ui"
import Papa from 'papaparse'
import LeadsImportTable from "@/modules/crm/leads/tables/LeadsImportTable"


const pageImport = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Importar Leads</h1>
      <p className="text-muted-foreground">
        Importa tus leads desde un archivo CSV o Excel
      </p>
      <div className="mt-4">
        <input type="file" accept=".csv, .xlsx" />
        <button className="btn btn-primary ml-2">Importar</button>
      </div>
    </div>
  )
}

export default pageImport
