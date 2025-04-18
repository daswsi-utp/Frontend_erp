"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
=======
    (<div data-slot="table-container" className="relative w-full overflow-x-auto">
>>>>>>> master
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props} />
<<<<<<< HEAD
    </div>
=======
    </div>)
>>>>>>> master
  );
}

function TableHeader({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props} />
=======
    (<thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props} />)
>>>>>>> master
  );
}

function TableBody({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props} />
=======
    (<tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props} />)
>>>>>>> master
  );
}

function TableFooter({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    <tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props} />
=======
    (<tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props} />)
>>>>>>> master
  );
}

function TableRow({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    <tr
=======
    (<tr
>>>>>>> master
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
<<<<<<< HEAD
      {...props} />
=======
      {...props} />)
>>>>>>> master
  );
}

function TableHead({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    <th
=======
    (<th
>>>>>>> master
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
<<<<<<< HEAD
      {...props} />
=======
      {...props} />)
>>>>>>> master
  );
}

function TableCell({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    <td
=======
    (<td
>>>>>>> master
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
<<<<<<< HEAD
      {...props} />
=======
      {...props} />)
>>>>>>> master
  );
}

function TableCaption({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props} />
=======
    (<caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props} />)
>>>>>>> master
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
