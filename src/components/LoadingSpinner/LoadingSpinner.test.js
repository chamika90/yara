import { render } from "@testing-library/react";

import LoadingSpinner from "./LoadingSpinner";

describe('render loading spinner', () => {
    it('Should match snapshot', () => {
        const {toJSON}  = render(<LoadingSpinner />);
        expect(toJSON).toMatchSnapshot();
    });
});