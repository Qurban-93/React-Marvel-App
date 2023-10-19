import image from './error.gif';

const ErrorMessage = () => {
    return(
        <img src={image} 
        style={{display:'block' , width: '250px' ,height: '250px' , objectFit:'contain',margin:"0 auto "}} alt='dimdiy' />
    )
}

export default ErrorMessage;