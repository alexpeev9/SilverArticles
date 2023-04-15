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
  required
}: any) => {
  return (
    <>
      <label htmlFor={name}>{label}* :</label>
      <input
        className='col-5 col-xl-3 me-4 my-2 py-1'
        type={type}
        placeholder={`Enter ${label}`}
        name={name}
        value={value}
        onChange={action}
        pattern={pattern}
        title={title}
        min={min}
        max={max}
        // required={required ? required : true}
      />
    </>
  )
}

export default InputField
