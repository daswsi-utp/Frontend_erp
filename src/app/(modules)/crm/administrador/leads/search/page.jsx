'use client'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/shared/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import ResultsTable from '@/modules/crm/leads/search/tables/ResultsTable'
import useFetchLeads from '@/modules/crm/leads/search/hooks/useFetchLeads'

const Search = () => {
  const [searchParams, setSearchParams] = useState("")
  const [checkboxValues, setCheckboxValues] = useState({
    phone: true,
    whatsapp: false,
    job_title: false,
    company_position: false,
    email: false,
  })

  const selectedFilters = Object.entries(checkboxValues)
    .filter(([_, value]) => value)
    .map(([key]) => key)

  const {
    mutate: triggerSearch,
    data: searchResult = [],
    isPending: searching,
  } = useFetchLeads()

  const handleCheckboxChange = (name) => {
    setCheckboxValues(prev => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  const handleKeySearching = (event) => {
    if (event.key === 'Enter' && searchParams.length > 3) {
      event.preventDefault()
      onSubmitSearch()
    }
  }

  const onSubmitSearch = () => {
    if (!searchParams || searchParams.length <= 3 || selectedFilters.length === 0) {
      return
    }

    triggerSearch({ searchParams, filters: selectedFilters })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Búsqueda de Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* Filtros */}
          <div className="space-y-2">
            <Label>Filtros:</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="phone"
                  checked={checkboxValues.phone}
                  onCheckedChange={() => handleCheckboxChange('phone')}
                />
                <Label htmlFor="phone">Por Teléfono</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whatsapp"
                  checked={checkboxValues.whatsapp}
                  onCheckedChange={() => handleCheckboxChange('whatsapp')}
                />
                <Label htmlFor="whatsapp">Por Whatsapp</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="job_title"
                  checked={checkboxValues.job_title}
                  onCheckedChange={() => handleCheckboxChange('job_title')}
                />
                <Label htmlFor="job_title">Por Cargo</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="company_position"
                  checked={checkboxValues.company_position}
                  onCheckedChange={() => handleCheckboxChange('company_position')}
                />
                <Label htmlFor="company_position">Por Puesto</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email"
                  checked={checkboxValues.email}
                  onCheckedChange={() => handleCheckboxChange('email')}
                />
                <Label htmlFor="email">Por Email</Label>
              </div>
            </div>
          </div>

          {/* Input de búsqueda y botón */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              value={searchParams}
              placeholder="Buscar por celular, nombre, email o cargo"
              onChange={e => setSearchParams(e.target.value)}
              onKeyDown={handleKeySearching}
              className="flex-1"
            />
            <Button
              onClick={onSubmitSearch}
              disabled={searchParams.length <= 3 || selectedFilters.length === 0}
              loading={searching}
            >
              Buscar
            </Button>
          </div>

          {/* Resultados */}
          <div className="mt-4">
            {searching ? (
              <div className="flex flex-col items-center justify-center gap-2 py-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">
                  Buscando en los registros, espera un momento por favor.
                </p>
              </div>
            ) : searchResult.length > 0 ? (
              <ResultsTable leads={searchResult} />
            ) : (
              <p className="text-sm text-muted-foreground">Sin resultados</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Search
