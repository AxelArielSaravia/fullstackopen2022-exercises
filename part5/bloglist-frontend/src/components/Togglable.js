import {useState, forwardRef, useImperativeHandle} from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(function Togglable({buttonLabel, children}, refs) {

    const [visible, setVisible] = useState(false);

    const hideWhenVisible = {display: visible ? "none" : ""};
    const showWhenVisible = {display: visible ? "" : "none"};

    function toggleVisibility() {
        setVisible((s) => !s);
    }

    useImperativeHandle(refs, function() {
        return {toggleVisibility};
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    );
});

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
};

export default Object.freeze(Togglable);