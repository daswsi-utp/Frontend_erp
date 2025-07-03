"use client"

import React, { useEffect, useState } from "react";
import MailsTable from "@/modules/manufacture/mail/tables/MailsTable";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import NewMail from "@/modules/manufacture/mail/modals/NewMail";
import SeeMail from "@/modules/manufacture/mail/modals/SeeMail";
import useFetchMails from "@/modules/manufacture/hooks/useFetchMails";

const Employees = () => {
  const { data, isLoading } = useFetchMails()
  const [selectedMail, setSelectedMail] = useState(null);
  const [openSee, setOpenSee] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Correos enviados</h1>
        <NewMail />
      </div>
      <Card>
        <CardContent>
          <MailsTable
            data={data?.rows || []}
            setSelectedMail={setSelectedMail}
            setOpenSee={setOpenSee}
          />
          <SeeMail 
            open={openSee}
            onOpenChange={setOpenSee}
            mail={selectedMail}
          />
        </CardContent>
      </Card>
    </>
  );
};
  
export default Employees;