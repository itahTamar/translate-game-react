import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDataById } from "../api/generalApi";
import Popup from "./popup";
import UpdateWord from "./words/UpdateWord";
import { Word } from "../types/words";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
}
// const columnHelper = createColumnHelper<Word>();
// const columns = [
//   columnHelper.accessor('en_word', {
//     cell: (info) => info.getValue()
//   }),
//   columnHelper.accessor('he_word', {
//     cell: (info) => info.getValue()
//   }),
// ]

export const Table = <T extends object>({
  data,
  columns,
}: ReactTableProps<T>) => {
  const [showPopupUpdate, setShowPopupUpdate] = useState(false);
  const navigate = useNavigate();

  const handleSuccessfulUpdate = () => {
    setShowPopupUpdate(false);
  }; //work ok

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

  const handleUpdate = async (cellID: string) => {

  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden p-2">
            <table className="min-w-full text-center">
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
                    <th className="px-6 py-4 text-sm font-medium text-gray-900">Update</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-900">Delete</th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b bg-white border border-slate-200"
                  >
                    {row.getVisibleCells().map((cell) => (
                      // <button
                        // onClick={() => handleUpdate(cell.id)}
                      // >
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900 "
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      // </button>
                
                    ))}
                    <td className="px-6 py-4">
                      <button
                        className="btn-pencil-img"
                        onClick={() => setShowPopupUpdate(true)}
                      >
                        ✏️
                      </button>
                      {showPopupUpdate && (
                        <Popup onClose={() => setShowPopupUpdate(false)}>
                          <UpdateWord
                            word={
                              {
                                _id: (row.original as any)._id,
                                en_word: (row.original as any).en_word,
                                he_word: (row.original as any).he_word,
                              } as Word
                            }
                            onSuccessfulUpdate={handleSuccessfulUpdate}
                          />
                        </Popup>
                      )}
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
