import React from "react";

class Layout extends React.Component {

    renderNav() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container-fluid">
                    <a className="navbar-brand mb-0 h1" href="/">
                        JG
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/assistance">
                                    Assistances
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/new/assistance">
                                    Add Assitance
                                </a>
                            </li>
                        </ul>
                        <span className="navbar-text">Guatemala, guatemala</span>
                    </div>
                </div>
            </nav>
        );
    }

    renderFooter() {
        return (
            <div className="mt-5 p-5" style={{ backgroundColor: '#ded3d3' }}>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-md-3 item">
                                <h5>Services</h5>
                                <ul>
                                    <li>
                                        <a className="nav-link" href="/">Web Design</a>
                                    </li>
                                    <li>
                                        <a className="nav-link" href="/">Backend Developer</a>
                                    </li>
                                    <li>
                                        <a className="nav-link" href="/">CI/CD</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-6 col-md-3 item">
                                <h5>Otros</h5>
                                <ul>
                                    <li>
                                        <a className="nav-link" href="/">Mission</a>
                                    </li>
                                    <li>
                                        <a className="nav-link" href="/">Vision</a>
                                    </li>
                                    <li>
                                        <a className="nav-link" href="/">Team</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6 item text">
                                <h4>Jefferson Geovanny Moreno Perez</h4>
                                <span>
                                    Highly capable person, dedicated to the development and deployment of native and web applications.
                                </span>
                            </div>
                        </div>
                        <p className="copyright">JG Creative Solutions © 2024</p>
                    </div>
                </footer>
            </div>
        );
    }

    render() {
        return (
            <>
                {this.renderNav()}

                <div className="mt-5 mb-5 p-5">{this.props.children}</div>

                {this.renderFooter()}
            </>
        );
    }
}

export default Layout;
