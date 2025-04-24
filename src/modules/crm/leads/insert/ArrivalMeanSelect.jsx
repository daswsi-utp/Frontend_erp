import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"; 

const ArrivalMeanSelect = ({ listArrivalMeans, handleArrivalMeanChange }) => {
 return (
  <Select onValueChange={handleArrivalMeanChange}>
   <SelectTrigger>
    <SelectValue placeholder="Selecciona Medio de Llegada" />
   </SelectTrigger>
   <SelectContent>
    <SelectGroup>
     <SelectLabel>Medio de Llegada</SelectLabel>
     {listArrivalMeans.map((mean) => (
      <SelectItem key={mean.id} value={mean.id}>
       {mean.name}
      </SelectItem>
     ))}
    </SelectGroup>
   </SelectContent>
  </Select>
 );
};

export default ArrivalMeanSelect;
