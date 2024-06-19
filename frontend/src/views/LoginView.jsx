import React from "react";
import Layout from "../template/Layout";
import LoginComponent from "../components/LoginComponent";

class StudentView extends React.Component {
    render() {
        return (
            <Layout>
                <LoginComponent/>
            </Layout>
        );
    }
}

export default StudentView;