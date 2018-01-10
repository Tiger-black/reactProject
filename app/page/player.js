//播放页面
import React from 'react'
import Progress from '../components/progress'
import './player.less'


let duration = null;
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = { progress: '' };
    }  
    componentDidMount(){
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            })
        });
    }
    componentWillUnmount() {
        $("#player").unbind($.jPlayer.event.timeupdate);
    }
    progressChangeHandler(res) {
        $("#player").jPlayer('play', duration * res);
    }
    render() {
        return (
            <div className="player-page">
                <div className="player-page">
                    <h1 className="caption">我的私人音乐坊 &gt;</h1>
                    <div className="mt20 row">
                        <div className="controll-wrapper">
                            <h2 className="music-title">歌曲名称</h2>
                            <h3 className="music-artist mt10">歌手</h3>
                            <div className="row mt20">
                                <div className="left-time -col-auto">-2:00</div>
                                <div className="volume-container">
                                    <i className="icon-volume rt" style={{ top: 5 }}></i>
                                    <div className="volume-wrapper">
                                        <Progress progressNum={this.state.progress} onProgressChange={this.changeVolumeHandler} barColor="#aaa">

                                        </Progress>
                                    </div>
                                </div>
                            </div>
                            <div style={{ height: 10, lineHeight: '10px' }}>
                                <Progress progressNum={this.state.progress} onProgressChange={this.progressChangeHandler} barColor="#ff0000">
                                </Progress>
                            </div>
                            <div className="mt35 row">
                                <div>
                                    <i className="icon prev"></i>
                                    <i onClick={this.play}></i>
                                    <i className="icon next ml20"></i>
                                </div>
                                <div className="-col-auto">
                                    <i className="icon repeat-cycle"></i>
                                </div>
                            </div>
                        </div>
                        <div className="-col-auto cover">
                            <img src="33333" alt="44444" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player;