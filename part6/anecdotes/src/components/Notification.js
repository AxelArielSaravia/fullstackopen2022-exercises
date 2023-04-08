import {useSelector} from "react-redux";

const style = {
    border: "solid",
    padding: "10px",
    borderWidth: "1px"
};

function selectorCb(state) {
    return state.notification;
}

function Notification() {
    const {type, content} = useSelector(selectorCb);

    return (
        type === "add"
        ? <div style={style}>A new anecdote added: "{content}"</div>
        : (
            type === "vote"
            ? <div style={style}>You voted "{content}"</div>
            : ""
        )
    );
}

export default Notification;