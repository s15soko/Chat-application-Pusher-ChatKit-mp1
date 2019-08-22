import * as React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    border-bottom: 1px solid #f0f0f0;
`;

const Form = styled.form`
   padding: 2px 2px 10px 2px;
`;

const Button = styled.button`
    border: none; 
    outline: none; 
    background: transparent;
`;

const handleSubmit = (event) => {
    event.preventDefault();
}

export class Nav extends React.Component
{
    render()
    {
        return(
            <FormContainer id='searchFormContainer'>

                <Form id='searchForm' onSubmit={handleSubmit} className="form-inline md-form form-sm active-purple-2 mt-2">

                    <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search by name..."
                        aria-label="Search"/>

                    <Button onClick={() => this.onSubmit}>
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </Button>

                </Form>

            </FormContainer>
        );
    }  
}