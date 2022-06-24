import React, {useState, useEffect} from 'react'
import {Form, InputGroup, FormControl} from 'react-bootstrap'
import { FaSearch } from "react-icons/fa"
import {useHistory} from 'react-router-dom'

const SearchBox = () => {
	const [keyword, setKeyword] = useState('')

	const history = useHistory()

    useEffect(() => {
        if (keyword === "") {
            history.push('/')
        }
    }, [keyword, history])

	const submitHandler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			history.push(`/search/${keyword}`)
		} else {
			history.push('/')
		}
	}

	return (
		<Form
			inline
			onSubmit={submitHandler}
			className="search-form"
		>
			<InputGroup>
			    <InputGroup.Text id="search-product">
			    	<FaSearch />
			    </InputGroup.Text>
			    <FormControl
			      placeholder="Search products"
			      aria-label="search"
			      aria-describedby="search-product"
			      onChange={(e) => setKeyword(e.target.value)}
			    />
			  </InputGroup>
		</Form>
	)
}

export default SearchBox 