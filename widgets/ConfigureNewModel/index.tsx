// import React, { useState, useEffect } from "react";
// import {
//   ConfigureContainer,
//   FieldRow,
//   FieldName,
//   FieldInput,
//   DeleteButton,
//   SaveButton,
//   ButtonGroup,
//   Title,
//   FieldsContainer,
//   ActionButtons,
//   AddToTableButton,
//   TableFieldsSection,
//   TableFieldsList,
//   TableField,
//   HighlightedText
// } from "./styles";
// import { fetchConfigAndRedirect } from "@actions/fetchConfigRedirect";

// interface ConfigureNewModelProps {
//   data: {
//     tab_name: string;
//     row: number;
//     list_data: any[];
//   };
// }

// interface Field {
//   original: string;
//   modified: string;
//   show: boolean;
//   addedToTable: boolean;
// }

// export const ConfigureNewModel: React.FC<ConfigureNewModelProps> = ({
//   data
// }) => {
//   const [fields, setFields] = useState<Field[]>([]);
//   const [tableFields, setTableFields] = useState<
//     { original: string; modified: string }[]
//   >([]);

//   const flattenObject = (obj: any, prefix = ""): { [key: string]: string } => {
//     return Object.keys(obj).reduce(
//       (acc: { [key: string]: string }, key: string) => {
//         const pre = prefix.length ? `${prefix}.` : "";

//         if (typeof obj[key] === "object" && obj[key] !== null) {
//           Object.assign(acc, flattenObject(obj[key], `${pre}${key}`));
//         } else {
//           acc[`${pre}${key}`] = obj[key]?.toString() || "";
//         }

//         return acc;
//       },
//       {}
//     );
//   };

//   useEffect(() => {
//     if (data.list_data && data.list_data.length > 0) {
//       const flattenedData = flattenObject(data.list_data[0]);
//       const initialFields = Object.keys(flattenedData).map((key) => ({
//         original: key,
//         modified: key,
//         show: true,
//         addedToTable: false
//       }));
//       setFields(initialFields);
//     }
//   }, [data]);

//   const handleFieldNameChange = (index: number, value: string) => {
//     setFields((prev) => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], modified: value };
//       return updated;
//     });
//   };

//   const handleDeleteField = (index: number) => {
//     setFields((prev) => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], show: false };
//       return updated;
//     });
//   };

//   const handleAddToTable = (index: number) => {
//     const field = fields[index];
//     if (!field.addedToTable) {
//       setTableFields((prev) => [
//         ...prev,
//         {
//           original: field.original,
//           modified: field.modified
//         }
//       ]);
//       setFields((prev) => {
//         const updated = [...prev];
//         updated[index] = { ...updated[index], addedToTable: true };
//         return updated;
//       });
//     }
//   };

//   const removeFromTable = (index: number) => {
//     const removedField = tableFields[index];
//     setTableFields((prev) => prev.filter((_, i) => i !== index));
//     setFields((prev) =>
//       prev.map((field) =>
//         field.original === removedField.original
//           ? { ...field, addedToTable: false }
//           : field
//       )
//     );
//   };

//   const handleSave = async () => {
//     const mappedFields = fields
//       .filter((field) => field.show)
//       .reduce(
//         (acc, field) => {
//           acc[field.modified] = field.original;
//           return acc;
//         },
//         {} as { [key: string]: string }
//       );

//     const payload = {
//       requestBody: {
//         current_node: "common_dashboard",
//         expected_node: "common_dashboard",
//         journey: "ops_panel"
//       },
//       data: {
//         configuredModel: {
//           tab_name: data.tab_name,
//           row: data.row,
//           fieldMappings: mappedFields,
//           tableFields: tableFields.map((field) => ({
//             original: field.original,
//             display: field.modified
//           }))
//         }
//       }
//     };

//     await fetchConfigAndRedirect({
//       ...payload,
//       shouldRedirect: true,
//       showBasicLoader: true,
//       shouldClearStore: true,
//       showCustomBasicLoader: true
//     });
//   };

//   return (
//     <ConfigureContainer>
//       <ButtonGroup>
//         <SaveButton onClick={handleSave}>Save Model</SaveButton>
//       </ButtonGroup>
//       <Title>Configure <HighlightedText>{data.tab_name}</HighlightedText> Model Fields</Title>
//       <FieldsContainer>
//         {fields.map(
//           (field, index) =>
//             field.show && (
//               <FieldRow key={index}>
//                 <FieldName title={field.original}>{field.original}</FieldName>
//                 <FieldInput
//                   type="text"
//                   value={field.modified}
//                   onChange={(e) => handleFieldNameChange(index, e.target.value)}
//                   placeholder="Enter new field name"
//                   title={field.modified}
//                 />
//                 <ActionButtons>
//                   <AddToTableButton
//                     onClick={() => handleAddToTable(index)}
//                     disabled={field.addedToTable}
//                   >
//                     {field.addedToTable ? "Added to Table" : "Add to Table"}
//                   </AddToTableButton>
//                   <DeleteButton onClick={() => handleDeleteField(index)}>
//                     Delete
//                   </DeleteButton>
//                 </ActionButtons>
//               </FieldRow>
//             )
//         )}
//       </FieldsContainer>

//       <TableFieldsSection>
//         <h2>Table Fields</h2>
//         <TableFieldsList>
//           {tableFields.map((field, index) => (
//             <TableField key={index}>
//               <span>{field.modified}</span>
//               <DeleteButton onClick={() => removeFromTable(index)}>
//                 Remove
//               </DeleteButton>
//             </TableField>
//           ))}
//         </TableFieldsList>
//       </TableFieldsSection>
//     </ConfigureContainer>
//   );
// };

