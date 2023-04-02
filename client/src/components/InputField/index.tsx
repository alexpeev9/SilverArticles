const InputField = ({
  name,
  label,
  type,
  value,
  action,
  pattern,
  title,
  min,
  max
}: any) => {
  return (
    <>
      <label htmlFor={name} className='col-5 col-xl-2 text-center my-2 py-1'>
        {label}* :
      </label>
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
        required
      />
    </>
  )
}

export default InputField
