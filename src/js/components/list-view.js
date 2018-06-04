const React = require('react');
const axios = require('axios');
const Translation = require('./translation');
const EditTranslationDialog = require('./edit-translation-dialog');


class TranslationsList extends React.Component {
    state = {
        translations: [],
        loading: true,
        errors: {},
        hideWords: false,
        hideTrans: false,
        editTranslationDialog: false,
        editDialogData: {},
        latestFirst: true
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
        this.sortByLastModified = this.sortByLastModified.bind(this);
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
        this.setState((state) => {
            return { translations: state.translations.map(t => t.id === updated.id ? updated : t) }
        });
    }

    sortByLastModified () {
        this.setState((state) => {
            return state.latestFirst
                ? {
                    translations: state.translations.sort((a, b) => {
                            return new Date(a.last_modified) - new Date(b.last_modified);
                        }),
                    latestFirst: false
                }
                : {
                    translations: state.translations.sort((a, b) => {
                            return new Date(b.last_modified) - new Date(a.last_modified);
                        }),
                    latestFirst: true
                };
        })
    }

    render () {
        const {translations, editTranslationDialog, editDialogData, latestFirst} = this.state;

        const transList = translations
        // key={t.id} not working, although it's unique.
            .map(t => <Translation key={t.id}
                                   hideWords={this.state.hideWords}
                                   hideTrans={this.state.hideTrans}
                                   showWords={!this.state.hideWords && !this.state.hideTrans}
                                   deleteTranslation={this.deleteTranslation}
                                   openEditDialog={this.openEditDialog}
                                   editTranslation={this.editTranslation}
                                   {...t} />);
        return (
            <div className="container">
                <div className="trans-toggler flex-center pad-top-7">
                    <button className="btn--default" onClick={this.hideWords}>Hide words</button>
                    <button className="btn--default" onClick={this.hideTrans}>Hide translations</button>
                    <button className="btn--default" onClick={this.showWords}>Show both</button>
                    <button className="btn--default" onClick={this.sortByLastModified}>{latestFirst ? 'Oldest first' : 'Latest first'}</button>
                </div>
                <div className="row pad-top-7">{transList}</div>
                {editTranslationDialog &&
                <EditTranslationDialog {...editDialogData}
                                       editTranslation={this.editTranslation}
                                       closeEditDialog={this.closeEditDialog} />
                }
            </div>
        )
    }
}

export default TranslationsList;