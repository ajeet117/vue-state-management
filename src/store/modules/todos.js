import axios from "axios"

const state={
    todos:[]
}

const getters={
    getTodos: (state) => (state.todos)

}

const actions={
    async fetchTodos({commit})
    {
       const response= await axios.get("https://jsonplaceholder.typicode.com/todos");
       commit('setTodos',response.data);
    },
    async deleteTodos({commit},id)
    {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit('removeTodo',id);
    },
    async updateTodos({commit},todo)
    {
        const response=await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,todo);
        commit("updateTodo",response.data);
    },
    async addTodo({commit},todo)
    {
        const response=await axios.post("https://jsonplaceholder.typicode.com/todos",todo);
        commit('addTodos',response.data);
    },
    async filterTodos({commit},e)
    {
        const limit=parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const response=await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        commit('setTodos',response.data)
    }

}

const mutations={
    setTodos:(state,todos) => (state.todos = todos),
    removeTodo:(state,id) => (state.todos=state.todos.filter(todo => todo.id !== id)),
    updateTodo:(state,uptodo) => {
        const index=state.todos.findIndex(todo => todo.id === uptodo.id);
        state.todos.splice(index,1,uptodo);
    },
    addTodos:(state,todo) => (state.todos.unshift(todo))
}

export default {
    state,
    getters,
    actions,
    mutations
  };