import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { favStocksAction, favStocksUpdateAction } from "../actions/stocksActions";

export default function TableInfo({ data, favs }) {
    const dispatch = useDispatch()
    const loginReducer = useSelector(state => state.userLogin)
    const {userInfo} = loginReducer
    const infoReducer = useSelector(state => state.infoStocks)
    const updateFav = useSelector(state => state.favStocksUpdate)
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
    
    const head = keys.map((e) => {
        if (e === 'info') {
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
        return (
            <tr key={index}>
                {keys.map((col) => <td keys={`${index}-${row[col]}`}>{row[col]}</td>)}
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