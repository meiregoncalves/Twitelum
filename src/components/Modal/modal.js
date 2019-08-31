import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Widget from '../Widget';

import './modal.css'

class Modal extends Component {
    static propTypes = {
        onclose: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        children: PropTypes.node,
    }

    static defaultProps = {
        children: ''
    }

    handleCloseModal = (event) => {
        const { onclose } = this.props;
        const clicouNoConteudo = event.target.closest('.modal__conteudo');

        if (!clicouNoConteudo) {
            onclose();
        }
    }

    render() {
        const { isOpen, children} = this.props;

        return (
            <div 
                className={`modal ${ isOpen ? `modal--active` : ''}`}
                onClick={this.handleCloseModal}
            >
                <div className="modal__conteudo">
                    <Widget>
                        { isOpen && children }
                    </Widget>
                </div>  
            </div>
        );
    }
}

export default Modal;