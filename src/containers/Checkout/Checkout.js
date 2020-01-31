import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    };

    componentDidMount() {
        console.log(this.props);
        console.log(this.props.location.search);
        const ingredients = {};
        let price = 0;
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        console.log(ingredients);
        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        const component = (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinued}
                    />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}/>
            </div>
        );
        return this.state.ingredients ? component : null;
    }
}

export default Checkout;
