import React, {Component, Fragment} from 'react';
import './assets/css/bootstrap.min.css';
// import './assets/css/style.css';
import NavBar from "./components/nav/NavBar";
class App extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
            </Fragment>
        );
    }
}

export default App;