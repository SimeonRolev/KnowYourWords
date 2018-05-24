const React = require('react');
const axios = require('axios');
const api = require('../api');

class Translation extends React.Component {
    state = {
        viewNotes: false
    };

    constructor (data) {
        super(data);
        const params = data.data;
        this.id = params.id;
        this.input = params.input;
        this.output = params.output;
        this.notes = params.notes;
        this.user = params.user;

        this.toggleStateParam = this.toggleStateParam.bind(this);
    }

    toggleStateParam (param) {
        this.setState({ [`${param}`]: !this.state[param]});
    }

    delete (e, id) {
        e.stopPropagation();
        this.props.deleteTranslation(id);
        // api.deleteTranslation(id);
        alert('Activete the api call to really delete the record')
    }

    edit (e) {
        e.stopPropagation();
        this.props.openEditDialog(this);
    }

    render () {
        const { viewNotes } = this.state;

        return (
            <div className="col-12">
                <div className="row list-item" onClick={() => this.toggleStateParam('viewNotes')}>
                    <div className="col-5">{!this.props.hideWords && this.input}</div>
                    <div className="col-5">{!this.props.hideTrans &&this.output}</div>
                    <div className="col-1">
                        <span className="glyphicon glyphicon-edit"
                              onClick={e => this.edit(e, this)}></span>
                    </div>
                    <div className="col-1">
                        <span className="glyphicon glyphicon-trash"
                              onClick={e => this.delete(e, this.id)}></span>
                    </div>

                </div>
                {viewNotes &&
                <div className="pad-top-7">
                     <textarea rows="5"
                               className="notes pad-top-7 col-12"
                               placeholder="Add some notes?"
                               value={this.notes}
                               onBlur={this.changeNotes}>
                     </textarea>
                </div>}
            </div>
        )
    }
}

class EditTranslationDialog extends React.Component {
    constructor(props){
        super(props);

        this.input = props.data.input;
        this.output = props.data.output;
        this.notes = props.data.notes;

        this.handleInput = this.handleInput.bind(this);
        this.handleOutput = this.handleOutput.bind(this);
        this.handleNotes = this.handleNotes.bind(this);
        this.submit = this.submit.bind(this);
        this.close = this.close.bind(this);
    }

    handleInput (e) {
        const val = e.target.value;
        // val && this.setState({ input: val });
        // console.log(val);
        this.input = val;
    }

    handleOutput (e) {
        const val = e.target.value;
        this.output = val;
        // val && this.setState({ output: val });
    }

    handleNotes (e) {
        const val = e.target.value;
        this.notes = val;
    }

    submit (e) {
        e.stopPropagation();
        let updated = this.props.data.props.data;
        updated.input = this.input;
        updated.output = this.output;
        updated.notes = this.notes;


        if (!!(updated.input && updated.output)) {
            api.updateTranslation(updated.id, {
                ...updated
            })
                .then(() => {
                    this.props.closeEditDialog();
                    this.props.editTranslation(updated);
                });
        } else {
            alert ("Input and output fileds may not be blank")
        }
    }

    close (e) {
        e.stopPropagation();
        this.props.closeEditDialog();
    }

    render () {
        return (
            <div className="dialog--layover">
                <div className="dialog" id="edit-dialog">
                    <input className="input--default" defaultValue={this.props.data.input} onChange={this.handleInput} />
                    <input className="input--default" defaultValue={this.props.data.output} onChange={this.handleOutput} />
                    <input className="input--default" defaultValue={this.props.data.notes} onChange={this.handleNotes} />
                    <button className="btn--default" onClick={this.submit}>Submit</button>
                    <button className="btn--default" onClick={this.close}>Cancel</button>
                </div>
            </div>
        )
    }
}

class TranslationsList extends React.Component {
    state = {
        translations: [],
        loading: true,
        errors: {},
        hideWords: false,
        hideTrans: false,
        editTranslationDialog: false,
        editDialogData: {}
    }

    constructor () {
        super();

        this.toggleStateParam = this.toggleStateParam.bind(this);
        this.hideWords = this.hideWords.bind(this);
        this.hideTrans = this.hideTrans.bind(this);
        this.showWords = this.showWords.bind(this);
        this.deleteTranslation = this.deleteTranslation.bind(this);
        this.openEditDialog = this.openEditDialog.bind(this);
        this.closeEditDialog = this.closeEditDialog.bind(this);
        this.editTranslation = this.editTranslation.bind(this);
    }

    componentDidMount () {
        axios.get('/api/translations/')
            .then(res => this.setState({ translations: res.data }))
            .catch(error => this.setState({ error: error.data }))
    }

    toggleStateParam (param) {
        this.setState({ [`${param}`]: !this.state[param] });
    }

    hideWords () {
        this.setState({
            hideWords: true,
            hideTrans: false
        });
    }

    hideTrans () {
        this.setState({
            hideWords: false,
            hideTrans: true
        });
    }

    showWords () {
        this.setState({
            hideWords: false,
            hideTrans: false
        });
    }

    deleteTranslation (id) {
        this.setState({
            translations: this.state.translations.filter(t => t.id !== id)
        });
    }

    openEditDialog (data) {
        this.setState({
            editTranslationDialog: true,
            editDialogData: data
        });
    }

    closeEditDialog () {
        this.setState({
            editTranslationDialog: false
        });
    }

    editTranslation (updated) {
        this.setState({
            translations: this.state.translations.map(t => t.id === updated.id ? updated : t)
        });
    }

    render () {
        const transList = this.state.translations
        // key={t.id} not working, although it's unique.
            .map(t => <Translation key={JSON.stringify(t)}
                                   hideWords={this.state.hideWords}
                                   hideTrans={this.state.hideTrans}
                                   showWords={!this.state.hideWords && !this.state.hideTrans}
                                   deleteTranslation={this.deleteTranslation}
                                   openEditDialog={this.openEditDialog}
                                   editTranslation={this.editTranslation}
                                   data={t} />);
        return (
            <div className="container">
                <div className="trans-toggler flex-center pad-top-7">
                    <button className="btn--default" onClick={this.hideWords}>Hide words</button>
                    <button className="btn--default" onClick={this.hideTrans}>Hide translations</button>
                    <button className="btn--default" onClick={this.showWords}>Show both</button>
                </div>
                <div className="row pad-top-7">{transList}</div>
                {this.state.editTranslationDialog &&
                <EditTranslationDialog data={this.state.editDialogData}
                                       editTranslation={this.editTranslation}
                                       closeEditDialog={this.closeEditDialog} />
                }
            </div>
        )
    }
}

export default TranslationsList;