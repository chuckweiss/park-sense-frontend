import styled from "styled-components"

export const DropdownWrapper = styled.form`
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center
`;

export const StyledSelect = styled.select`
    max-width: 30%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 0.5rem;
    margin-bottom: 1rem;
    text-align: center
`;

export const StyledOption = styled.option`
    color: ${(props) => (props.selected ? "lightgrey" : "black")};
    width: 50%;
    justify-content: center;
`;

export const StyledLabel = styled.label`
    margin-bottom: 1rem;
    width: 50%
    justify-content: center
    text-align: center
`;

export const StyledButton = styled.input`
    max-width: 50%;
    height: 100%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    border: solid 2px blue;
    border-radius: 1rem;`