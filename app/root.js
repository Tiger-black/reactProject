import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import { MUSIC_LIST } from './config/musiclist';
import Pubsub from 'pubsub-js';
import musicList from './page/musiclist';

let musiclist = require('./config/musiclist');


class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentMusicItem: musiclist.MUSIC_LIST[0], 
            musicList: MUSIC_LIST, 
            playState: false ,
            repeatType: 'cycle'
        };
    }

    playMusic(musiclisItem){
        $("#player").jPlayer('setMedia',{
            mp3: musiclisItem.file
        }).jPlayer('play');

        this.setState({
            currentMusicItem: musiclisItem,
        });
    }
    //播放下一曲
    playNextPrev(type = 'next') {
        let musicCurrentIndex = this.findCurrentPlayMusicIndex(this.state.currentMusicItem);
        let newIndex = 0;
        let length = this.state.musicList.length;

        if (type === 'next') {
            newIndex = (musicCurrentIndex + 1) % length;
        }
        else {
            newIndex = (musicCurrentIndex - 1 + length) % length;
        }
        this.playMusic(this.state.musicList[newIndex], 'play');
    }

    //获取当前播放音乐的index
    findCurrentPlayMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem);
    }
    playWhenEnd(stick) {
        if (this.state.repeatType === 'random') {
            let index = this.findCurrentPlayMusicIndex(this.state.currentMusicItem);
            let randomIndex = this.randomRange(0, this.state.musicList.length - 1);

            while (index === randomIndex) {
                randomIndex = this.randomRange(0, this.state.musicList.length - 1);
            }

            this.playMusic(this.state.musicList[randomIndex*1]);
        } else if (this.state.repeatType === 'once') {
            this.playMusic(this.state.currentMusicItem);
        } else {
            this.playNextPrev(stick);
        }
    }
    randomRange(min,max){
        return Math.floor(Math.random() * (max - min) + min);
    }
    findMusicIndex(musicItem) {
        return this.state.musiclist.indexOf(musicItem);
    }
    //-- 生命周期 组件渲染完成 
    componentDidMount() {
        $("#player").jPlayer({
            supplied: 'mp3',
            vmode: 'window'
        });
        this.playMusic(this.state.currentMusicItem);

        //监听当前播放音乐是否结束 -> 自动播放下一曲
        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playWhenEnd();
        })

        Pubsub.subscribe('PLAY_MUSIC', (msg, musiclisItem) => {
            this.playMusic(musiclisItem);
        })
        Pubsub.subscribe('DELETE_MUSIC', (msg, musiclisItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item =>{
                    return item !== musiclisItem
                })
            })
            if (this.state.musicList.length === 0) {

                $("#player").jPlayer('pause');

                $("#root").html('没有音乐啦~');

            } else if (this.state.currentMusicItem === musiclisItem) {

                this.playNextPrev('next');

            }

        })


        Pubsub.subscribe('PREV', (msg, musiclisItem) => {
            this.playWhenEnd('prev');
        })

        Pubsub.subscribe('NEXT', (msg, musiclisItem) => {
            this.playWhenEnd('next');
        })
        let repeatList = [
            'cycle',
            'once',
            'random'
        ];
        Pubsub.subscribe('CHANAGE_REPEAT', (msg) => {
            let index = repeatList.indexOf(this.state.repeatType);
            index = (index + 1) % repeatList.length;
            this.setState({
                repeatType: repeatList[index]
            });
        })
    }

    componentWillUnmount() {
        //事件的注销
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PREV');
        Pubsub.unsubscribe('NEXT');
        $('#player').unbind($.jPlayer.event.ended);

    }
    render() {

        let This = this;

        const MusicLists = () => (
            <MusicList currentMusicItem={This.state.currentMusicItem} musicList={this.state.musicList} />
        );

        const Players = () => (
            <Player currentMusicItem={This.state.currentMusicItem} repeatType={This.state.repeatType} isPlay={This.state.playState} />
        );

        return (
            <Router >
                <section>
                    <Header />
                    <Route exact path="/" component={Players} />
                    <Route path="/list" component={MusicLists} />
                </section>
            </Router>
        );
    }
}



export default Root;