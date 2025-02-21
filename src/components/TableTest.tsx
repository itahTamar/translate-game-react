import {
  Column,
  ColumnDef,
  RowData,
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDataById } from "../api/generalApi";
import { getAllUserWord, updateWordFieldByWordId } from "../api/wordApi";
import "../style/table.css";
import { Word } from "../types/words";
import AddWord from "./words/AddWord";
import trashcan from "../style/images/trashcan.png";
import { ServerContext } from "../context/ServerUrlContext";

// The declare module '@tanstack/react-table' statement is used to declare a module augmentation
// for the @tanstack/react-table module.
// This allows you to add new types or interfaces to the module's existing types.
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void; //adjust for your needs and DB
  }
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Word>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
    return (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

// Wrap a function with this to skip a pagination reset temporarily while update happen
function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export function TableTest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Word[]>([]);
  const serverUrl = useContext(ServerContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  //build up the table columns header
  const columns = React.useMemo<ColumnDef<Word>[]>(
    () => [
      {
        header: "", //"English WordS",
        accessorKey: "en_word",
      },
      {
        header: "", //"Hebrew Word",
        accessorKey: "he_word",
      },
    ],

    []
  );

  const refreshData = () => handleGetAllUserWords();

  //the use of the useSkipper hook
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  //get data and store it in "data" state
  const handleGetAllUserWords = async () => {
    setLoading(true);
    try {
      const response = await getAllUserWord(serverUrl);
      console.log("at settings/handleGetAllUserWords the response:", response);
      if (!response)
        throw new Error(
          "No response from axios getAllUserWord at handleGetAllUserWords"
        );
      setData(response.reverse()); //reverse the data array so the the most recently added words appearing first
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1600);
    }
  }; //work ok

  const handleUpdate = async (
    rowOriginalId: string,
    columnId: string,
    value: any
  ) => {
    try {
      if (!rowOriginalId || !columnId || !value)
        throw new Error("At handleUpdate: fail catching data from cell");
      const response = await updateWordFieldByWordId(
        serverUrl,
        rowOriginalId,
        columnId,
        value
      );
      if (!response)
        throw new Error("At handleUpdate: filed catching response from axios");
      console.log(response.massage);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  }; //work ok

  const handleDelete = async (rowOriginalId: string) => {
    if (rowOriginalId === undefined)
      throw new Error("At table/handleDelete, rowOriginalId is undefined");
    try {
      const response = await deleteDataById(serverUrl, rowOriginalId);
      console.log("At handleDeleteWord the data is: ", response);
      const { ok } = response;
      if (!ok) throw new Error("problem delete the word");
      refreshData();
    } catch (error) {
      console.error("Error delete word:", error);
    }
  }; //work ok

  useEffect(() => {
    handleGetAllUserWords();
  }, []);

  //define a table using "react table library" hook
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(), //row models from TanStack, return a basic row model that just a 1:1 mapping of original data passed to  the table.
    getFilteredRowModel: getFilteredRowModel(), //row models from TanStack,returns a row model that accounts for column filtering and global filtering
    getPaginationRowModel: getPaginationRowModel(), //row models from TanStack, returns a row model that only includes the rows that should be displayed on the current page based on the pagination state
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    // Table Meta allow to pass arbitrary data or fun' to the table and store metadata about the table and its data.
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        //updating the data in the table by setting a new value for a specific column and row
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              handleUpdate(row._id, columnId, value); //handling sending the update data to the server for DB-saving
              return {
                ...old[rowIndex]!,
                //Take the value at the rowIndex index from the old array,
                // and use it as is, without checking if it's null or undefined.
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  //export data to file
  const handleExportUserWords = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/api/userWords/export-user-words`,
        {
          method: "GET",
          credentials: "include", // Ensure cookies are sent
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export words");
      }

      // Extract filename from the response headers
      const disposition = response.headers.get("Content-Disposition");
      const fileName = disposition
        ? disposition.split("filename=")[1]
        : "UserWords.csv";

      // Convert response to blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting user words:", error);
    }
  };

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close the dropdown when clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="z-50 relative flex justify-between items-center">
       
          <button
            // className="absolute top-8 left-16"
            className="back absolute top-4 left-4 text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 "
            onClick={() => navigate("/userPage")}
          >
            Back
          </button>
     

        <h1 className="tableName absolute top-4">Vocabulary Manager</h1>

        {/* Dropdown Menu */}
        <div className="dropDownMenuBtn text-left" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          >
            Actions
            <svg
              className="ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 13.414l3.293-3.293a1 1 0 011.414
                 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Content */}
          {dropdownOpen && (
            <div className="origin-top-right absolute z-50 right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {/* Update user Details */}
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={() => navigate("/updateUserDetails")}
                >
                  Update your Details
                </button>

                {/* export to file */}
                <button
                  onClick={() => {
                    handleExportUserWords();
                    setDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  Export Table
                </button>
              </div>
            </div>
          )}
        </div>

      </header>

      
      <div className="table-container">
        {loading ? (
          <div className="text-black text-3xl">Loading ...</div>
        ) : (
          <div className="p-2 inline-block">
            <AddWord refreshData={refreshData} />

            {/* Render Filters */}
            <div className="filters-container">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) =>
                  header.column.getCanFilter() ? (
                    <div key={header.id} className="filter-item">
                      <Filter column={header.column} table={table} />
                    </div>
                  ) : null
                )
              )}
            </div>

            {/*table*/}
            <table>
              <thead>
                {/* set the table header */}
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="text-xl">
                    {headerGroup.headers.map((header) => {
                      return (
                        <th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header, //This is the header definition for the column
                                header.getContext() //This returns the rendering context (or props) for the column-based component
                              )}
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody>
                {/*set the body of the table */}
                {/*set the row */}
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr key={row.id}>
                      {/*set the cell in the row*/}
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td key={cell.id} className="text-xl indented-input">
                            {/*The flexRender function is used to render the cell using the template of your choice. 
                          It will handle all possible cell definition scenarios for the cell object (string, JSX, fun')*/}
                            {flexRender(
                              cell.column.columnDef.cell, //This is the cell definition for the column
                              cell.getContext() //This returns the rendering context (or props) for the cell-based component
                            )}
                          </td>
                        );
                      })}
                      <td className="px-6 py-0.5">
                        <button
                          className="btn-garbageCan-img"
                          onClick={() => {
                            const result = confirm("Delete this word?");
                            if (result) {
                              handleDelete((row.original as any)._id);
                            }
                          }}
                        >
                          <img src={trashcan} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="h-2" />
            <div className="flex items-center gap-2">
              <button
                className="border rounded p-1"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
              <button
                className="border rounded p-1"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
              </button>
              <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <span className="flex items-center gap-1">
                | Go to page:
                <input
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    const maxPage = table.getPageCount() - 1;
                    table.setPageIndex(Math.min(page, maxPage));
                  }}
                  className="border p-1 rounded w-16"
                />
              </span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div>{table.getRowModel().rows.length} Rows</div>
          </div>
        )}
      </div>
    </>
  );
}

//filter/search fun
function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
