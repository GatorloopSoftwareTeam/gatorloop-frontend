import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { ErrorMessage, Formik } from "formik"
import * as Yup from "yup"
import AppContext from "../context/AppContext"

var axios = require('axios')

const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .required('Required'),
    passwordConfirm: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  })


class SignUp extends Component
{
    static contextType = AppContext
    render()
    {
        let page = this
        return (
            <Container className="p-3">
                <Formik
                    initialValues={{    
                        name: '',  
                        email: '',
                        subteam: 'ece',
                        passwordConfirm: '',
                        password: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, actions) =>
                    {
                        delete values.passwordConfirm
                        axios.post('/auth/signup', values)
                        .then((response) =>
                        {
                            if (response.success)
                            {
                                page.context.redirect("/success")
                            }
                        })
                        .catch((error) =>
                        {
                            var response = error.response.data
                            actions.setSubmitting(false);
                            console.error("ERROR", error)

                            if (!response.error)
                            {
                                actions.setFieldError("general", "There was an error with your request, please try again.")
                                
                            }

                            else if (response.error.name == "UserExistsError")
                            {
                                actions.setFieldError("email", "Email exists.")
                            }

                            else
                            {
                                actions.setFieldError("general", "There was an error with your request, please try again.")
                            }
                        })
                    }}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                            <Form onSubmit={handleSubmit}>
                                <ErrorMessage name="general" />
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your Name"
                                        id="name"
                                        name="name"
                                        onChange={handleChange}
                                        value={values.name} />
                                    
                                    <ErrorMessage name="name" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your email"
                                        id="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={values.email} />
                                    
                                    <ErrorMessage name="email" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Sub Team</Form.Label>
                                    <Form.Control
                                        id="subteam"
                                        name="subteam"
                                        onChange={handleChange}
                                        value={values.subteam}
                                        as="select">
                                        <option value="ece">ECE</option>
                                        <option value="mech">Mech</option>
                                    </Form.Control>

                                    <ErrorMessage name="subteam" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        onChange={handleChange}
                                        value={values.password} />
                                    
                                    <ErrorMessage name="password" />

                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        onChange={handleChange}
                                        value={values.passwordConfirm} />
                                    
                                    <ErrorMessage name="passwordConfirm" />

                                </Form.Group>
                                
                                <Button variant="primary" type="submit">Sign Up</Button>
                            </Form>
                            )}
                    </Formik>
                </Container>
        )
    }
}

export default SignUp
