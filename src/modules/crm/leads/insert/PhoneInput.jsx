import React from 'react';
import { Input } from '@/components/ui/input';

const PhoneInput = ({ value, onChange, ...props }) => {
  return (
    <Input
      label="Número de Teléfono"
      name="phone"
      value={value || ""}
      onChange={onChange}
      required
      {...props}
    />
  );
};

export default PhoneInput;