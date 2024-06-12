import React, { useMemo } from 'react'
import {
  Column,
  Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
} from '@tanstack/react-table'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDataById } from "../api/generalApi";
import Popup from "./popup";
import UpdateWord from "./words/UpdateWord";
import { Word } from "../types/words";
import { updateWordFieldByWordId } from '../api/wordApi';

// The declare module '@tanstack/react-table' statement is used to declare a module augmentation 
//for the @tanstack/react-table module. 
//This allows you to add new types or interfaces to the module's existing types.
declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void //adjust for your needs and DB 
  }
}

// Give our default column cell renderer editing option
const defaultColumn: Partial<ColumnDef<Word>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    // When the input is blurred/on-change, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
      //here the place were the change happens
    return (
      <input
        value={value as string}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
      />
    )
  },
}

interface ReactTableProps<T extends object> {
  dataOriginal: Word[];
}

export const TableLocal = <T extends object>({dataOriginal}: ReactTableProps<T>) => {
  const [data, setData] = React.useState(dataOriginal)
  // const refreshData = () => setData(() => makeData(1000))
  const [massageFromUpdate, setMassageFromUpdate] = useState("");
  const [showPopupUpdateMassage, setShowPopupUpdateMassage] = useState(false);
  const navigate = useNavigate();
  const rerender = React.useReducer(() => ({}), {})[1]
  //being assigned with the dispatch fun' returned by useReduser, used to update and trigger a re-render

    //build up the table columns header
    const columns = useMemo<ColumnDef<Word>[]>(  //!can be change to get all fields from db 
      () => [                              
    {
        header: 'English Word',
        accessorKey: 'en_word',
    },
    {
        header: 'Hebrew Word',
        accessorKey: 'he_word'
    }
  ],[])

  const handleDelete = async (rowOriginalId: string) => {
    if (rowOriginalId === undefined)
      throw new Error("At table/handleDelete, rowOriginalId is undefined");
    try {
      const response = await deleteDataById(rowOriginalId);
      console.log("At handleDeleteWord the data is: ", response);
      const { ok, massage } = response;
      if (ok) {
        alert(massage);
      }
      navigate("/UserPage");
    } catch (error) {
      console.error("Error delete word:", error);
    }
  };

  const handleUpdate = async (rowOriginalId: string, columnId: string, value: any) => {
    try {
      if(!rowOriginalId || !columnId || !value)throw new Error("At handleUpdate: fail catching data from cell");
      const response = await updateWordFieldByWordId(rowOriginalId, columnId, value)
      if (!response) throw new Error("At handleUpdate: filed catching response from axios");
      setShowPopupUpdateMassage(true)
      setMassageFromUpdate(response.massage) 
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
  } //work ok
  
  //define a table using "react table library" hook 
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Provide our updateData function to our table meta
    // Table Meta allow to pass arbitrary data or fun' to the table and store metadata about the table and its data.
    meta: {
      updateData: (rowIndex, columnId, value) => {
        //updating the data in the table by setting a new value for a specific column and row
        //!the data update locally and not send to the project server nor DB
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              handleUpdate(row._id, columnId, value)  //handling sending the update data to the server for DB-saving
              return {
                ...old[rowIndex]!, 
                //Take the value at the rowIndex index from the old array, 
                // and use it as is, without checking if it's null or undefined.
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
    debugTable: true,
  })

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden p-2">
            <table className="min-w-full text-center">

              {/*set the table header*/}
              <thead className="border-b bg-gray-50"> 
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-sm font-medium text-gray-900"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                    <th className="px-6 py-4 text-sm font-medium text-gray-900">Delete</th>
                  </tr>
                ))}
              </thead>
              
              {/*set the body of the table */}
              <tbody>
                {/*set the row*/}
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b bg-white border border-slate-200"
                  >
                    {/*set the cell in the row*/}
                    {row.getVisibleCells().map((cell) => (
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900 "
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                    ))}
                    <td className="px-6 py-4">
                      {showPopupUpdateMassage ? <Popup onClose={() => setShowPopupUpdateMassage(false)} children={massageFromUpdate}/> : null}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="btn-garbageCan-img"
                        onClick={() => handleDelete((row.original as any)._id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
