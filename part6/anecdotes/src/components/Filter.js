import {useDispatch} from "react-redux";
import {filterActions} from "../slice/filter.js";

const style = {
    marginButton: "10px"
};

function Filter() {
    const dispatch = useDispatch();

    function handleChange(event) {
        const content = event.target.value;
        dispatch(filterActions.change(content));
    }

    return (
        <div style={style}>
            <label>
                <span>filter: </span>
                <input type="text" onChange={handleChange}/>
            </label>
        </div>
    );
}

export default Filter;