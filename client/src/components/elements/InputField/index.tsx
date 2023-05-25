const InputField = ({
  name,
  label,
  type,
  value,
  action,
  pattern,
  title,
  min,
  max,
  readOnly,
  checked,
  required
}: any) => {
  return (
    <>
      <label htmlFor={name}>{label}* :</label>
      <input
        type={type}
        placeholder={`Enter ${label}`}
        name={name}
        value={value}
        onChange={action}
        pattern={pattern}
        title={title}
        min={min}
        max={max}
        checked={checked}
        readOnly={readOnly}
        required={required}
      />
    </>
  )
}

export default InputField
