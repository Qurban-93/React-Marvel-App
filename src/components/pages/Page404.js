import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const Page404 = () => {

    return(
        <div>
            <ErrorMessage />
            <p style={{textAlign : 'center'}}>Page Not Found </p>
            <Link style={{textAlign : 'center' , display : 'block'}} to={'/'}>
             Go Home Page
            </Link>
        </div>
    )
}

export default Page404 ;