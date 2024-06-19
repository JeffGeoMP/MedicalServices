import React from "react";
import Layout from "../template/Layout";
import AssistanceComponent from "../components/AssistanceComponent";

class AssistanceView extends React.Component {
    render() {
        return (
            <Layout>
                <AssistanceComponent/>
            </Layout>
        );
    }
}

export default AssistanceView;