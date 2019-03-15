import React, { Component ,Fragment} from 'react';
import { Menu, Button, Image ,Modal, Input,Icon} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { createTodoList } from '..//../services/Service'
class TopMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            newList: {
                name: null,
            },
        }
    }


    //show modal box with blur option
    showModal = () => {
        this.setState({ modal: true });
    }

    closeModal = () => {
        this.setState({modal:false});
    }

    //Create Todo List
    create = () => {
        const { newList } = this.state;
        createTodoList(newList, (res) => {
            if (res.data.status) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message);
            }
            this.setState({ modal: false })
            this.props.renderMenu()
        });
    }

    handleChange = (e,{name,value}) => {
        let { newList } = this.state;
        newList[name]= value; 
        this.setState({ newList });
    }


    render() {
        const { modal } = this.state;
        return (
            <Fragment>
            <Menu stackable>
                <Menu.Item className="brand">
                    <Button inverted color='green' className="new-todo-btn" onClick={this.showModal}>
                        New Todo List
                    </Button>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Image avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/vickyshits/128.jpg" />
                        Harun Keleşoğlu
                </Menu.Item>
                    <Menu.Item>
                        <Button default>Log out</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Modal
                open={modal}
                onClose={this.closeModal}
                dimmer="blurring"
                basic
                size='small'
            >
                <Modal.Content>
                    <Input fluid error placeholder='Type...' onChange={this.handleChange} name="name"/>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.create} inverted>
                        <Icon name='checkmark' /> Create
                         </Button>
                </Modal.Actions>
            </Modal>
            </Fragment>
        )
    }
}

export default TopMenu;