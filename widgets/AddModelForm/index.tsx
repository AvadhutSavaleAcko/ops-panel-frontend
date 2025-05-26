// import React, { useState } from "react";
// import {
//   FormContainer,
//   FormTitle,
//   FormGroup,
//   Label,
//   Input,
//   ButtonGroup,
//   SaveButton,
//   CancelButton,
//   Select,
//   PathVariableContainer,
//   AddPathVariableButton,
//   PathVariableList,
//   PathVariableItem,
//   RemovePathVariableButton,
//   InputSmall,
//   Formheader
// } from "./styles";
// import { connect, useSelector } from "react-redux";
// import { getWidgetSpecificIsVisible } from "@utils/index";
// import { getIsVisible } from "@utils/hooks/getIsVisible";

// interface AddModelFormProps {
//   id?: string;
//   onSubmit: (data: any) => void;
//   onCancel: () => void;
//   is_visible;
//   actions;
// }
// // const mapStateToProps = (state: any, ownProps: any) => ({
// //   is_visible: getWidgetSpecificIsVisible(
// //       state.configuration?.normalisedConfig,
// //       ownProps.id
// //     ),
// //   actions: state.configuration?.normalisedConfig?.[ownProps.id]?.actions
// // });

// export const AddModelForm: React.FC<AddModelFormProps> = (props) => {
//   const is_visible = getIsVisible({ id: props.id });
//   const { actions, onCancel, onSubmit } = props;

//   const [formData, setFormData] = useState({
//     tab_name: "",
//     row: "",
//     list: {
//       name: "",
//       url: "",
//       method: "GET",
//       headers: {},
//       params: {},
//       body: {},
//       path_variable: {} as Record<string, string>
//     }
//   });

//   const [newPathVariable, setNewPathVariable] = useState({
//     key: "",
//     value: ""
//   });
//   const [pathVariables, setPathVariables] = useState<Record<string, string>>(
//     {}
//   );
//   const [newParam, setNewParam] = useState({ key: "", value: "" });
//   const [params, setParams] = useState<Record<string, string>>({});
//   const [newBodyField, setNewBodyField] = useState({ key: "", value: "" });
//   const [bodyFields, setBodyFields] = useState<Record<string, string>>({});
//   const [headers, setHeaders] = useState<Record<string, string>>({});
//   const [newHeader, setNewHeader] = useState({ key: "", value: "" });

//   const handleInputChange = (field: string, value: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleListChange = (field: string, value: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       list: {
//         ...prev.list,
//         [field]: value
//       }
//     }));
//   };

//   const addKeyValuePair = (
//     key: string,
//     value: string,
//     stateSetter: React.Dispatch<React.SetStateAction<Record<string, string>>>,
//     fieldName: "path_variable" | "params" | "body" | "headers"
//   ) => {
//     if (key && value) {
//       stateSetter((prev) => {
//         const updated = { ...prev, [key]: value };
//         setFormData((curr) => ({
//           ...curr,
//           list: {
//             ...curr.list,
//             [fieldName]: updated
//           }
//         }));

//         return updated;
//       });

//       return true;
//     }
//     return false;
//   };
//   const removeKeyValuePair = (
//     keyToRemove: string,
//     stateSetter: React.Dispatch<React.SetStateAction<Record<string, string>>>,
//     fieldName: "path_variable" | "params" | "body" | "headers"
//   ) => {
//     stateSetter((prev) => {
//       const updated = { ...prev };
//       delete updated[keyToRemove];

//       setFormData((curr) => ({
//         ...curr,
//         list: {
//           ...curr.list,
//           [fieldName]: updated
//         }
//       }));

