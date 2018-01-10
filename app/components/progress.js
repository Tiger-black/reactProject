//进度条组件
import React from 'react'
import './progress.less'

class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.changeProgress = this.changeProgress.bind(this);
        this.state = {
            barcolor: this.props.barcolor || '#2f9842'
        };
    }
    
    changeProgress(e) {
        let progressBar = this.refs.progressBar;
        let progress=(e.clientX-progressBar.getBoundingClientRect().left)/(progressBar.clientWidth);
        this.props.onProgressChange && this.props.onProgressChange(progress);
    }

    render() {
        return <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
                <div className="progress" 
                    style={{ width: `${this.props.progress}%`, background: this.state.barcolor}} 
                > </div>
            </div>
    }
};

export default Progress;