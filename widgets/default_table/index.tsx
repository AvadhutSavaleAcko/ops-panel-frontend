// import React, { useState } from "react";
// import { connect, useDispatch, useSelector } from "react-redux";
// import { getWidgetSpecificIsVisible } from "@utils/index";
// import {
//   TableContainer,
//   StyledTable,
//   TableHeader,
//   TableRow,
//   TableCell,
//   TableBody,
//   EmptyState,
//   ViewDetailsButton,
//   ActionCell,
//   ScrollIndicator,
//   PaginationContainer,
//   PageButton,
//   RowsPerPageSelect,
//   PaginationWrapper,
//   ExpandButton,
//   TableWrapper
// } from "./styles";
// import { ProposalJsonModal } from "../proposaldatamodal";
// import { getIsVisible } from "@utils/hooks/getIsVisible";
// import { isEmpty } from "@utils/lodash";

// interface TableData {
//   raw_json: Record<string, any>;
//   tableFieldsData: Record<string, any>;
// }

// interface TableProps {
//   id?: string;
//   is_visible?: boolean;
//   data: TableData[];
//   actions?: {
//     view_details?: any[];
//   };
//   dispatch?: any;
//   currentTab?: string | null;
//   showForm?: boolean;
// }

// // const mapStateToProps = (state: any, ownProps: any) => ({
// //   is_visible: getWidgetSpecificIsVisible(
// //     state.configuration?.normalisedConfig,
// //     ownProps.id
// //   ),
// //   data: state.dashboardstate.activeTabData
// // });

// export const Table: React.FC<TableProps> = (props) => {
//   // const data = useSelector(({ dashboardstate }: any) => {
//   //   return dashboardstate?.activeTabData;
//   // });

//   const is_visible = getIsVisible({ id: props.id });

