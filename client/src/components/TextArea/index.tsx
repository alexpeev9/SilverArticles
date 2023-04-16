const TextArea = ({
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
      <textarea
        placeholder={`Enter ${label}`}
        name={name}
        value={value}
        onChange={action}
        title={title}
        required={required ? required : true}
      />
    </>
  )
}

export default TextArea
