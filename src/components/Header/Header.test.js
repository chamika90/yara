import { render } from "@testing-library/react";
import Header from "./Header";

describe('render header', () => {
    it('Should match snapshot', () => {
        const {toJSON}  = render(<Header/>);
        expect(toJSON).toMatchSnapshot();
    });
});