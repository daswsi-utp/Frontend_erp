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
import useCrud1 from '@/hooks/useCrud1'

const Search = () => {
  const { searchModel: searchLead } = useCrud1('/api/v1/admin/leads/search')

  const [searchParams, setSearchParams] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [searching, setSearching] = useState(false)
  const [checkboxValues, setCheckboxValues] = useState({
    phone: true,
    whatsapp: false,
    job_tittle: false,
    company_position: false
  })

  const handleCheckboxChange = (name) => {
    setCheckboxValues(prevState => ({
      ...prevState,
      [name]: !prevState[name]
    }))
  }

  const handleKeySearching = (event) => {
    if (event.key === 'Enter' && searchParams.length > 3) {
      event.preventDefault();
      onSubmitSearch();
    }
  };

  const onSubmitSearch = async () => {
    setSearching(true);
    
    try {
      const params = new URLSearchParams();
      params.append('search_params', searchParams);
      
      Object.entries(checkboxValues).forEach(([key, value]) => {
        if (value) params.append('search_filters', key);
      });
  
      const { results } = await searchLead(params.toString());
      setSearchResult(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Búsqueda de Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="filters">Filtros:</Label>
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
              {/* <div className="flex items-center space-x-2">
                <Checkbox 
                  id="job_tittle" 
                  checked={checkboxValues.job_tittle}
                  onCheckedChange={() => handleCheckboxChange('job_tittle')}
                />
                <Label htmlFor="job_tittle">Por Profesión</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="company_position" 
                  checked={checkboxValues.company_position}
                  onCheckedChange={() => handleCheckboxChange('company_position')}
                />
                <Label htmlFor="company_position">Por Cargo</Label>
              </div> */}
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              value={searchParams}
              placeholder="Buscar por celular y/o nombre de cliente probar 999888777"
              onKeyDown={handleKeySearching}
              onChange={e => setSearchParams(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={onSubmitSearch} 
              disabled={searchParams.length <= 3}
              loading={searching}
            >
              Buscar
            </Button>
          </div>

          <div className="mt-4">
            {searchResult.length ? (
              <ResultsTable leads={searchResult} />
            ) : searching ? (
              <div className="flex flex-col items-center justify-center gap-2 py-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">
                  Buscando en los registros, espera un momento por favor.
                </p>
              </div>
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