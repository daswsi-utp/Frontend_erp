"use client"
import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/shared/button";
import Spinner  from "@/components/shared/Spinner";
import { uniqBy } from "@/lib/auxiliarFunctions";
import Papa from 'papaparse';
import LeadsImportTable from "@/modules/crm/leads/import/tables/LeadsImportTable";
import AppDropzone from "@/components/Dropzones/AppDropzone";
import useCrud1 from "@/hooks/useCrud1";

const acceptParams = {
  'text/csv': ['.csv']
}

const dataTable = {
  _header: [
    { label: "Nombres", key: "first_name" },
    { label: "Apellidos", key: "last_name" },
    { label: "Correo Electrónico", key: "email" },
    { label: "Teléfono", key: "phone" },
    { label: "WhatsAPP", key: "whatsapp" },
    { label: "Pais", key: "country" },
    { label: "Ciudad", key: "ciudad" },
    { label: "Curso de Interés", key: "course" },
    { label: "id curso", key: "course_id" }
  ],
  _buttons: [
    { name: "Editar", function: "" },
    { name: "Eliminar", function: "" },
    { name: "Ver", function: "" }
  ],
  _data: []
}

const LeadsManualImport = () => {
  const [realFiles, setRealFiles] = useState(null)
  const [parsedCsvData, setParsedCsvData] = useState([])
  const [showTable, setShowTable] = useState(false)
  const [productsAvailable, setProductsAvailable] = useState([])

  const { getModel } = useCrud1()

  const parseFiles = (_files) => {
    const filesData = []
    let finalData = []
    Promise.all([..._files].map((file) =>
      new Promise((resolve, reject) =>
        Papa.parse(file, {
          header: true,
          complete: resolve,  
          error: reject,
        }),
      )),
    ).then((results) => {
      results.forEach((result) => {
        filesData.push(result.data.slice(0, result.data.length))
      })
      let auxData = uniqBy(filesData, JSON.stringify)
      auxData.forEach((data_x) => {
        data_x.forEach((data_y) => {
          if (data_y.phone_number && data_y.phone_number.length >= 9) {
            finalData.push(data_y)
          }
        })
      })
      setParsedCsvData(finalData)
      dataTable._data = finalData
    }).catch((err) => console.log('Ocurrió un error:', err))
  }

  const processData = () => {
    parseFiles(realFiles)
    setShowTable(true)
  }

  const loadData = async () => {
    try {
      const response = await getModel("/api/v1/general/products/active")
      setProductsAvailable(response.products || [])
    } catch (error) {
      console.error("Error loading products:", error)
      setProductsAvailable([])
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 dark:bg-gray-800 dark:text-white dark:border-gray-600">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-xl font-semibold">Importar Leads</h2>
          <p className="text-gray-500 dark:text-gray-300">Ingrese solo archivos ".csv"</p>
        </div>
        <div className="py-4">
          <AppDropzone
            setRealFiles={setRealFiles}
            realFiles={realFiles}
            acceptParams={acceptParams}
          />

          {realFiles && realFiles.length > 0 && (
            <Button
              size="sm"
              variant="primary"
              className="float-right mt-4"
              onClick={() => processData()}
            >
              Procesar Datos
            </Button>
          )}

          <Suspense fallback={<Spinner color="primary" variant="grow" />}>
            {showTable && dataTable._data.length > 0 && productsAvailable.length > 0 && (
              <LeadsImportTable
                data={dataTable}
                productsAvailable={productsAvailable}
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default LeadsManualImport