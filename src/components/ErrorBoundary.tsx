import { Component } from 'react';

class ErrorBoundary extends Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: any) {
        console.log('getDerivedStateFromError', error);
        return { hasError: true };
    }
  
    componentDidCatch(error: any, errorInfo: any) {
      console.log('componentDidCatch', error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong</h1>;
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary;