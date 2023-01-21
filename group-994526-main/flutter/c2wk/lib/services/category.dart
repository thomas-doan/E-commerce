import 'dart:convert';
import 'dart:developer';

import 'package:http/http.dart' as http;
import 'package:c2wk/constant.dart';
import 'package:c2wk/models/category.dart';

class CategoryService {
  static Future<List<CategoryModel>> getCategory() async {
    var url = Uri.parse('${ApiConstant.baseUrl}${ApiConstant.categoryEndpoint}/all');
    var response = await http.get(url);
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return List<CategoryModel>.from(data.map((x) => CategoryModel.fromJson(x)));
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<CategoryModel> getCategoryById(int id) async {
    var url = Uri.parse("${ApiConstant.baseUrl}${ApiConstant.categoryEndpoint}/$id");
    var response = await http.get(url);
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return CategoryModel.fromJson(data);
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<CategoryModel> postCategory(CategoryModel category) async {
    var url = Uri.parse(ApiConstant.baseUrl + ApiConstant.categoryEndpoint);
    var response = await http.post(url,
        headers: {"Content-Type": "application/json"},
        body: json.encode(category.toJson()));
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return CategoryModel.fromJson(data);
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<CategoryModel> putCategory(CategoryModel category) async {
    var url = Uri.parse(ApiConstant.baseUrl + ApiConstant.categoryEndpoint);
    var response = await http.put(url,
        headers: {"Content-Type": "application/json"},
        body: json.encode(category.toJson()));
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return CategoryModel.fromJson(data);
    } else {
      throw Exception('Failed to load data');
    }
  }
}