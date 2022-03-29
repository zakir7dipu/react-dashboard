import React, {Component} from 'react';

class Index extends Component {
    render() {
        return (
            <div id="wrapper-footer">
                <div className="copyright bg-dark text-center text-sm-left">
                    <span className="text-grey">Copyright © {new Date().getFullYear()} </span>
                    <span className="px-1 text-white">DAC</span>
                    <span className="text-grey">All rights reserved.</span>
                    {/*<span className="d-block d-sm-inline-block  float-sm-right mt-1 mt-sm-0">*/}
                    {/*    <a href="#" className="text-light mx-2">Terms of use</a> */}
                    {/*    <span className="text-muted">|</span> */}
                    {/*    <a href="#" className="text-light ml-2">Privacy Policy</a>*/}
                    {/*</span>*/}
                </div>
            </div>
        );
    }
}

export default Index;