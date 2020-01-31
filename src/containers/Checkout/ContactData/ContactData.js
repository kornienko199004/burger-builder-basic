import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Aleksey',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41234',
                    country: 'Russia',
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest',
        };

        axios.post('/orders.json', order)
            .then((res) => {
                console.log(res);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
    };

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="code" placeholder="Post code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
            );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;