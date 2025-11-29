import React from "react";

import PassengersSelect from "./PassengersLableState";
import ControlledInput from "../../Molecules/MUI/ControlledInput";

const PassengersDocs = ({ state, setState, errorDocs }) => {
  let doc_id;
  const onChangeSelect = (value, id) => {
    doc_id = value === "Паспорт РФ" ? "passport" : "certificate";
    if (doc_id) {
      setState((prevState) => ({
        ...prevState,
        type_docs: { id: doc_id, description: value },
        data_docs: { seria: "", number: "" },
      }));
    }
  };
  const onChangeInput = (value, id, type) => {
    if (type === "certificate" && id === "number")
      setState((prevState) => ({
        ...prevState,
        data_docs: { number: value },
      }));
    if (type === "passport" && id === "seria") {
      setState((prevState) => ({
        ...prevState,
        data_docs: { seria: value, number: state.data_docs.number },
      }));
    } else if (type === "passport" && id === "number") {
      setState((prevState) => ({
        ...prevState,
        data_docs: { seria: state.data_docs.seria, number: value },
      }));
    }
  };
  return (
    <React.Fragment>
      <div className="form passengers-docs_form">
        <div className="passengers-data_docs">
          <div className="passengers-data_type">
            <label className="passengers-data_document_label">
              Тип документа
            </label>
            <PassengersSelect
              id={state.type_docs.id}
              type={state.type_docs.id}
              setState={onChangeSelect}
              value={state.type_docs.description}
              options={["Паспорт РФ", "Свидетельство о рождении"]}
            />
          </div>

          {state.type_docs.id === "passport" ? (
            <div className="form-group group_document-range">
              <label className="passengers-data_document_label">Серия</label>
              <ControlledInput
                id={"seria"}
                type={state.type_docs.id}
                state={state.data_docs.seria}
                onChangeInput={onChangeInput}
              />
            </div>
          ) : null}
          <div className="form-group group_document-number">
            <label className="passengers-data_document_label">Номер</label>
            <ControlledInput
              id={"number"}
              errorDocs={errorDocs}
              type={state.type_docs.id}
              state={state.data_docs.number}
              onChangeInput={onChangeInput}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PassengersDocs;
