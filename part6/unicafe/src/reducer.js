const initialState = Object.freeze({
    good: 0,
    ok: 0,
    bad: 0
});

function counterReducer(state = initialState, action) {
    const type = action?.type;
    if (type === "add good") {
        return {
            ...state,
            good: state.good + 1
        };
    } else if (type === "add ok") {
        return {
            ...state,
            ok: state.ok + 1
        };
    } else if (type === "add bad") {
        return {
            ...state,
            bad: state.bad + 1
        };
    } else if (type === "reset") {
        return initialState;
    } else {
        return state;
    }
}

export default counterReducer;