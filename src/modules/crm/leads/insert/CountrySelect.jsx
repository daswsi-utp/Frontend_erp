import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectValue } from "@/components/ui/select"; 
import { countries } from '@/lib/countries';

const CountrySelect = ({ value, onChange }) => {
 return (
   <Select value={value} onValueChange={onChange}>
     <SelectTrigger>
       <SelectValue placeholder="Selecciona un País" />
     </SelectTrigger>
     <SelectContent>
       <SelectLabel>Países</SelectLabel>
       {countries.map((country) => (
         <SelectItem key={country.name} value={country.name}>
           {country.name}
         </SelectItem>
       ))}
     </SelectContent>
   </Select>
 );
};

export default CountrySelect;
