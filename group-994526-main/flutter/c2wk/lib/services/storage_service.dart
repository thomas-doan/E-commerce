import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'package:http/http.dart' as http;

import '../models/user.dart';

/* 
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
  } */

class StorageService {
  final FlutterSecureStorage storage = const FlutterSecureStorage();

  Future<UserModel?> getUserInfo() async {
    UserModel currentUserInfo;
    var tokenUser = await storage.read(key: 'token');

    http.Response response = await http.get(
      Uri.parse('http://localhost:3000/data_user/me_without_adress'),
      headers: {'authorization': 'Bearer $tokenUser'},
    );

    if (response.statusCode != 200) {
      return json.decode(response.body);
    }

    print('response: ${response.body}');

    var data = await json.decode(response.body);

    print('data: $data');
    currentUserInfo = UserModel.fromJson(data);
  

     return currentUserInfo; 
  }
}


/*   static Future<User?> readUserInfo() async
  {
    User? currentUserInfo;
    SharedPreferences preferences = await SharedPreferences.getInstance();
    String? userInfo = preferences.getString("currentUser");
    if(userInfo != null)
    {
      Map<String, dynamic> userDataMap = jsonDecode(userInfo);
      currentUserInfo = User.fromJson(userDataMap);
    }
    return currentUserInfo;
  } */