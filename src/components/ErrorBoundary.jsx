import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        const { hasError, error } = this.state;
        if (hasError) {
            return (
                <>
                    <h1>The following error has occurred</h1>
                    <h3>{error}</h3>
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
