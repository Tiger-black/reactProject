// var react = require('react');
import React from 'react'; //使用es6的语法来导入 因为有了babel-loader
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';//热更新
import Root from './root'

render(
    <AppContainer>
        <Root />
    </AppContainer>,
    document.getElementById('root')
);
if (module.hot) {
    module.hot.accept('./root', () => {
        const NewRoot = require('./root').default;
        render(
            <AppContainer>
                <NewRoot />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}