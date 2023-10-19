import ErrorMessage from "../errorMessage/ErrorMessage";
import { Component } from "react/cjs/react.production.min";



class ErrorBoundary extends Component{
    state = {
        error : false
    }

    componentDidCatch(error, info){
        this.setState({
            error: true
        })
    }

    render(){
        return (
            this.state.error ?
            <ErrorMessage /> : this.props.children
        )
    }
}

export default ErrorBoundary;

