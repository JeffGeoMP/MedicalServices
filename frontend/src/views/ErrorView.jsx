import React from "react";
import Layout from "../template/Layout";

class ErrorView extends React.Component {
    render() {
        return (
            <Layout>
                <h1 className="display-3 mt-3 p-2">Oops.</h1>
                <h1 className="display-5">Page Not Found</h1>
            </Layout>
        );
    }
}

export default ErrorView;