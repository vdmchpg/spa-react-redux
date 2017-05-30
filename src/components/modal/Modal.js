import React, {PureComponent} from 'react';
import {Modal, Button} from 'react-bootstrap'

export class TodoModal extends PureComponent {

    submit =() => {
        this.textInput ? this.props.modal.successCb(this.textInput.value) : this.props.modal.successCb();
    };

    render() {
        const {modal :{ title, open, text, type }, onCloseModal} = this.props;

        const modalBodyType= {
            enter: <div className="input-group">
                {text}
                <input ref={input => this.textInput = input}
                       type="text"
                       className="form-control"
                       placeholder='Enter Category'/>
                </div>,
            confirm: text
        };

        return (
            <div>
                <Modal show={open} onHide={onCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalBodyType[type]}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.submit}>OK</Button>
                        <Button bsStyle="danger" onClick={onCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