//       return updated;
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const submitData = {
//       ...formData,
//       list: {
//         ...formData.list,
//         headers: headers,
//         path_variable: pathVariables,
//         params: params,
//         body: bodyFields
//       }
//     };
//     onSubmit(submitData);
//   };
//   const renderKeyValueSection = (
//     title: string,
//     newValue: { key: string; value: string },
//     setNewValue: React.Dispatch<
//       React.SetStateAction<{ key: string; value: string }>
//     >,
//     values: Record<string, string>,
//     onAdd: () => void,
//     onRemove: (key: string) => void
//   ) => (
//     <FormGroup>
//       <Label>{title}</Label>
//       <PathVariableContainer>
//         <InputSmall
//           type="text"
//           placeholder="Key"
//           value={newValue.key}
//           onChange={(e) =>
//             setNewValue((prev) => ({ ...prev, key: e.target.value }))
//           }
//         />
//         <InputSmall
//           type="text"
//           placeholder="Value"
//           value={newValue.value}
//           onChange={(e) =>
//             setNewValue((prev) => ({ ...prev, value: e.target.value }))
//           }
//         />
//         <AddPathVariableButton type="button" onClick={onAdd}>
//           Add
//         </AddPathVariableButton>
//       </PathVariableContainer>

//       <PathVariableList>
//         {Object.entries(values).map(([key, value]) => (
//           <PathVariableItem key={key}>
//             <span>
//               <strong>{key}:</strong> {value}
//             </span>
//             <RemovePathVariableButton
//               type="button"
//               onClick={() => onRemove(key)}
//             >
//               ×
//             </RemovePathVariableButton>
//           </PathVariableItem>
//         ))}
//       </PathVariableList>
//     </FormGroup>
//   );
//   if (!is_visible) return null;
//   return (
//     <FormContainer onSubmit={handleSubmit}>
//       <Formheader>
//         <FormTitle>Add New Model</FormTitle>
//         <ButtonGroup>
//           <CancelButton type="button" onClick={onCancel}>
//             Cancel
//           </CancelButton>
//           <SaveButton type="submit">Configure Model</SaveButton>
//         </ButtonGroup>
//       </Formheader>

//       <FormGroup>
//         <Label>Tab Name</Label>
//         <Input
//           type="text"
//           value={formData.tab_name}
//           onChange={(e) => handleInputChange("tab_name", e.target.value)}
//           required
//         />
//       </FormGroup>

//       <FormGroup>
//         <Label>Row</Label>
//         <Input
//           type="number"
//           value={formData.row}
//           onChange={(e) => handleInputChange("row", e.target.value)}
//           required
//         />
//       </FormGroup>

//       <FormGroup>
//         <Label>URL</Label>
//         <Input
//           type="text"
//           value={formData.list.url}
//           onChange={(e) => handleListChange("url", e.target.value)}
//           required
//         />
//       </FormGroup>

//       <FormGroup>
//         <Label>Method</Label>
//         <Select
//           value={formData.list.method}
//           onChange={(e) => handleListChange("method", e.target.value)}
//         >
//           <option value="GET">GET</option>
//           <option value="POST">POST</option>
//           <option value="PUT">PUT</option>
//           <option value="DELETE">DELETE</option>
//         </Select>
//       </FormGroup>
//       {renderKeyValueSection(
//         "Path Variables",
//         newPathVariable,
//         setNewPathVariable,
//         pathVariables,
//         () => {
//           if (
//             addKeyValuePair(
//               newPathVariable.key,
//               newPathVariable.value,
//               setPathVariables,
//               "path_variable"
//             )
//           ) {
//             setNewPathVariable({ key: "", value: "" });
//           }
//         },
//         (key) => removeKeyValuePair(key, setPathVariables, "path_variable")
//       )}
//       {renderKeyValueSection(
//         "headers",
//         newHeader,
//         setNewHeader,
//         headers,
//         () => {
//           if (
//             addKeyValuePair(
//               newHeader.key,
//               newHeader.value,
//               setHeaders,
//               "headers"
//             )
//           ) {
//             setNewPathVariable({ key: "", value: "" });
//           }
//         },
//         (key) => removeKeyValuePair(key, setPathVariables, "headers")
//       )}
//       {renderKeyValueSection(
//         "Path Parameters",
//         newParam,
//         setNewParam,
//         params,
//         () => {
//           if (
//             addKeyValuePair(newParam.key, newParam.value, setParams, "params")
//           ) {
//             setNewParam({ key: "", value: "" });
//           }
//         },
//         (key) => removeKeyValuePair(key, setParams, "params")
//       )}
//       {renderKeyValueSection(
//         "Body Fields",
//         newBodyField,
//         setNewBodyField,
//         bodyFields,
//         () => {
//           if (
//             addKeyValuePair(
//               newBodyField.key,
//               newBodyField.value,
//               setBodyFields,
//               "body"
//             )
//           ) {
//             setNewBodyField({ key: "", value: "" });
//           }
//         },
//         (key) => removeKeyValuePair(key, setBodyFields, "body")
//       )}
//     </FormContainer>
//   );
// };

// export default AddModelForm;

import React, { useState } from "react";
import {
  FormContainer,
  FormTitle,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  SaveButton,
  CancelButton,
  Select,
  PathVariableContainer,
  PathVariableList,
  PathVariableItem,
  RemovePathVariableButton,
  InputSmall,
  Formheader,
  AddPathVariableButton
} from "./styles";
import { connect, useDispatch } from "react-redux";
import { getIsVisible } from "@utils/hooks/getIsVisible";
import { fetchConfigAndRedirect } from "@actions/fetchConfigRedirect";

interface AddModelFormProps {
  id?: string;
  is_visible?: boolean;
  heading?: string;
  formFields?: any[];
  keyValueSections?: any[];
  actions?: {
    on_submit?: Array<{
      type: string;
      args: any;
    }>;
    on_cancel?: Array<{
      type: string;
      args: any;
    }>;
  };
}

export const AddModelForm: React.FC<AddModelFormProps> = (props) => {
  const { id, actions } = props;
  const dispatch = useDispatch();
  const is_visible = getIsVisible({ id });

  const [formData, setFormData] = useState({
    tab_name: "",
    row: "",
    list: {
      url: "",
      method: "GET",
      headers: {},
      params: {},
      body: {},
      path_variable: {}
    }
  });

  const [keyValuePairs, setKeyValuePairs] = useState({
    headers: {},
    params: {},
    body: {},
    path_variable: {}
  });

  const handleInputChange = (name: string, value: any) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleKeyValueChange = (section: string, keyOrValues: any) => {
    if (typeof keyOrValues === "object") {
      setKeyValuePairs((prev) => ({
        ...prev,
        [section]: keyOrValues
      }));
    } else {
      const [key, value] = keyOrValues;
      setKeyValuePairs((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
    }
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      list: {
        ...formData.list,
        ...keyValuePairs
      }
    };
    debugger
    console.log("Form Data:", formData);
    
    const payload = {
      requestBody: {
        current_node: "common_dashboard",
        expected_node: "common_dashboard",
        journey: "ops_panel"
      },
      data: submitData
    };

    await fetchConfigAndRedirect({
      ...payload,
      shouldRedirect: true,
      showBasicLoader: true,
      shouldClearStore: true,
      showCustomBasicLoader: true
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      list: {
        ...formData.list,
        ...keyValuePairs
      }
    };

    if (actions?.on_submit) {
      actions.on_submit.forEach((action) => {
        dispatch({
          type: action.type,
          payload: {
            ...action.args,
            data: submitData
          }
        });
      });
    }
  };

  const handleCancel = () => {
    if (actions?.on_cancel) {
      actions.on_cancel.forEach((action) => {
        dispatch({
          type: action.type,
          payload: action.args
        });
      });
    }
  };

  if (!is_visible) return null;

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <Formheader>
        <FormTitle>{props.heading || "Add New Model"}</FormTitle>
        <ButtonGroup>
          <SaveButton type="submit">Configure Model</SaveButton>
        </ButtonGroup>
      </Formheader>

      {props.formFields?.map((field) => (
        <FormGroup key={field.id}>
          <Label>{field.data.props.label}</Label>
          {field.type === "inputfield" ? (
            <Input
              type={field.data.props.type}
              name={field.data.props.name}
              value={formData[field.data.props.name]}
              onChange={(e) =>
                handleInputChange(field.data.props.name, e.target.value)
              }
              required={field.data.props.required}
              placeholder={field.data.props.placeholder}
            />
          ) : (
            field.type === "dropdown" && (
              <Select
                name={field.data.props.name}
                value={formData.list[field.data.props.name]}
                onChange={(e) =>
                  handleInputChange(
                    `list.${field.data.props.name}`,
                    e.target.value
                  )
                }
              >
                {field.data.props.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            )
          )}
        </FormGroup>
      ))}

      {props.keyValueSections?.map((section) => (
        <FormGroup key={section.id}>
          <Label>{section.data.props.title}</Label>
          <KeyValueSection
            sectionName={section.data.props.fieldName}
            values={keyValuePairs[section.data.props.fieldName] || {}}
            onChange={handleKeyValueChange}
          />
        </FormGroup>
      ))}
    </FormContainer>
  );
};
interface KeyValueSectionProps {
  sectionName: string;
  values: Record<string, string>;
  onChange: (section: string, values: Record<string, string>) => void;
}

const KeyValueSection: React.FC<KeyValueSectionProps> = ({
  sectionName,
  values = {},
  onChange
}) => {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAdd = () => {
    if (newKey && newValue) {
      const updatedValues = {
        ...values,
        [newKey]: newValue
      };
      onChange(sectionName, updatedValues);
      setNewKey("");
      setNewValue("");
    }
  };

  const handleRemove = (keyToRemove: string) => {
    const updatedValues = Object.entries(values)
      .filter(([key]) => key !== keyToRemove)
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value
        }),
        {}
      );
    onChange(sectionName, updatedValues);
  };

  return (
    <>
      <PathVariableContainer>
        <InputSmall
          type="text"
          placeholder="Key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <InputSmall
          type="text"
          placeholder="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <AddPathVariableButton type="button" onClick={handleAdd}>
          Add
        </AddPathVariableButton>
      </PathVariableContainer>

      <PathVariableList>
        {Object.entries(values).map(([key, value]) => (
          <PathVariableItem key={key}>
            <span>
              <strong>{key}:</strong> {String(value)}
            </span>
            <RemovePathVariableButton
              type="button"
              onClick={() => handleRemove(key)}
            >
              ×
            </RemovePathVariableButton>
          </PathVariableItem>
        ))}
      </PathVariableList>
    </>
  );
};

export default AddModelForm;
