import React, { useCallback } from "react";
import PassengersSelect from "./PassengersLableState";
import ControlledInput from "../MUI/ControlledInput";
import "./PassengersDocs.css";

const PassengersDocs = ({ state, setState, errorDocs }) => {
  const onChangeSelect = useCallback((value, id) => {
    const doc_id = value === "Паспорт РФ" ? "passport" : "certificate";
    if (doc_id) {
      setState((prevState) => ({
        ...prevState,
        type_docs: { 
          id: doc_id, 
          description: value 
        },
        data_docs: { 
          seria: "", 
          number: "" 
        },
      }));
    }
  }, [setState]);

  const onChangeInput = useCallback((value, id) => {
    setState((prevState) => ({
      ...prevState,
      data_docs: {
        ...prevData.docs,
        [id]: value,
      },
    }));
  }, [setState]);

  const handlePassportInput = useCallback((value, id) => {
    setState((prevState) => ({
      ...prevState,
      data_docs: {
        ...prevState.data_docs,
        [id]: value,
      },
    }));
  }, [setState]);

  const handleCertificateInput = useCallback((value) => {
    setState((prevState) => ({
      ...prevState,
      data_docs: {
        ...prevState.data_docs,
        number: value,
      },
    }));
  }, [setState]);

  return (
    <div className="passengers-docs_form">
      {/* Заголовки документа */}
      <div className="docs-header-row">
        <div className="field-label">Тип документа</div>
        {state.type_docs.id === "passport" ? (
          <>
            <div className="field-label">Серия</div>
            <div className="field-label">Номер</div>
          </>
        ) : (
          <div className="field-label">Номер свидетельства</div>
        )}
      </div>

      {/* Поля документа */}
      <div className="docs-fields-row">
        <div className={`doc-type-field ${state.type_docs.id === "passport" ? "passport-type" : ""}`}>
          <PassengersSelect
            id={state.type_docs.id}
            type={state.type_docs.id}
            setState={onChangeSelect}
            value={state.type_docs.description}
            options={["Паспорт РФ", "Свидетельство о рождении"]}
            placeholder="Тип документа"
          />
        </div>

        {state.type_docs.id === "passport" ? (
          <>
            <div className="passport-seria-field">
              <ControlledInput
                id="seria"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                state={state.data_docs.seria}
                onChangeInput={handlePassportInput}
                maxLength={4}
                placeholder="____"
                className="passport-seria-input"
              />
            </div>
            
            <div className="passport-number-field">
              <ControlledInput
                id="number"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                state={state.data_docs.number}
                onChangeInput={handlePassportInput}
                maxLength={6}
                placeholder="______"
                className="passport-number-input"
              />
            </div>
          </>
        ) : (
          <div className="certificate-field">
            <ControlledInput
              id="number"
              type="text"
              state={state.data_docs.number}
              onChangeInput={(value) => handleCertificateInput(value)}
              maxLength={20}
              placeholder="VIII-ЫП-123456"
              className="certificate-number-input"
              error={errorDocs}
            />
          </div>
        )}
      </div>
      
      {/* Сообщение об ошибке для свидетельства */}
      {errorDocs && state.type_docs.id === "certificate" && (
        <div className="certificate-error-message">
          Неверный формат. Пример: VIII-ЫП-123456
        </div>
      )}
    </div>
  );
};

export default PassengersDocs;