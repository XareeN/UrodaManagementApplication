import React from "react";
import {Button, Col, ControlLabel, FormControl, FormGroup, HelpBlock, Row} from "react-bootstrap";
// import "../../resources/static/css/login.min.css";
// import "../../resources/static/js/login/login.min";
// import "../../resources/static/js/jquery.min";
// import "../../resources/static/sass/login.scss";

class Login extends React.Component {

    // constructor() {
    //     super();
    //
    //     this.state = {
    //         email: "",
    //         password: "",
    //     };
    // }
    //
    // validateForm() {
    //     return this.state.email.length > 0 && this.state.password.length > 0;
    // };
    //
    // handleChange(event) {
    //     this.setState({
    //         [event.target.id]: event.target.value
    //     });
    // };
    //
    // handleSubmit(event) {
    //     event.preventDefault();
    // };\\

    componentDidMount(){
        document.title = "UrodaApp | Logowanie";
    }

    render() {
        return (
            <Row>
                <Col md={4} sm={2}/>
                <Col md={4} sm={8}>
                    <form role="form" method="post">
                        <label htmlFor={"inputUser"} style={{marginRight: 5}}>
                            <span>Email</span>
                            <input name="userName" type="text" className="form-control" id="inputUser"/>
                        </label>
                        <label htmlFor={"inputPassword"} style={{marginRight: 5}}>
                            <span>Hasło</span>
                            <input name="userPassword" type="password" className="form-control" id="inputPassword"/>
                        </label>
                        {/*<p className="forgot-pass">Zapomniałeś/-aś hasła?</p>*/}
                        <button type="submit" className="btn btn-default">Zaloguj</button>
                        {/*<button type="button" className="fb-btn">Połącz z <span>facebook</span></button>*/}
                    </form>
                </Col>
                <Col md={4} sm={2}/>



                {/*<div className="Login">*/}
                {/*<form onSubmit={this.handleSubmit}>*/}
                {/*<FormGroup controlId="email" bsSize="large">*/}
                {/*<ControlLabel>Zaloguj się</ControlLabel>*/}
                {/*<FormControl*/}
                {/*autoFocus*/}
                {/*id="inputUser"*/}
                {/*placeholder="E-mail"*/}
                {/*type="email"*/}
                {/*value={this.state.email}*/}
                {/*onChange={this.handleChange}/>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup controlId="password" bsSize="large">*/}
                {/*/!*<ControlLabel>Hasło</ControlLabel>*!/*/}
                {/*<FormControl*/}
                {/*placeholder="Hasło"*/}
                {/*id="inputPassword"*/}
                {/*value={this.state.password}*/}
                {/*onChange={this.handleChange}*/}
                {/*type="password"/>*/}
                {/*</FormGroup>*/}
                {/*<Button*/}
                {/*block*/}
                {/*bsSize="large"*/}
                {/*disabled={!this.validateForm()}*/}
                {/*type="submit">*/}

                {/*Login*/}
                {/*</Button>*/}
                {/*</form>*/}
                {/*</div>*/}





                {/*<div className="cont">*/}
                {/*<div className="form sign-in">*/}
                {/*<h2>Witaj z powrotem!</h2>*/}
                {/*<form role="form" method="post">*/}
                {/*<label htmlFor={"inputUser"}>*/}
                {/*<span>Email</span>*/}
                {/*<input name="userName" type="text" className="form-control" id="inputUser"/>*/}
                {/*</label>*/}
                {/*<label htmlFor={"inputPassword"}>*/}
                {/*<span>Hasło</span>*/}
                {/*<input name="userPassword" type="password" className="form-control" id="inputPassword"/>*/}
                {/*</label>*/}
                {/*<p className="forgot-pass">Zapomniałeś/-aś hasła?</p>*/}
                {/*<button type="submit" className="btn btn-default">Zaloguj</button>*/}
                {/*<button type="button" className="fb-btn">Połącz z <span>facebook</span></button>*/}
                {/*</form>*/}
                {/*</div>*/}
                {/*<div className="sub-cont">*/}
                {/*<div className="img">*/}
                {/*<div className="img__text m--up">*/}
                {/*<h2>Pierwszy raz tutaj?</h2>*/}
                {/*<p>Zarejestruj się by móc rezerwować wizyty online!</p>*/}
                {/*</div>*/}
                {/*<div className="img__text m--in">*/}
                {/*<h2>Masz już konto?</h2>*/}
                {/*<p>Jeżeli tak, zaloguj się. Brakowało nam Ciebie!</p>*/}
                {/*</div>*/}
                {/*<div className="img__btn">*/}
                {/*<span className="m--up">Zarejestruj</span>*/}
                {/*<span className="m--in">Zaloguj </span>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="form sign-up">*/}
                {/*<h2>Poczuj się jak u siebie!</h2>*/}
                {/*<label>*/}
                {/*<span>Nazwa</span>*/}
                {/*<input type="text" />*/}
                {/*</label>*/}
                {/*<label>*/}
                {/*<span>Email</span>*/}
                {/*<input type="email" />*/}
                {/*</label>*/}
                {/*<label>*/}
                {/*<span>Hasło</span>*/}
                {/*<input type="password" />*/}
                {/*</label>*/}
                {/*<button type="button" className="submit">Zarejestruj się</button>*/}
                {/*<button type="button" className="fb-btn">Dołącz z <span>facebook</span></button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
            </Row>
        );
    }
}

export default Login;