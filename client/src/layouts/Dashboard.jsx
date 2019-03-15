import React, { Component, createRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container, Segment, Grid, Tab, Menu, Button, Image, Divider, Sticky, Icon, Modal, Input, Header, Message, GridColumn } from 'semantic-ui-react';
import { createTodoList, getTodoList } from "../services/Service";
import { isNotNull } from '../helper/Helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar/Sidebar';
import TopMenu from '../components/TopMenu/TopMenu';
import Items from '../components/Items/Items';



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeList:null,
            modal: false,
            dimmer: 'blurring'
        }
    }

    renderActiveList(todoListId) {
        this.setState({ activeList: todoListId })
    }

    


    render() {
        const { modal, dimmer, todoLists, todoListId, activeList ,lists,refreshed} = this.state
        const status = {
            success: false,
            error: false,
        }
        return (
            <Container>
                <ToastContainer autoClose={4000} />
                <Deneme/>
                <TopMenu />
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Sidebar  renderActiveList={this.renderActiveList.bind(this)}/>
                        </Grid.Column>
                    c    <Grid.Column width={12}>
                            <Segment>
                                <Items todoListId={activeList}/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Dashboard;