// export default ConfigureNewModel;

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getWidgetSpecificIsVisible } from "@utils/index";
import {
  ConfigureContainer,
  FieldRow,
  FieldName,
  FieldInput,
  DeleteButton,
  SaveButton,
  ButtonGroup,
  Title,
  FieldsContainer,
  ActionButtons,
  AddToTableButton,
  TableFieldsSection,
  TableFieldsList,
  TableField,
  HighlightedText
} from "./styles";

interface Field {
  original: string;
  modified: string;
  show: boolean;
  addedToTable: boolean;
}

interface ConfigureNewModelProps {
  id?: string;
  is_visible?: boolean;
  data?: {
    tab_name: string;
    row: number;
    list_data: any[];
  };
  actions?: {
    on_save?: any[];
  };
  dispatch?: any;
}

const mapStateToProps = (state: any, ownProps: any) => ({
  is_visible: getWidgetSpecificIsVisible(
    state.configuration?.normalisedConfig,
    ownProps.id
  ),
  data: state.global?.dataToConfigureNewModel,
  actions: state.configuration?.normalisedConfig?.[ownProps.id]?.actions
});

export const ConfigureNewModel: React.FC<ConfigureNewModelProps> = ({
  is_visible,
  data,
  actions,
  dispatch
}) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [tableFields, setTableFields] = useState<
    { original: string; modified: string }[]
  >([]);

  if (!is_visible || !data) return null;

  const flattenObject = (obj: any, prefix = ""): { [key: string]: string } => {
    return Object.keys(obj).reduce(
      (acc: { [key: string]: string }, key: string) => {
        const pre = prefix.length ? `${prefix}.` : "";

        if (typeof obj[key] === "object" && obj[key] !== null) {
          Object.assign(acc, flattenObject(obj[key], `${pre}${key}`));
        } else {
          acc[`${pre}${key}`] = obj[key]?.toString() || "";
        }

        return acc;
      },
      {}
    );
  };

  useEffect(() => {
    if (data?.list_data && data.list_data.length > 0) {
      const flattenedData = flattenObject(data.list_data[0]);
      const initialFields = Object.keys(flattenedData).map((key) => ({
        original: key,
        modified: key,
        show: true,
        addedToTable: false
      }));
      setFields(initialFields);
    }
  }, [data]);

  const handleFieldNameChange = (index: number, value: string) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], modified: value };
      return updated;
    });
  };

  const handleDeleteField = (index: number) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], show: false };
      return updated;
    });
  };

  const handleAddToTable = (index: number) => {
    const field = fields[index];
    if (!field.addedToTable) {
      setTableFields((prev) => [
        ...prev,
        {
          original: field.original,
          modified: field.modified
        }
      ]);
      setFields((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], addedToTable: true };
        return updated;
      });
    }
  };

  const removeFromTable = (index: number) => {
    const removedField = tableFields[index];
    setTableFields((prev) => prev.filter((_, i) => i !== index));
    setFields((prev) =>
      prev.map((field) =>
        field.original === removedField.original
          ? { ...field, addedToTable: false }
          : field
      )
    );
  };

  const handleSave = () => {
    if (actions?.on_save) {
      const mappedFields = fields
        .filter((field) => field.show)
        .reduce(
          (acc, field) => {
            acc[field.modified] = field.original;
            return acc;
          },
          {} as { [key: string]: string }
        );

      const payload = {
        requestBody: {
          current_node: "common_dashboard",
          expected_node: "common_dashboard",
          journey: "ops_panel"
        },
        data: {
          configuredModel: {
            tab_name: data.tab_name,
            row: data.row,
            fieldMappings: mappedFields,
            tableFields: tableFields.map((field) => ({
              original: field.original,
              display: field.modified
            }))
          }
        },
        shouldRedirect: true,
        showBasicLoader: true
      };

      actions.on_save.forEach((action) => {
        if (action.type === "fetch_config_redirect") {
          dispatch({
            type: "FETCH_CONFIG_REDIRECT",
            payload
          });
        }
      });
    }
  };

  return (
    <ConfigureContainer>
      <ButtonGroup>
        <SaveButton onClick={handleSave}>Save Model</SaveButton>
      </ButtonGroup>
      <Title>
        Configure <HighlightedText>{data?.tab_name || ""}</HighlightedText>{" "}
        Model Fields
      </Title>
      <FieldsContainer>
        {fields.map(
          (field, index) =>
            field.show && (
              <FieldRow key={index}>
                <FieldName title={field.original}>{field.original}</FieldName>
                <FieldInput
                  type="text"
                  value={field.modified}
                  onChange={(e) => handleFieldNameChange(index, e.target.value)}
                  placeholder="Enter new field name"
                  title={field.modified}
                />
                <ActionButtons>
                  <AddToTableButton
                    onClick={() => handleAddToTable(index)}
                    disabled={field.addedToTable}
                  >
                    {field.addedToTable ? "Added to Table" : "Add to Table"}
                  </AddToTableButton>
                  <DeleteButton onClick={() => handleDeleteField(index)}>
                    Delete
                  </DeleteButton>
                </ActionButtons>
              </FieldRow>
            )
        )}
      </FieldsContainer>

      <TableFieldsSection>
        <h2>Table Fields</h2>
        <TableFieldsList>
          {tableFields.map((field, index) => (
            <TableField key={index}>
              <span>{field.modified}</span>
              <DeleteButton onClick={() => removeFromTable(index)}>
                Remove
              </DeleteButton>
            </TableField>
          ))}
        </TableFieldsList>
      </TableFieldsSection>
    </ConfigureContainer>
  );
};

export default connect(mapStateToProps)(ConfigureNewModel);