//   const { actions,data } = props;
//   const dispatch = useDispatch();
//   const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(
//     null
//   );
//   if (!Array.isArray(data) || !data?.length) {
//     return <EmptyState>No data available</EmptyState>;
//   }
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const totalPages = Math.ceil(data.length / rowsPerPage);
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
//   const displayHeaders: string[] = data?.[0]?.tableFieldsData
//     ? Object.keys(data[0].tableFieldsData)
//     : [];
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const getPageNumbers = (): number[] => {
//     const pages: number[] = [];
//     const totalPagesToShow = 3;
//     let startPage = Math.max(1, currentPage - 1);
//     let endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

//     if (endPage - startPage + 1 < totalPagesToShow) {
//       startPage = Math.max(1, endPage - totalPagesToShow + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   const handleViewDetails = (row: TableData) => {
//     if (actions?.view_details) {
//       actions.view_details.forEach((action: any) => {
//         if (action.type === "updateProps") {
//           dispatch({
//             type: "UPDATE_PROPS",
//             payload: {
//               componentId: action.args.component_id,
//               props: {
//                 is_visible: true,
//                 jsonData: row.raw_json
//               }
//             }
//           });
//         }
//       });
//     } else {
//       setSelectedRow(row.raw_json);
//       setIsModalOpen(true);
//     }
//   };

//   const formatValue = (value: any): string => {
//     if (value === null || value === undefined) return "-";

//     if (typeof value === "number" && value.toString().length >= 10) {
//       try {
//         const date = new Date(value);
//         if (!isNaN(date.getTime())) {
//           return date.toLocaleString("en-US", {
//             year: "numeric",
//             month: "short",
//             day: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//             second: "2-digit"
//           });
//         }
//       } catch {
//         return value.toString();
//       }
//     }

//     if (typeof value === "object") {
//       try {
//         if (value instanceof Date) {
//           return value.toLocaleString();
//         }
//         return JSON.stringify(value);
//       } catch {
//         return "-";
//       }
//     }

//     return String(value);
//   };

//   if (!is_visible) return null;
//   if (!data?.length || !displayHeaders.length) {
//     return <EmptyState>No data available</EmptyState>;
//   }
//   return (
//     <>
//       <TableWrapper isExpanded={isExpanded}>
//         <TableContainer>
//           <ScrollIndicator>Scroll to see all data</ScrollIndicator>
//           <StyledTable>
//             <TableHeader>
//               <tr>
//                 {displayHeaders.map((header) => (
//                   <th key={header} title={header}>
//                     {header.replace(/_/g, " ").toUpperCase()}
//                   </th>
//                 ))}
//                 <th>ACTIONS</th>
//               </tr>
//             </TableHeader>
//             <TableBody>
//               {currentRows.map((item, rowIndex) => (
//                 <TableRow key={`row-${rowIndex}`}>
//                   {displayHeaders.map((header) => (
//                     <TableCell
//                       key={`cell-${rowIndex}-${header}`}
//                       title={String(item.tableFieldsData[header])}
//                     >
//                       {formatValue(item.tableFieldsData[header])}
//                     </TableCell>
//                   ))}
//                   <ActionCell>
//                     <ViewDetailsButton onClick={() => handleViewDetails(item)}>
//                       View Details
//                     </ViewDetailsButton>
//                   </ActionCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </StyledTable>
//         </TableContainer>

//         <PaginationWrapper>
//           <RowsPerPageSelect>
//             <span>Rows per page:</span>
//             <select
//               value={rowsPerPage}
//               onChange={(e) => {
//                 setRowsPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               {[10, 20, 30].map((value) => (
//                 <option key={value} value={value}>
//                   {value}
//                 </option>
//               ))}
//             </select>
//           </RowsPerPageSelect>

//           <PaginationContainer>
//             <PageButton
//               onClick={() => handlePageChange(1)}
//               disabled={currentPage === 1}
//             >
//               First
//             </PageButton>
//             <PageButton
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Prev
//             </PageButton>

//             {getPageNumbers().map((page) => (
//               <PageButton
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 active={currentPage === page}
//               >
//                 {page}
//               </PageButton>
//             ))}

//             <PageButton
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </PageButton>
//             <PageButton
//               onClick={() => handlePageChange(totalPages)}
//               disabled={currentPage === totalPages}
//             >
//               Last
//             </PageButton>
//           </PaginationContainer>

//           <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
//             {isExpanded ? "Compress" : "Expand"}
//           </ExpandButton>
//         </PaginationWrapper>

//         {isModalOpen && selectedRow && (
//           <ProposalJsonModal
//             jsonData={selectedRow}
//             onClose={() => {
//               setIsModalOpen(false);
//               setSelectedRow(null);
//             }}
//           />
//         )}
//       </TableWrapper>
//     </>
//   );
// };

// export default Table;

import React, { useState, ReactNode } from "react";
import { connect, useDispatch } from "react-redux";
import { getIsVisible } from "@utils/hooks/getIsVisible";
import { TableWrapper, TableContainer } from "./styles";
import { TableToolbar } from "@components/TableToolbar";
import { TableContent } from "@components/TableContent";
import { TablePagination } from "@components/TablePagination";
import { ProposalJsonModal } from "../proposaldatamodal";
import { EmptyState } from "./styles";

interface TableData {
  raw_json: Record<string, any>;
  tableFieldsData: Record<string, any>;
}
interface TableProps {
  id?: string;
  is_visible?: boolean;
  data?: TableData[];
  actions?: {
    view_details?: any[];
  };
  children?: ReactNode;
  config?: any;
}

export const Table: React.FC<TableProps> = ({
  id,
  is_visible,
  data = [],
  actions,
  children,
  config
}) => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(
    config?.props?.pagination?.defaultRowsPerPage || 10
  );
  const [isExpanded, setIsExpanded] = useState(false);

  if (!is_visible) return null;
  if (!Array.isArray(data) || !data.length) {
    return <EmptyState>No data available</EmptyState>;
  }

  const handleViewDetails = (row: TableData) => {
    if (actions?.view_details) {
      actions.view_details.forEach((action) => {
        dispatch({
          type: "UPDATE_PROPS",
          payload: {
            componentId: action.args.component_id,
            props: {
              is_visible: true,
              jsonData: row.raw_json
            }
          }
        });
      });
    } else {
      setSelectedRow(row.raw_json);
      setIsModalOpen(true);
    }
  };
  const toolbarConfig = config?.data?.children?.find(
    (child) => child.type === "toolbar"
  );

  return (
    <TableWrapper isExpanded={isExpanded}>
      {/* {children || (
        <>
          <TableToolbar
            onSearch={(value) => toolbarConfig?.props?.onSearch?.(value)}
            onExport={toolbarConfig?.props?.onExport}
            config={{
              search: {
                enabled: true,
                placeholder: "Search..."
              },
              export: {
                enabled: true,
                label: "Export"
              }
            }}
          />

          <TableContent
            data={data}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onViewDetails={handleViewDetails}
            config={config?.data?.children?.find(
              (child) => child.type === "table_content"
            )}
          />

          <TablePagination
            currentPage={currentPage}
            totalPages={Math.ceil(data.length / rowsPerPage)}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
            isExpanded={isExpanded}
            onExpandToggle={() => setIsExpanded(!isExpanded)}
            config={config?.data?.children?.find(
              (child) => child.type === "pagination"
            )}
          />
        </>
      )}

      {isModalOpen && selectedRow && (
        <ProposalJsonModal
          jsonData={selectedRow}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRow(null);
          }}
        />
      )} */}
      {children}
    </TableWrapper>
  );
};

export default connect()(Table);
