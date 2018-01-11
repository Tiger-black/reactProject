import React from 'react'
import Pubsub from 'pubsub-js';

import './musiclistitem.less';
class MusicListItem extends React.Component {
    playMusic(musicItem) {
        Pubsub.publish('PLAY_MUSIC', musicItem);
    }
    deleteMusic(musicItem,e) {
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC', musicItem);
    }
    render() {
        let musicItem = this.props.musicItem;
        
        return (
            <li onClick={this.playMusic.bind(this, musicItem)} className={`components-listitem row ${this.props.focus ? 'focus':''}`}>
                <p><strong>{musicItem.title}</strong>-{musicItem.artist}</p>
                <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
            </li>
        )
    }
};
// 想了半天onClick = { this.playMusic.bind(this, musicItem) }为啥要在代码行里用bind，而不能在constructor里面绑定？？
// 因为这里的musicItem是动态生成的，每次musicItem的值都不一样，所以需要动态绑定，一次绑定是识别不到参数的。
export default MusicListItem;