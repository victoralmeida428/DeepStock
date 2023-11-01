import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { favStocksAction, favStocksUpdateAction } from "../actions/stocksActions";
import { useEffect, useState } from "react";

export default function TableInfo({ data, favs }) {
    const dispatch = useDispatch()
    const loginReducer = useSelector(state => state.userLogin)
    const {userInfo} = loginReducer
    console.log('Aqui --> ', data);
    const keys = Object.keys(data[0])


    const favAction = (e)=>{
        const stock = e.target.parentElement.innerText
        if (e.target.className.includes('solid')){
            dispatch(favStocksUpdateAction(userInfo.id, {
                stock: stock.trim(),
                method: 'DELETE'
            }))
        }

        else {
            dispatch(favStocksUpdateAction(userInfo.id, {
                stock: stock.trim(),
                method: 'POST'
            }))
        }
        dispatch(favStocksAction(userInfo.id))
    }
    
    const setKPI = (value, nums) => {
        try{
        let newvalue = Number(value.replaceAll(',', ''))
        let array = nums.filter((element) => element !== null).map((e)=>Number(e.replaceAll(',','').trim()))
        if (array.length>1){
        if (Number(newvalue) == Math.max(...array)){
                return <i class="ms-1 fa-solid fa-up-long fa-xs" style={{color: "#069308"}}></i>
            }
        if (Number(newvalue) == Math.min(...array)) {
                return <i class="ms-1 fa-solid fa-down-long fa-xs" style={{color: "#ff0000"}}></i>
            }}}
        catch (err) {
            console.log(err);
            return ''
        }
    }
    const head = keys.map((e) => {
        if (e === 'Informations') {
            return (<td key={e}>{e}</td>)
        }
        if (favs.includes(e)) {
            return (<td key={e}>{e} <i onClick={favAction}
                className="fa-solid fa-heart"
                style={{ cursor: 'pointer', color: "#ff0000" }}></i></td>)
        }
        else {
            return (<td key={e}>{e} <i onClick={favAction}
                className="fa-regular fa-heart"
                style={{cursor: 'pointer', color: "#ff0000" }}></i></td>)
        }

    })
    const body = data.map((row, index) => {
        let current_num = keys.map((e)=> row[e])
        current_num.shift()
        return (
            <tr key={index}>
                {keys.map((col) => <td keys={`${index}-${row[col]}`}>{row[col]?row[col]:'-'}{setKPI(row[col], current_num)}</td>)}
            </tr>
        )
    })
    return (
        <Table striped>
            <thead>
                {head}
            </thead>
            <tbody>
                {body}
            </tbody>
        </Table>
    )
}