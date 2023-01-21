//import 'package:c2wk/services/cart.dart';
import 'package:flutter/material.dart';
import 'package:c2wk/models/product.dart';
//import 'package:c2wk/services/cart.dart';
import 'package:c2wk/screens/product_detail.dart';

class ProductCard extends StatelessWidget {
  final ProductModel product;

  const ProductCard({Key? key, required this.product}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 200,
      child: Card(
        child: Column(
          children: [
            Image.asset(product.image, width: 200, height: 180),
            Text(product.name),
            Text(product.price.toString()),
            ButtonBar(
              children: [
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
                TextButton(
                  child: const Text('View Details'),
                  onPressed: () {
                    // Navigate to product details screen
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            ProductDetailsScreen(product: product),
                      ),
                    );
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
