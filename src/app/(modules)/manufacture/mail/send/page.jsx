"use client"

import React, { useEffect, useState } from "react";
import MailsTable from "@/modules/manufacture/mail/tables/MailsTable";
import EditEmployeeModal from "@/modules/rrhh/employees/modals/modal-edit-employee";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useCrud from "@/hooks/useCrud";
import NewMail from "@/modules/manufacture/mail/modals/NewMail";
import SeeMail from "@/modules/manufacture/mail/modals/SeeMail";

const Employees = () => {
  const [selectedMail, setSelectedMail] = useState(null);
  const [openSee, setOpenSee] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const {getModel, deleteModel} = useCrud("/api/v1/manufacture/mail")
  const [mails, setMails] = useState({});

  const fetchMails = async () =>{
    try {
      const data = await getModel();
      setMails(data);
    } catch (error) {
      console.error("Error during recovery emails");
    }
  }

  useEffect(() => {
    fetchMails();
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Correos enviados</h1>
        <NewMail 
          fetchMails={fetchMails}
        />
      </div>
      <Card>
        <CardContent>
          <MailsTable
            data={mails}
            setSelectedMail={setSelectedMail}
            setOpenSee={setOpenSee}
          />
          <SeeMail 
            open={openSee}
            onOpenChange={setOpenSee}
            mail={selectedMail}
          />
          {/*<EditEmployeeModal
            open={openEdit}
            onOpenChange={setOpenEdit}
            employee={selectedEmployee}
            onEmployeeChange={setSelectedEmployee}
            fetchEmployees={fetchEmployees}
          />*/}
        </CardContent>
      </Card>
    </>
  );
};
  
export default Employees;