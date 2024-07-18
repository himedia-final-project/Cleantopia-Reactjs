
import { EMPLOYEE } from "../modules/HRModule";
import axios from "axios";

export const callEmployeeList=({current})=>{
    let requestURL;

    if(current !== undefined || current !== null){
        requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8080/members/employee?offset=${current}`;

    }else{
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/members/employee`;
    }

    console.log('callEmployeeList 동작함')
    console.log(requestURL)

    console.log(window.localStorage.getItem('accessToken'))

    return async (dispatch,getState)=>{
        console.log('sdfadsfadslfkj;ldkj;ldakjf;alkdf')
        const result = await fetch(requestURL,{
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then(res=>res.json())

        if(result.status === 200){
            console.log('callEmployeeList 조회 성공 ',result)

            dispatch({type : EMPLOYEE , payload : result.data })
        }
    }
}

export function callSoftDeleteEmployee({deleteMember}){
    console.log("callSoftDeleteEmployee 동작")
    console.log(deleteMember)
    
    return async (dispatch,getState)=>{
        console.log("여기 들어옴?")
        const requestUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/members/employee/soft`;

        console.log(requestUrl)
        const result = await fetch(requestUrl,{
            method : 'PUT',
            headers :{
                'Content-Type' : 'application/json',
                Accept: "*/*",
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken'),
            },
            // body : JSON.stringify(deleteMember)
        }).then(res=>res.json())

        if(result.status ===200){
            console.log('삭제성공')
            dispatch({type : EMPLOYEE , payload : result.data})
        }
    }


}

// export const callSoftDeleteEmployee=({deleteMember})=>{
//     console.log('callSoftDeleteEmployee 동작함')
//     return async(dispatch,getState)=>{
//         console.log('오긴했는가')
//         const requestUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/members/employee/soft`;

//         const result = await axios.put(
//             requestUrl,
//             JSON.stringify(deleteMember),
//             {'Content-Type' : 'application/json ; charset=utf-8', Accept : '*/*',Authorization : 'Bearer '+window.localStorage.getItem('accessToken')}
//         ).then(res=>res.data)

//         if(result.status === 200){
//             console.log('삭제 성공')
//             dispatch({type : EMPLOYEE , payload : result.data})
//         }
//     }
// }