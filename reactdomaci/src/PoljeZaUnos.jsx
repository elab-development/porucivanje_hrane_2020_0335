import React from 'react';
 

const PoljeZaUnos = ({ label, type = 'text', name, value, onChange, required = false, isTextArea = false }) => {
  return (
    <div className="polje-za-unos">
      <label>{label}</label>
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default PoljeZaUnos;
