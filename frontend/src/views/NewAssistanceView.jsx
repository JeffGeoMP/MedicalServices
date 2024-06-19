import React from "react";
import Layout from "../template/Layout";
import NewAssistanceComponent from "../components/NewAssistanceComponent";

class NewAssistanceView extends React.Component {
    render() {
        return (
            <Layout>
                <NewAssistanceComponent/>
            </Layout>
        );
    }
}

export default NewAssistanceView;