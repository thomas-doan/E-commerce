import 'dart:convert';
import 'dart:developer';

import 'package:http/http.dart' as http;
import 'package:c2wk/constant.dart';
import 'package:c2wk/models/product.dart';

class ProductService {
  static Future<List<ProductModel>> getProduct() async {
    var url = Uri.parse('${ApiConstant.baseUrl}${ApiConstant.productEndpoint}/all_products');
    var response = await http.get(url);
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return List<ProductModel>.from(data.map((x) => ProductModel.fromJson(x)));
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<ProductModel> getProductById(int id) async {
    var url = Uri.parse("${ApiConstant.baseUrl}${ApiConstant.productEndpoint}/$id");
    var response = await http.get(url);
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return ProductModel.fromJson(data);
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<ProductModel> postProduct(ProductModel product) async {
    var url = Uri.parse(ApiConstant.baseUrl + ApiConstant.productEndpoint);
    var response = await http.post(url,
        headers: {"Content-Type": "application/json"},
        body: json.encode(product.toJson()));
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return ProductModel.fromJson(data);
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<ProductModel> putProduct(ProductModel product) async {
    var url = Uri.parse(ApiConstant.baseUrl + ApiConstant.productEndpoint);
    var response = await http.put(url,
        headers: {"Content-Type": "application/json"},
        body: json.encode(product.toJson()));
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return ProductModel.fromJson(data);
    } else {
      throw Exception('Failed to load data');
    }
  }
}