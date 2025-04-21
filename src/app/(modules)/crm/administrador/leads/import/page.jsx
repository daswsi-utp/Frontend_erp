import React from 'react'

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
