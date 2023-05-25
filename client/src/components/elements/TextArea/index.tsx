const TextArea = ({ name, label, value, action, title, required }: any) => {
  return (
    <>
      <label htmlFor={name}>{label}* :</label>
      <textarea
        placeholder={`Enter ${label}`}
        name={name}
        rows={20}
        value={value}
        onChange={action}
        title={title}
        required={required}
      />
    </>
  )
}

export default TextArea
