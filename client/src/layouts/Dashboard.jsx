import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container, Segment, Grid, Tab, Menu, Button, Image, Divider, Sticky, Icon, Modal, Header, Input } from 'semantic-ui-react';



class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Container>
                <Segment>
                    <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                            <p>
                                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                            </p>
                            <p>
                                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                            </p>
                            <p>
                                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <p>
                                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                            </p>
                            <p>
                                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                            </p>
                            <p>
                                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                            </p>
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>And</Divider>
                    <Sticky>
                        <Button icon>
                            <Icon name='icon plus' />
                            New Todo
                        </Button>
                    </Sticky>
                </Segment>
            </Container>);
    }

}



const panes = [
    { menuItem: 'Tab 1 adfa dsf asdf asdf', render: () => <Tab.Pane> <Items /> </Tab.Pane> },
    { menuItem: 'Tab 2 adsf asdfa sdfa sdf', render: () => <Tab.Pane> <Items /> </Tab.Pane> },
    { menuItem: 'Tab 3 adsfas dfasdf asdfa f', render: () => <Tab.Pane> <Items /> </Tab.Pane> },
]

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            dimmer: null,
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    show = dimmer => () => this.setState({ dimmer, open: true })
    add = () => this.setState({ open: false })

    render() {
        const { open, dimmer } = this.state
        return (
            <div>
                <Container>
                    <Grid columns={1}>
                        <Grid.Row className="wrapper">
                            <Grid.Column>
                                <Menu stackable>
                                    <Menu.Item className="brand">
                                        <Button inverted color='green' className="new-todo-btn" onClick={this.show('blurring')}>
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
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Tab menu={{ fluid: true, vertical: true }} menuPosition='left' panes={panes} />
                </Container>
                <Modal
                    open={open}
                    onClose={this.add}
                    basic
                    size='small'
                >
                    <Header icon='browser' content='Name' />
                    <Modal.Content>
                        <Input  fluid error placeholder='Type...' />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.add} inverted>
                            <Icon name='checkmark' /> Create
                    </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default Dashboard;