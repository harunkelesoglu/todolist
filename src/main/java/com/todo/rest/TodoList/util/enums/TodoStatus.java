package com.todo.rest.TodoList.util.enums;

public enum TodoStatus {
        COMPLETED(1),
        UNCOMPLETED(2),
        EXPIRED(2);

        private int status;

        TodoStatus(int status) {
            this.status = status;
        }

        public int getStatus(){
            return status;
        }

}
