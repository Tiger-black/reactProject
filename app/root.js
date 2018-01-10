import React from 'react'
import Header from './components/header'
import Progress from './components/progress'
import Player from './page/player';
import MusicList from './page/musicList';
import { MUSIC_LIST } from './config/musiclist'

let duration = null;
class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            musiclist: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]
        };
    }   
    componentDidMount(){
        $("#player").jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    // mp3: 'http://tingwa.oss-cn-shanghai.aliyuncs.com/2017-01/05/20170105123005-MzkzMTcz.mp3?OSSAccessKeyId=3b1nzo7roav1h50rcp0a35nw&Expires=1511506386&Signature=WmcqXQ2v4wIMjuK1pOlvCwScLZ4%3D'
                    mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
                }).jPlayer('stop');
            },
            supplied: 'mp3',
            vmode: 'window'
        });
    }
    componentWillUnmount() {
        
    }
    render(){
        return (
            <div>
                <Header />
                <MusicList 
                    currentMusicItem = {this.state.currentMusicItem} 
                    musicList={this.state.musiclist} 
                />
            </div>
        )
    }
};
{/* <div>
    <Header />
    <Player currentMusicItem={this.state.currentMusicItem} />
</div> */}
export default Root;