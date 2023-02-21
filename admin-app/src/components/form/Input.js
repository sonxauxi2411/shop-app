import React from "react";

function Input({ label, type = "text", name, formik, placeholder }) {
  // console.log(formik.errors[name]);
  return (
    <div className="d-flex flex-column gap-1 form-input col py-3 ">
      <label>{label}</label>
      <input
        className={`border-0 border-bottom border-3 form-control ${
          formik.errors[name] && "is-invalid border-danger"
        }
        `}
        type={type}
        name={name}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
      />
    </div>
  );
}

export default Input;
