import 'package:flutter/material.dart';
import 'package:c2wk/services/category.dart';
import 'package:c2wk/services/product.dart';
import 'package:c2wk/models/category.dart';
import 'package:c2wk/models/product.dart';
import 'package:c2wk/screens/category.dart';
import 'package:c2wk/screens/product.dart';

class HomeComponent extends StatelessWidget {
  const HomeComponent({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('EShop'),
      ),
      body: ListView(
        children: [
          const SizedBox(height: 16),
          _buildCategories(),
          const SizedBox(height: 16),
          _buildFeaturedProducts(),
          // const SizedBox(height: 16),
          // _buildPopularProducts(),
          // SizedBox(height: 16),
          // _buildNewArrivals(),
        ],
      ),
    );
  }

  // Builds the list of categories
  Widget _buildCategories() {
    return FutureBuilder<List<CategoryModel>>(
      future: CategoryService.getCategory(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return SizedBox(
            height: 80,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                return CategoryCard(category: snapshot.data![index]);
              },
            ),
          );
        } else {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
      },
    );
  }

  // Builds the list of featured products
  Widget _buildFeaturedProducts() {
    return FutureBuilder<List<ProductModel>>(
      future: ProductService.getProduct(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return Column(
            children: [
              const Text('Featured Products'),
              const SizedBox(height: 8),
              SizedBox(
                height: 300,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index) {
                    return ProductCard(product: snapshot.data![index]);
                  },
                ),
              ),
            ],
          );
        } else {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
      },
    );
  }
}