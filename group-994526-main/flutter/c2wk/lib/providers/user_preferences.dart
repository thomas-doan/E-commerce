import 'dart:convert';

import 'package:c2wk/services/storage_service.dart';
import 'package:c2wk/users/authentication/login_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:fluttertoast/fluttertoast.dart';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:get/get.dart';
import '../models/user.dart';
import 'package:http/http.dart' as http;

import 'auth_provider.dart';

class RememberUserPrefs {
  get localStorage => null;

  storeUserInfo(userInfo) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    String userJsonData = jsonEncode(userInfo);
    await prefs.setString("currentUser", userJsonData);
  }

  readUserInfo() async {
    const FlutterSecureStorage storageData = FlutterSecureStorage();

    var roro = await storageData.readAll();

    UserModel? currentUserInfo;

    final SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userJsonData = prefs.getString("currentUser");

    var dataInfo = await StorageService().getUserInfo();

    return dataInfo;
  }

  Future modifyUser(username, email, id, password) async {
    try {
      const FlutterSecureStorage storage = FlutterSecureStorage();

      var tokenUser = await storage.read(key: 'token');
      print(tokenUser);
      print(id);
      print('username: $username');
      print('email: $email');
      print('password: $password');
      print('http://localhost:3000/data_user/$id');

      var response = await http.patch(
        Uri.parse('http://localhost:3000/data_user/user/$id'),
        headers: {'authorization': 'Bearer $tokenUser'},
        body: {
          'username': username.toString(),
          'password': password,
          'email': email.toString(),
        },
      );

      print(response.body);
      if (response.statusCode == 200) {
        var resBodyOfUploadItem = jsonDecode(response.body);
        print('resBodyOfUploadItem: $resBodyOfUploadItem');

        Fluttertoast.showToast(msg: "La modification est faite !");
      } else {
        Fluttertoast.showToast(msg: "Erreur");
      }
    } catch (errorMsg) {
      print("Error:: " + errorMsg.toString());
    }
  }

  Future deleteUser(id) async {
    var resultResponse = await Get.dialog(
      AlertDialog(
        backgroundColor: Colors.grey,
        title: const Text(
          "Logout",
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        content: const Text(
          "Etes vous sur de supprimer votre compte ?",
        ),
        actions: [
          TextButton(
              onPressed: () {
                Get.back();
              },
              child: const Text(
                "No",
                style: TextStyle(
                  color: Colors.black,
                ),
              )),
          TextButton(
              onPressed: () {
                Get.back(result: "suppr");
              },
              child: const Text(
                "Yes",
                style: TextStyle(
                  color: Colors.black,
                ),
              )),
        ],
      ),
    );

    if (resultResponse == "suppr") {
      try {
        const FlutterSecureStorage storage = FlutterSecureStorage();

        var tokenUser = await storage.read(key: 'token');

        var response = await http.delete(
          Uri.parse('http://localhost:3000/data_user/user/$id'),
          headers: {'authorization': 'Bearer $tokenUser'},
        );

        AuthProvider().removeUserInfo().then((value) {
          Get.off(const LoginScreen());
        });
      } catch (errorMsg) {
        print("Error:: " + errorMsg.toString());
      }
    }
  }
}
