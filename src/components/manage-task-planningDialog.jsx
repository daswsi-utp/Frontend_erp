import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import CreateTaskForm from "./create-task-form"
import DeleteTaskForm from "./delete-task.form"

const ManageTasks = ({ onTaskUpdate }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manejo Tareas</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manejo Tareas</DialogTitle>
        </DialogHeader>
        <CreateTaskForm onTaskUpdate={onTaskUpdate} />
        <DeleteTaskForm onTaskUpdate={onTaskUpdate} />
      </DialogContent>
    </Dialog>
  );
};

export default ManageTasks;