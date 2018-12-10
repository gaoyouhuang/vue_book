import axios from "axios";
axios.defaults.baseURL ="http://localhost:4000";
axios.defaults.timeout = 2500;
// 拦截器  
// axios.interceptors.response.use(function(rep){
//     return rep.data;
// })
function bannerList(){
    return axios.get("/banner");
}
export let getBannerList = bannerList;

function AllBooks(){
    return axios.get("/allBooks");
}
export let getAllBooks = AllBooks;

function HotBooks(){
    return axios.get("/hotBooks");
}
export let getHotBooks = HotBooks;

function dBook(id){
    return axios.delete(`/book?id=${id}`);
}
export let deleBook = dBook;

export let getDetail = (id)=>{
    return axios.get(`/book?id=${id}`);
}

export let putsavebook = (data)=>{
    return axios.put("/book",data);
}

export let changecollection=(id,iscollection)=>{
    return axios.put("/book/changecollection",{"id":id,"isCollection":iscollection});
}
export let colloectionlist = ()=>{
    return axios.get("book/collectionlist");
}
export let postAddBook=(item)=>{
    return axios.post("book",item);
}