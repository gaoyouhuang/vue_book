const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
let bannerlist = require("./bannerList.js");

function read(callback){
    fs.readFile("./booklist.json","utf-8",function(err,data){
        if(err||data.length<=0){
            callback([]);
        }else
            callback(data);
    })
}
function write(data,callback){
    fs.writeFile("./booklist.json",JSON.stringify(data),(err)=>{
        if(err){
            callback({"success":false})
            throw err;
        }
        callback({"success":true});

    })
}
const pagesize = 5;
http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.setHeader("X-Powered-By",' 3.2.1')
    res.setHeader("Content-Type", "application/json;charset=utf-8");

    let obj_url = url.parse(req.url,true);
    let bookid = obj_url.query.id;
    switch(req.method){
        case "OPTIONS":
            res.end();
            return;
        case "GET":
        //获取收藏列表
        if(path.basename(obj_url.pathname)===("collectionlist")){
            read((data)=>{
                data = JSON.parse(data).filter(item=>{if(item.isCollection){return true;}else return false;})
                res.end(JSON.stringify(data));
            });
        }
        //获取轮播图
        if(path.basename(obj_url.pathname).includes("banner")){
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            res.end(JSON.stringify(bannerlist));
        }

        //获取全部图书
        if(path.basename(obj_url.pathname)===("allBooks")){
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            read((data)=>{
                res.end(JSON.stringify(data));
            });
        }

        //获取热门图书
        if(path.basename(obj_url.pathname)===("hotBooks")){
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            read((data)=>{
                let hotlist = JSON.parse(data).slice(0,6);
                res.end(JSON.stringify(hotlist));
            });
        }

        //获取单个图书详情
        if(path.basename(obj_url.pathname)===("book")){
            res.setHeader("Content-Type","application/json;charset=utf-8");
            console.log("book detail",bookid);
            read((data)=>{
                let item = JSON.parse(data).find(item=>item.id==parseInt(bookid));
                res.end(!item?JSON.stringify({}):JSON.stringify(item));
            });            
        }
        //分页加载
        if(path.basename(obj_url.pathname)===("pagelist")){
            res.setHeader("Content-Type","application/json;charset=utf-8");
            read((data)=>{
                let returndata = {};
                let booklist = JSON.parse(data);
                let booknum = booklist.length;
                returndata.maxNum = booknum;

                let starnum = (obj_url.query.page-1)*pagesize;
                let endnum = obj_url.query.page*pagesize;
                if(starnum>=booknum)
                    {
                        returndata.bookList = [];
                        res.end(JSON.stringify(returndata));
                        return;
                    }
                if(starnum<booknum&&endnum>booknum){
                    endnum = booknum;
                }
                returndata.bookList = booklist.slice(starnum,endnum);
                res.end(JSON.stringify(returndata));
            })
        }
            break;
        case "DELETE":
        //删除图书
        if(path.basename(obj_url.pathname)===("book")){
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            read((data)=>{
                let list = JSON.parse(data).filter(item=>item.id!==parseInt(bookid));
                write(list,(data)=>{
                    res.end(JSON.stringify(data));
                })
            });
        }
            break;
        case "POST":
         if(path.basename(obj_url.pathname)===("book")){
            console.log("book");
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            let book = "";
            req.on("data",data=>{
                book +=data;
            });
            req.on("end",()=>{
                read(data=>{
                    data = JSON.parse(data);
                    book = JSON.parse(book);
                    book.id = data.length>0?data[data.length-1].id+1:1;
                    data.push(book);
                    write(data,(returndata)=>{
                        res.end(JSON.stringify(returndata))
                    })
                })

            })
         }
            break;
        case "PUT":
         //修改图书
         if(path.basename(obj_url.pathname)===("book")){
            console.log("book");
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            let book = "";
            req.on("data",data=>{
                book +=data;
            });
            req.on("end",()=>{
                read(data=>{
                    data = JSON.parse(data).map(item=>{
                        let saveitem = JSON.parse(book);
                        if(item.id==parseInt(saveitem.id)){
                            return saveitem;
                        }
                        return item;
                    })
                    console.log(data);
                    write(data,(returndata)=>{
                        res.end(JSON.stringify(returndata))
                    })
                })

            })
        }
        //添加收藏
        if(path.basename(obj_url.pathname)==="changecollection"){
            console.log("changecollection");
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            let book = "";
            req.on("data",data=>{
                book +=data;
            });
            req.on("end",()=>{
                book = JSON.parse(book);
                read(data=>{
                    data = JSON.parse(data).map(item=>{
                        if(item.id==parseInt(book.id)){
                            item.isCollection = book.isCollection;
                        }
                        return item;
                    })
                    write(data,(returndata)=>{
                        let changeitem = data.find(item=>item.id==book.id)
                        returndata.isCollection = changeitem.isCollection;
                        res.end(JSON.stringify(returndata))
                    })
                })

            })
        }
            break;
    }

  

}).listen(4000,()=>{console.log("localhose:4000  run")})