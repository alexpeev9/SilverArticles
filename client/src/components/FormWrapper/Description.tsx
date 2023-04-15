import { Link } from 'react-router-dom'

const Description = ({ route, question, answer, info }: any) => {
  return (
    <div className='col-6 col-7-medium text-section'>
      <Link to={route}>
        {question} <span className='button-cta'>{answer}</span>
      </Link>
      <p>{info}</p>
    </div>
  )
}

export default Description
