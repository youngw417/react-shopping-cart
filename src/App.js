import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';
// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);
	// get cart when refresh
	useEffect(() => {
	if (window.localStorage.cart) 

		setCart(JSON.parse(window.localStorage.cart))
	
	
	}, []);

	useEffect(() => {
		if (cart) 
			window.localStorage.setItem('cart',JSON.stringify(cart));
		
		}, [cart]);


	const addItem = item => {
		// add the given item to the cart
		setCart([...cart,item])
	};

	const removeItem = item => {
		
		setCart(cart.filter(each => item.id !== each.id))
		
	}

	return (
		<div className="App">
			
			<ProductContext.Provider value = { {
				products,
		
				addItem
			}}>
				<CartContext.Provider value = {{
					cart,
					removeItem }} >
					<Navigation />

							
					<Route
					exact
					path="/"
				
					component = {Products}
				
					/>

					<Route
						path="/cart"
						component = {ShoppingCart}
					/>
				</CartContext.Provider>
				
			</ProductContext.Provider>
			
		</div>
	);
}

export default App;
