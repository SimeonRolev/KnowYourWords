const React = require('react');
const api = require('../api');


class EditTranslationDialog extends React.Component {
    constructor(props){
        super(props);

        this.input = this.props.input;
        this.output = this.props.output;
        this.notes = this.props.notes;

        this.handleInput = this.handleInput.bind(this);
        this.handleOutput = this.handleOutput.bind(this);
        this.handleNotes = this.handleNotes.bind(this);
        this.submit = this.submit.bind(this);
        this.close = this.close.bind(this);
    }

    handleInput (e) {
        const val = e.target.value;
        this.input = val;
    }

    handleOutput (e) {
        const val = e.target.value;
        this.output = val;
    }

    handleNotes (e) {
        const val = e.target.value;
        this.notes = val;
    }

    submit (e) {
        e.stopPropagation();
        let updated = Object.assign({}, this.props);
        updated.input = this.input;
        updated.output = this.output;
        updated.notes = this.notes;

        if (updated.input && updated.output) {
            api.updateTranslation(updated.id, {
                ...updated
            })
                .then(() => {
                    this.props.closeEditDialog();
                    this.props.editTranslation(updated);
                })
                .catch(err => console.log(err));
        } else {
            alert ("Input and output fields may not be blank")
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
                    <input className="input--default" defaultValue={this.props.input} onChange={this.handleInput} />
                    <input className="input--default" defaultValue={this.props.output} onChange={this.handleOutput} />
                    <input className="input--default" defaultValue={this.props.notes} onChange={this.handleNotes} />
                    <button className="btn--default" onClick={this.submit}>Submit</button>
                    <button className="btn--default" onClick={this.close}>Cancel</button>
                </div>
            </div>
        )
    }
}

module.exports = EditTranslationDialog;