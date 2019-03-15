
import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { getTodoList } from '../../services/Service';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeList:null,
            lists: []
        }
    }
    componentDidMount = () => {
        //condition konulacak response okmi data varmı
        getTodoList((res) => {
            const active = res.data[0]
            this.setState({activeList:active.todoListId})
            this.props.renderActiveList(active.todoListId);
            getTodoList((res) => {
                this.setState({lists:res.data});
            })
        })
    }

    handleListClick = (e, { activeIndex }) => {
        this.setState({ activeList: activeIndex })
        this.props.renderActiveList(activeIndex);
    }

    render() {
        const { lists, activeList} = this.state;
        return (
            <Menu pointing vertical>
                {(lists.length) > 0 &&
                    lists.map((item, index) => {
                        return (
                                <Menu.Item activeIndex={item.todoListId} name={item.name} active={activeList === item.todoListId} onClick={this.handleListClick}/>
                          
                            );
                    })
                    }
            </Menu>
        )
    }
}

export default Sidebar;