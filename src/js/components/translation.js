const React = require('react');
const api = require('../api');


class Translation extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            viewNotes: false
        };

        this.toggleStateParam = this.toggleStateParam.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data });
    }

    toggleStateParam (param) {
        this.setState({ [`${param}`]: !this.state[param]});
    }

    delete (e) {
        e.stopPropagation();
        this.props.deleteTranslation(this.props.id);
        api.deleteTranslation(this.props.id);
    }

    edit (e) {
        e.stopPropagation();
        this.props.openEditDialog(Object.assign({}, this.props));
    }

    render () {
        const { viewNotes } = this.state;

        return (
            <div className="col-12">
                <div className="row list-item" onClick={() => this.toggleStateParam('viewNotes')}>
                    <div className="col-5">{!this.props.hideWords && this.props.input}</div>
                    <div className="col-5">{!this.props.hideTrans && this.props.output}</div>
                    <div className="col-1">
                        <span className="glyphicon glyphicon-edit"
                              onClick={e => this.edit(e)}></span>
                    </div>
                    <div className="col-1">
                        <span className="glyphicon glyphicon-trash"
                              onClick={e => this.delete(e)}></span>
                    </div>

                </div>
                {viewNotes &&
                <div className="pad-top-7">
                     <textarea disabled rows="5"
                               className="notes pad-top-7 col-12"
                               placeholder="You did not add any notes. Edit?"
                               value={this.props.notes}
                               onBlur={this.changeNotes}>
                     </textarea>
                </div>}
            </div>
        )
    }
}

module.exports = Translation;