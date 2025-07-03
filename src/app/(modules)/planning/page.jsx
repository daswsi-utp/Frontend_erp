"use client"

import { SimpleDropDown } from "@/components/simple-dropdown";
import SimpleFormPlanning from "@/components/simple-form-planning";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation'
import useCrud from "@/hooks/useCrud"
import { useEffect, useState } from "react"
import useEntityMutation from "@/hooks/useEntityMutation";
import useFetchPlans from "@/modules/planning/hooks/useFetchPlans";

const Planning = () => {

  const colorClasses = [
    "from-blue-500 to-blue-700",
    "from-green-500 to-green-700",
    "from-purple-500 to-purple-700",
    "from-pink-500 to-pink-700",
    "from-yellow-500 to-yellow-700",
    "from-indigo-500 to-indigo-700",
    "from-red-500 to-red-700",
    "from-teal-500 to-teal-700"
  ];

  const planningMutation = useEntityMutation('plan')
  const { data, isLoading} = useFetchPlans()
  const router = useRouter()

  const handleCardClick = (id) => {
    router.push(`/planning/schedule/${id}`);
  };

  const deletePlan = async (id) =>{
    try {
      planningMutation.mutate({
        action: 'delete',
        id: id,
        entity: {},
        apiPath: `/planning/plan/delete/${id}`
      })
    } catch (error) {
      console.error("Error during delete plan", error)
    }
  }

  const updatePlan = async (id, plan) => {
    try {
      planningMutation.mutate({
        action: 'update',
        id: id,
        entity: plan,
        apiPath: `/planning/plan/update/${id}`
      })
    } catch (error) {
      console.error("Error during update plan", error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex gap-4 items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Plannings</h1>
        <SimpleFormPlanning />
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Cargando planes...</p>
      ) : !data || data.rowCount === 0 ? (
        <div className="w-full text-center text-gray-500 dark:text-gray-400 mt-10">
          <p className="text-lg">No hay planes creados aún.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {Array.isArray(data?.rows) &&
  data.rows.map((plan, index) => (
            <Card
              key={`plan-${plan.plan_id ?? `temp-${index}`}`}
              className={`p-6 w-full sm:w-[48%] lg:w-[31%] h-auto rounded-xl shadow-md transition-all duration-300 
                          hover:scale-105 hover:shadow-lg cursor-pointer group bg-gradient-to-r  ${colorClasses[index % colorClasses.length]}`}
              onClick={() => handleCardClick(plan.plan_id)}
            >
              <CardTitle className="flex justify-between items-center mb-4 text-white/90">
                <h1 className="text-xl font-semibold">{plan.plan_name}</h1>
                <div onClick={(e) => e.stopPropagation()}>
                  <SimpleDropDown plan={plan} onDelete={() => deletePlan(plan.plan_id)} onUpdate={(id, updatedData) => updatePlan(id, updatedData)}/>
                </div>
              </CardTitle>
              <CardDescription className="text-white/90">
                <p className="mb-4">{plan.plan_description}</p>
                <Separator className="mb-4 bg-white/20" />
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Fecha inicio:</span>
                    <span>{plan.plan_start_date}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Fecha Fin:</span>
                    <span>{plan.plan_end_date}</span>
                  </p>
                </div>
              </CardDescription>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
};

export default Planning;