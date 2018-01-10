//播放页面
import React from 'react'
import Progress from '../components/progress'
import './player.less'


let duration = null;
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            progress: 0,
            volume: 0,
            isPlay: false 
        };
        this.play = this.play.bind(this);
        this.progressChangeHandler = this.progressChangeHandler.bind(this);
        this.volumeChangeHandler = this.volumeChangeHandler.bind(this);
    }  
    componentDidMount(){
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume*100,
            })
        });
    }
    componentWillUnmount() {
        $("#player").unbind($.jPlayer.event.timeupdate);
    }
    progressChangeHandler(res) {//更新进度
        // $("#player").jPlayer('play', duration * res);
        // this.setState({
        //     isPlay: true
        // });
        $('#player').jPlayer(this.state.isPlay ? 'play' : 'pause', duration * res);
    }
    volumeChangeHandler(res) {//更新音量
        this.setState({
            volume: res * 100,
        })
        $("#player").jPlayer('volume', res);
    }
    play(){
        if (this.state.isPlay) {
            $("#player").jPlayer('pause');
        } else {
            $("#player").jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    }
    render() {
        return (
            <div className="player-page">
                <div className="player-page">
                    <h1 className="caption">我的私人音乐坊 &gt;</h1>
                    <div className="mt20 row">
                        <div className="controll-wrapper">
                            <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                            <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                            <div className="row mt20">
                                <div className="left-time -col-auto">-2:00</div>
                                <div className="volume-container">
                                    <i className="icon-volume rt" style={{ top: 5 }}></i>
                                    <div className="volume-wrapper">
                                        <Progress progressNum={this.state.volume} onProgressChange={this.volumeChangeHandler} barcolor="#aaa">

                                        </Progress>
                                    </div>
                                </div>
                            </div>
                            <div style={{ height: 10, lineHeight: '10px' }}>
                                <Progress progressNum={this.state.progress} onProgressChange={this.progressChangeHandler} barcolor="#ff00ff">
                                </Progress>
                            </div>
                            <div className="mt35 row">
                                <div>
                                    <i className="icon prev"></i>
                                    <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
                                    <i className="icon next ml20"></i>
                                </div>
                                <div className="-col-auto">
                                    <i className="icon repeat-cycle"></i>
                                </div>
                            </div>
                        </div>
                        <div className="-col-auto cover">
                            <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player;