import 'dart:convert';
import 'dart:developer';

import 'package:http/http.dart' as http;
import 'package:c2wk/constant.dart';
import 'package:c2wk/models/user.dart';

class UserService {
  static Future<List<UserModel>> getUser() async {
    var url = Uri.parse(ApiConstant.baseUrl + ApiConstant.userEndpoint);
    var response = await http.get(url);
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return List<UserModel>.from(data.map((x) => UserModel.fromJson(x)));
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<UserModel> getUserById(int id) async {
    var url = Uri.parse("${ApiConstant.baseUrl}${ApiConstant.userEndpoint}/$id");
    var response = await http.get(url);
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return UserModel.fromJson(data);
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<UserModel> postUser(UserModel user) async {
    var url = Uri.parse(ApiConstant.baseUrl + ApiConstant.userEndpoint);
    var response = await http.post(url,
        headers: {"Content-Type": "application/json"},
        body: json.encode(user.toJson()));
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return UserModel.fromJson(data);
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<UserModel> putUser(UserModel user) async {
    var url = Uri.parse(ApiConstant.baseUrl + ApiConstant.userEndpoint);
    var response = await http.put(url,
        headers: {"Content-Type": "application/json"},
        body: json.encode(user.toJson()));
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return UserModel.fromJson(data);
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<UserModel> deleteUser(int id) async {
    var url = Uri.parse("${ApiConstant.baseUrl}${ApiConstant.userEndpoint}/$id");
    var response = await http.delete(url);
    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      log(data.toString());
      return UserModel.fromJson(data);
    } else {
      throw Exception('Failed to load data');
    }
  }
}