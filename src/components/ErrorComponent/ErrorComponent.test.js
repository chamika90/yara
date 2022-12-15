import { render } from "@testing-library/react";
import ErrorComponent from "./ErrorComponent";

describe('render error component', () => {
    it('Should match snapshot', () => {
        const {toJSON}  = render(<ErrorComponent message={"Some thing went wrong."}/>);
        expect(toJSON).toMatchSnapshot();
    });
  });