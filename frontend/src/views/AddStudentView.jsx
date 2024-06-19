import React from "react";
import Layout from "../template/Layout";
import AddStudentComponent from "../components/AddStudentComponent";

class StudentView extends React.Component {
    render() {
        return (
            <Layout>
                <AddStudentComponent/>
            </Layout>
        );
    }
}

export default StudentView;