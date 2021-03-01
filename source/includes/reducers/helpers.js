import _ from "lodash";

const merge = (oldState, newState) => _.merge({}, oldState, newState);
const noopValidate = (input) => (input);

export const MakeMerge = (validate = noopValidate) => (oldState, newState) => {
	return validate(merge(oldState, newState))
}
