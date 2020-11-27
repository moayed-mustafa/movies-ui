
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { Button, Form,Label, FormGroup,Input } from 'reactstrap';
import Api from './Api'
export default
    function SearchForm({setter}) {

      // set the state of the form
    const [formData, setFormData] = useState({ search: "" });
    const history = useHistory();
 
    // monitor the change of the form data and change state
    function changeData(e){
        e.persist();
        const { value, name } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
       }))
    }

    async function handleSubmit (e) {
        e.preventDefault()
        const result = await Api.search(formData.search)
        setter(data => data = result)
        history.push('/movies')
        setFormData({ search: '' });
    }

    return (

                <Form inline onSubmit={handleSubmit} className="form">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 form-group">
                    <Input type="text"
                        name="search"
                        className="search"
                        placeholder="Search a movie"
                        onChange={changeData}
                        value={formData.search}
                         />
                    </FormGroup>
                    <Button color="danger">Submit</Button>
            </Form>



    )
}