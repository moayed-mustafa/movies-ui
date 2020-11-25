
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
        // console.log(result.data)
        setter(data => data = result)
        history.push('/movies')
        // I think I need to use context to pass the data coming from the api call to my movies list component
        setFormData({ search: '' });
    }

    return (

                <Form inline onSubmit={handleSubmit} className="form">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 form-group">
                        {/* <Label for="exampleEmail" className="mr-sm-2">Search</Label> */}
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