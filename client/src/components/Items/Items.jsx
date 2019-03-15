import React, { Component } from 'react';
import { Grid, Segment, Container, Table, Form, Radio, Icon, Button, Input, Dropdown, Label, Menu, Modal, Select, Confirm } from 'semantic-ui-react';
import { getTodoListById, createItem, updateItem, deleteItem } from '../../services/Service';
import { toast } from 'react-toastify';
import {
    DateInput,
    DateTimeInput,
} from 'semantic-ui-calendar-react';

const TableHeader = ["Name", "Description", "Deadline", "Creation Date", "Status","Delete"];

const statusOptions = [
    { key: 0, text: 'Uncompleted', value: 0, label: { color: 'dray', empty: true, circular: true }, },
    { key: 1, text: 'Completed', value: 1, label: { color: 'green', empty: true, circular: true }, }
]
class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reload:false,
            item: {
                itemId:null,
                itemName: null,
                itemDescription: null,
                deadline: null,
                status: 0,
                createdDate: null
            },
            items: [],
            dimmer: 'blurring',
            filter: '1',
            modal: false,
            confirmModal:false,
        }
    }

    componentWillMount = () => {
        const todoListId = this.props.todoListId;
        this.setState({ todoListId: todoListId });
    }

    componentWillReceiveProps = (nextProps) => {
        
        const { todoListId} = nextProps;
        getTodoListById(todoListId, (res) => {
            this.setState({ items: res.data.items })
        })
       
    }

    createTodo = () => {
        const { todoListId, item } = this.state;
        item.createdDate = new Date().getTime();
        item.deadline = new Date(item.deadline).getTime();
        createItem(todoListId, item, (res) => {
            if (res.data.status) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
            this.setState({ modal: false })
        })
    }

    deleteTodo = (item) => {
       this.setState({confirmDelete:true,item:{...item}})
    }

    confirmDelete(){
        const {itemId} = this.state.item;
        deleteItem(itemId,(res)=>{
           if(res.data.status){
                toast.success(res.data.message)
           }else{
               toast.error(res.data.message)
           }
           this.setState({confirmDelete:false});
        })
    }

    updateTodo = () => {
        const { item } = this.state;

        updateItem(item, (res) => {
        })
    }

    closeModal = () => {
        this.setState({ modal: false, confirmDelete:false })
    }

    showModal = () => {
        this.setState({ modal: true })
    }

    handleFilter = (e, { value }) => {
        this.setState({ filter: value })
    }

    handleChange = (e, { name, value }) => {
        const { item } = this.state;
        item[name] = value;
        this.setState((item));
    }




    render() {
        const { items, modal, dimmer, item, reload, confirmDelete } = this.state;
        const showTable = (items) && (items.length > 0) && true || false;
        return (
            <Container reload={reload}>
                {showTable &&
                    <Grid verticalAlign columns='equal'>

                        <Grid.Row>
                            <Grid.Column width="4">
                                <Button onClick={this.showModal} >
                                    <Icon name='plus' />
                                    New
                            </Button>
                            </Grid.Column>
                            <Grid.Column width="6">
                            </Grid.Column>

                            <Grid.Column width="6">
                                <Input fluid focus placeholder='Search...' />
                            </Grid.Column >
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>

                                <Table celled selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            {TableHeader.map(item => {
                                                return <Table.HeaderCell>{item}</Table.HeaderCell>
                                            })}
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {items.map(item => {
                                            let {itemId,itemName,itemDescription,status,deadline,createdDate} = item;
                                            let color = "";
                                            let today = new Date().getTime();
                                            let  isExpired = (deadline - today) <= 0 ? true : false;
                                            if(status === 'COMPLETED'){
                                                color = "green"
                                            }
                                            return (
                                                <Table.Row >
                                                    <Table.Cell hidden>{itemId}</Table.Cell>
                                                    <Table.Cell>{itemName}</Table.Cell>
                                                    <Table.Cell>{itemDescription}</Table.Cell>
                                                    <Table.Cell>{isExpired ? <Label color='red'>Expired</Label> : deadline}</Table.Cell>
                                                    <Table.Cell>{new Date(createdDate).toDateString()}</Table.Cell>
                                                    <Table.Cell>
                                                        <Label color={color} key={item.status}>{item.status}
                                                        </Label>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Button icon="trash alternate outline red" inverted onClick={this.deleteTodo.bind(this,item)}/>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        })}
                                    </Table.Body>

                                    <Table.Footer>
                                        <Table.Row>
                                            <Table.HeaderCell colSpan='6'>
                                                <Menu floated='right' pagination>
                                                    <Menu.Item as='a' icon>
                                                        <Icon name='chevron left' />
                                                    </Menu.Item>
                                                    <Menu.Item as='a'>1</Menu.Item>
                                                    <Menu.Item as='a'>2</Menu.Item>
                                                    <Menu.Item as='a'>3</Menu.Item>
                                                    <Menu.Item as='a'>4</Menu.Item>
                                                    <Menu.Item as='a' icon>
                                                        <Icon name='chevron right' />
                                                    </Menu.Item>
                                                </Menu>
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Footer>
                                </Table>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                    || null
                }
                <Modal size="tiny" open={modal} onClose={this.closeModal} dimmer={dimmer}>
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Name' placeholder='Name' onChange={this.handleChange} name="itemName" required />
                            </Form.Group>
                            <Form.TextArea label='Description' placeholder='Type detail...' onChange={this.handleChange} name="itemDescription" required />
                            <Form.Group inline>
                                <Form.Field required>
                                    <Select
                                        placeholder='Status'
                                        onChange={this.handleChange}
                                        control={Select}
                                        options={statusOptions}
                                        value={item.status}
                                        name="status"
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <DateTimeInput
                                        name="dateTime"
                                        placeholder="Date Time"
                                        value={item.deadline}
                                        iconPosition="left"
                                        onChange={this.handleChange}
                                        name="deadline"
                                    />
                                </Form.Field>
                                <Form.Field>

                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive icon='plus' content='Create' onClick={this.createTodo} />
                    </Modal.Actions>
                </Modal>
                <Confirm open={confirmDelete} dimmer={dimmer} onCancel={this.closeModal} onConfirm={this.confirmDelete.bind(this)} />
            </Container>);
    }

}

export default Items;