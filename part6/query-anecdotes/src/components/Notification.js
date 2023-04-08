
const style = {
    border: "solid",
    padding: "10px",
    borderWidth: "1px"
};

function Notification({text}) {
    return (
        <p
            style={style}
        >
            {text}
        </p>
    );
}

export default Notification;