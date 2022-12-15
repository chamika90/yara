import { render } from "@testing-library/react";

import CitiesListComponent from "./CitiesListComponent";

describe('render cities list', () => {
    it('Should match snapshot', () => {
        const {toJSON}  = render(<CitiesListComponent />);
        expect(toJSON).toMatchSnapshot();
    });
});