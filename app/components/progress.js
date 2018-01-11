//进度条组件
import React from 'react'
import './progress.less'

class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.changeProgress = this.changeProgress.bind(this);
    }
    static defaultProps = {
        barcolor: '#2f9842'
    }
    changeProgress(e) {
        let progressBar = this.refs.progressBar;
        let progress=(e.clientX-progressBar.getBoundingClientRect().left)/(progressBar.clientWidth);
        this.props.onProgressChange && this.props.onProgressChange(progress);
    }

    render() {
        return <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
                <div className="progress" 
                    style={{ width: `${this.props.progressNum}%`, background: this.props.barcolor}} 
                > </div>
            </div>
    }
};

export default Progress;