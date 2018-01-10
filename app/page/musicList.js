import React from 'react'
import MusicListItem from '../components/musiclistitem'

class MusicList extends React.Component {
    render() {
        let listEle = null;
        listEle = this.props.musicList.map((item) => {//map 会使用心得数组 不会影响原有数据 map没有副作用
            return (
                <MusicListItem focus={item === this.props.currentMusicItem} key={item.id} musicItem={item}>
                    {item.title}
                </MusicListItem>
            )
        });
        return (
            <ul>{listEle}</ul>
        )
    }
};

export default MusicList;