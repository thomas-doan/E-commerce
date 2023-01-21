import 'package:c2wk/models/product.dart';
//import 'package:c2wk/services/cart.dart';
import 'package:flutter/material.dart';

class ProductDetailsScreen extends StatelessWidget {
  final ProductModel product;

  const ProductDetailsScreen({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(product.name),
      ),
      body: Column(
        children: [
          Image.asset(product.image),
          const SizedBox(height: 8),
          Text(product.name),
          const SizedBox(height: 8),
          Text(product.price.toString()),
          const SizedBox(height: 8),
          Text(product.description),
          const SizedBox(height: 8),
          TextButton(
            child: const Text('Add to Cart'),
            onPressed: () {
              // Add product to cart
              // CartService.addProduct(product);
              // Scaffold.of(context).showSnackBar(
                // const SnackBar(
                  // content: Text('Product added to cart'),
                // ),
              // );
            },
          ),
        ],
      ),
    );
  }
}
