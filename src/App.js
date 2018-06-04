import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './scss/base.scss';
import GoogleTranslator from './js/components/google-translator';
import TranslationsList from './js/components/list-view';

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Know your words</h1>
                </header>
                <div className="content">
                    <button className="btn--default"
                            style={{position: 'absolute', top: 10, right: 10}}
                            onClick={function () {window.location.href = "/logout/"}}>Logout</button>
                    <GoogleTranslator />
                    <TranslationsList />
                </div>
            </div>
        );
    }
}

export default App;
