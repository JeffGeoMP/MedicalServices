import React from "react";
import { Notify, Loading } from "notiflix";
import LoginService from "../services/loginService";
import authenticate from "../auth/authenticate";

class LoginComponent extends React.Component {

    loginService = new LoginService();

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        if (email === '' || password === '') {
            Notify.warning('Please fill in the fields');
            return;
        }

        Loading.pulse('Logging in');
        this.loginService.loginUser(email, password)
            .then((response) => {
                if (response.data.success === false)
                    Notify.warning('Could not log in please try again later.');
                authenticate.setToken(response.data.token);
                window.location = '/new/assistance';
            }).catch((error) => {
                let message = error.response?.data?.message || error.message;
                Notify.warning(message);
            })
            .finally(() => {
                Loading.remove()
            });
    }

    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <span className="mt-3 p-2">Login to access the application</span>
                <form onSubmit={this.handleSubmitForm}>
                    <div className="col-md-4 offset-md-4">
                        <div className="form-group">
                            <label htmlFor="input-email">Email</label>
                            <input type="text" className="form-control" id="input-email" placeholder="Enter email"
                                value={this.state.email} onChange={this.handleChangeEmail} required />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="input-password">Password</label>
                            <input type="password" className="form-control" id="input-password" placeholder="Enter Password"
                                value={this.state.password} onChange={this.handleChangePassword} required />
                        </div>
                        <div className="col-md-6 offset-md-3">
                            <button type="submit" className="btn btn-primary mt-3 w-100">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginComponent;