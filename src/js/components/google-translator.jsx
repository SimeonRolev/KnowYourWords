const React = require('react');
const axios = require('axios');
const Cookies = require('js-cookie');

class GoogleTranslator extends React.Component {
    languages = {
        "bg": "Bulgarian",
        "en": "English",
        "it": "Italian"
    }

    state = {
        showResults: false,
        result: '',
        inputLang: "en",
        outputLang: "bg",
        notes: ''
    };

    translate = () => {
        const self = this;

        axios.post('https://server-googletranslate.wedeploy.io/translate', {
            "text": this.translateString.value,
            "from": this.state.inputLang,
            "to": this.state.outputLang
        })
            .then(function (response) {
                console.log(response);
                self.setState({showResults: true, result: response.data.text});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    closeResults = () => {
        this.setState({showResults: false});
    };

    saveWord = () => {
        axios.post('/api/translations/', {
            "input": this.translateString.value,
            "output": this.state.result,
            "notes": this.state.notes,
            "input_lang": this.state.inputLang,
            "output_lang": this.state.outputLang
        }, {
            headers: {"X-CSRFToken": Cookies.get('csrftoken')}
        }).then(res => {
            window.location.reload();
        })
    };

    changeInputLang = event => {
        this.setState({ inputLang: event.target.value })
    }

    changeOutputLang = event => {
        this.setState({ outputLang: event.target.value })
    }

    changeNotes = event => {
        this.setState({ notes: event.target.value })
    }

    render() {
        const {showResults, result} = this.state;
        const langOptions = Object.keys(this.languages)
            .map(key => <option key={key} value={key}>{this.languages[key]}</option>)

        return (
            <div className="google-translator container">
                <div className="google-input row">
                    <div className="pad-top-7 col-12 col-lg-6">
                        <label className="flex-center">
                            Google translate:
                            <input className="input--default"
                                   type="text"
                                   placeholder="Type word or sentence"
                                   ref={node => this.translateString = node}/>
                        </label>
                    </div>
                    <div className="pad-top-7 flex-center col-12 col-lg-6">
                        <div>
                            <label htmlFor="input_lang">From: </label>
                            <select className="select--lang"
                                    name="input_lang"
                                    value={this.state.inputLang}
                                    onChange={this.changeInputLang}>
                                {langOptions}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="output_lang">To: </label>
                            <select className="select--lang"
                                    name="output_lang"
                                    value={this.state.outputLang}
                                    onChange={this.changeOutputLang}>
                                {langOptions}
                            </select>
                        </div>

                        <button id="btn-google-trans"
                                className="btn--default"
                                onClick={this.translate.bind(this)}>
                            Google Translate
                        </button>
                    </div>
                </div>
                {showResults && (
                    <div>
                        <div className="results-wrap row">
                            <div className="col-xs-12 col-lg-6">
                                <textarea disabled value={'Result: ' + result} className="notes col-12" rows="5" />
                            </div>
                            <div className="col-xs-12 col-lg-6">
                                <textarea rows="5" className="notes col-12" placeholder="Add some notes?" onBlur={this.changeNotes} />
                            </div>
                        </div>
                        <button className="btn--default" onClick={this.saveWord}>Save this translation</button>
                    </div>
                )}
            </div>
        )
    }
}

export default GoogleTranslator;

// translate('I spea Dutch!', {from: 'en', to: 'nl'}).then(res => {
//     console.log(res.text);
//     //=> Ik spreek Nederlands!
//     console.log(res.from.text.autoCorrected);
//     //=> true
//     console.log(res.from.text.value);
//     //=> I [speak] Dutch!
//     console.log(res.from.text.didYouMean);
//     //=> false
// }).catch(err => {
//     console.error(err);
// });