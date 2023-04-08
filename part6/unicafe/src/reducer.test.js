import counterReducer from "./reducer.js";

describe("unicafe reducer", function () {
    const initialState = Object.freeze({
        good: 0,
        ok: 0,
        bad: 0
    });
    test(
        "should return a proper intial state whe ncalled with under state",
        function () {
            const newState = counterReducer();
            expect(newState).toEqual(initialState);
        }
    );
    test(
        "good is incremented",
        function () {
            const action = {
                type: "add good"
            };
            const newState = counterReducer(initialState, action);
            expect(newState).toEqual({
                good: 1,
                ok: 0,
                bad: 0
            });
        }
    );
    test(
        "ok is incremented",
        function () {
            const action = {
                type: "add ok"
            };
            const newState = counterReducer(initialState, action);
            expect(newState).toEqual({
                good: 0,
                ok: 1,
                bad: 0
            });
        }
    );
    test(
        "bad is incremented",
        function () {
            const action = {
                type: "add bad"
            };
            const newState = counterReducer(initialState, action);
            expect(newState).toEqual({
                good: 0,
                ok: 0,
                bad: 1
            });
        }
    );
});