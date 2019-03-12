import axios from 'axios';
const env = process.env.NODE_ENV;
let BASE_URL;

switch(BASE_URL){
    case 'production':
        BASE_URL = "http://todolistapp";
        break;
    case 'test':
        BASE_URL = "http://todolist-test";
        break;
    case 'local':
        BASE_URL = "http://localhost:8080";
        break;
    default:
        BASE_URL = "http://localhost:8080";
    break;
}

/********** USER SERVICE *************/
const register = (data, cb) => {
    axios.post(BASE_URL + '/register',data).then(cb).catch(e => console.log(e));
}

const getUser = (userId, cb) => {
    axios.get(BASE_URL + '/getUser?userId=' + userId).then(cb).catch(e => console.log(e));
}

/*******   TO DO LIST SERVICE ********/
const createTodoList = (data,cb) => {
    axios.post(BASE_URL + '/todolist/create',data).then(cb).catch(e => console.log(e));
}

const getTodoList = (id,cb) => {
    axios.get(BASE_URL + '/todolist/' + id).then(cb).catch(e => console.log(e));
}

const deleteTodoList = (id, cb) => {
    axios.delete(BASE_URL + '/todolist/' + id).then(cb).catch(e => console.log(e));
}

/*******   ITEM SERVICE ********/
const createItem = (todoListId,data,cb) => {
    axios.post(BASE_URL + '/item/create?todoListId' +todoListId,data).then(cb).catch( e => console.log(e));
}

const getItem = (todoListId,cb) => {
    axios.get(BASE_URL + '/item/' + todoListId).then(cb).catch(e => console.log(e));
}

const updateItem = (data, cb) => {
    axios.post(BASE_URL + '/item/update',data).then(cb).catch(e => console.log(e));
}

const deleteItem = (itemId,cb) => {
    axios.delete(BASE_URL + '/item/' + itemId).then(cb).catch(e => console.log(e));
}