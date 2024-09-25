import './Login&Signup.css';

import React, {useState} from "react";
import {Button, Card, CardBody, CardHeader, Input, Spacer, DateInput, Select, SelectItem, ScrollShadow} from "@nextui-org/react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import {getLocalTimeZone, CalendarDate, today} from "@internationalized/date";
import {questions} from './questions';

const SignupPage = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        date_of_birth: '',
        password: '',
        security_question: '',
        security_answer: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container'>
            <Card>
                <CardHeader className='header'>
                    <h1 className='header-text'>Horizon</h1>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit} className='signup-card'>
                        <Input isRequired type="text" label="First Name" name="first_name" placeholder="Enter your First Name" className="max-w-xs" onChange={handleChange}/>
                        <Spacer y={5}/>
                        <Input isRequired type="text" label="Last Name" name="last_name" placeholder="Enter your Last Name" className="max-w-xs" onChange={handleChange}/>
                        <Spacer y={5}/>
                        <Input isRequired type="text" label="User Name" name="username" placeholder="Enter your User Name" className="max-w-xs" onChange={handleChange}/>
                        <Spacer y={5}/>
                        <DateInput 
                        className="max-w-xs"
                        label={"Date of Birth"} 
                        isRequired
                        name="date_of_birth"
                        onChange={(value) => setFormData({ ...formData, date_of_birth: value.toString() })}
                        minValue={today(getLocalTimeZone()).subtract({years: 100})}
                        maxValue={today(getLocalTimeZone()).subtract({days: 1})}
                        />
                        <Spacer y={5}/>
                        <Select
                        isRequired
                        label="Security Question"
                        placeholder="Select a question"
                        className="max-w-xs"
                        name="security_question"
                        onChange={(value) => setFormData({ ...formData, security_question: value })}
                        >
                            {questions.map((question) => (
                                <SelectItem key={question.key}>
                                {question.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Spacer y={5}/>
                        <Input isRequired type="text" label="Security Question" name="security_answer" placeholder="Answer" className="max-w-xs" onChange={handleChange} />
                        <Spacer y={5}/>
                        <Input isRequired type="email" label="Email" name="email" placeholder="Enter your email" className="max-w-xs" onChange={handleChange} />
                        <Spacer y={5}/>
                        <Input
                            isRequired
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                {isVisible ? (
                                    <LuEye className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <LuEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className="max-w-xs"
                            onChange={handleChange}
                        />
                        <Spacer y={5}/>
                        <Button color="primary" type="submit" className="max-w-xs">
                            Signup
                        </Button>
                        </form>
                </CardBody>
            </Card>
        </div>
    )
};

export default SignupPage;