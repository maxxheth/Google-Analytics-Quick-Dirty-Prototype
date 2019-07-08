import { PanelOptionComponent } from '../view/panel-components';

const createOptionComponent = value => text => new PanelOptionComponent(value, text);

export const createOptionComponents = optionProps => {

    const optionComponents = optionProps.reduce((acc, curr) => {

        const { value, text } = curr;

        acc.push(createOptionComponent(value)(text));

        return acc;

    }, []);

    return optionComponents;

};