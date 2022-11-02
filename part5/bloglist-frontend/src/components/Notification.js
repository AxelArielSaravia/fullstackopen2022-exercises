
function Notification({
    message,
    isError,
    isSucceed
}) {
    if (message === "") {
        return;
    }
    const className = "notification " + (
        isError
        ? "error"
        : isSucceed
        ? "succeed"
        : ""
    );
    return (
        <div className={className}>
            {message}
        </div>
    );
}

export default Object.freeze(Notification);