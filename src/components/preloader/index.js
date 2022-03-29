import React, {Component} from 'react';
import PreloaderIcon from "../../assets/img/logo/white.png"
class Index extends Component {
    render() {
        return (
            <div id="wrapper-load">
                <div className="load-container">
                    <img className="mb-3" src={PreloaderIcon}/>
                    <h6 className="font-julius-sans-one mb-4">chargement</h6>
                    <div className="load-bard"></div>
                    <div className="load-bard"></div>
                    <div className="load-bard"></div>
                </div>
            </div>
        );
    }
}

export default Index;