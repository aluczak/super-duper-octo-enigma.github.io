import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <section className="page">
    <h1>Oops! That route is in tall grass.</h1>
    <p>The page you are looking for does not exist.</p>
    <Link className="primary" to="/">
      Return home
    </Link>
  </section>
)

export default NotFoundPage
