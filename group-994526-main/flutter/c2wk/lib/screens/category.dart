import 'package:flutter/material.dart';
import 'package:c2wk/models/category.dart';

class CategoryCard extends StatelessWidget {
  final CategoryModel category;

  const CategoryCard({Key? key, required this.category}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      child: Card(
        child: Center(
          child: Text(category.name),
        ),
      ),
    );
  }
}
