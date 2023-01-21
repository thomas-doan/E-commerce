import 'dart:async';

import 'package:c2wk/providers/user_preferences.dart';
import 'package:c2wk/services/storage_service.dart';
import 'package:c2wk/screens/dashboard_of_user.dart';
import 'package:flutter/material.dart';

import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';
import 'package:jwt_decode/jwt_decode.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/signin_form_model.dart';
import '../models/signup_form_model.dart';
import '../users/authentication/login_screen.dart';

class AuthProvider {
  final String host = 'http://localhost:3000';
  final FlutterSecureStorage storage = const FlutterSecureStorage();
  late String? token;
  late Timer? timer;
  bool isLoading = false;
  bool? isLoggedin;

  Future<dynamic> signup(SignupForm signupForm) async {
    try {
      http.Response response = await http.post(
        Uri.parse('$host/auth/register'),
        headers: {'Content-type': 'application/json'},
        body: json.encode(signupForm.toJson()),
      );

      if (response.statusCode != 200) {
        return json.decode(response.body);
      }
      Get.to(() => const LoginScreen());
      return true;
    } catch (e) { 
      print(e);
      rethrow;
    }
  }

  Future<dynamic> signin(SigninForm signinForm) async {
    try {
      http.Response response = await http.post(
        Uri.parse('$host/auth/login'),
        headers: {'Content-type': 'application/json'},
        body: json.encode(
          signinForm.toJson(),
        ),
      );
      final Map<String, dynamic> body = json.decode(response.body);
      if (response.statusCode != 200) {
        return json.decode(response.body);
      }

      token = body['access_token'];
      await storage.write(key: 'token', value: token);

      var readValue = await storage.read(key: 'token');
     

      var userInfo = Jwt.parseJwt(readValue!);

      await storage.write(key: 'currentUser', value: jsonEncode(userInfo));
      var storeData = RememberUserPrefs().storeUserInfo(userInfo);

      Get.to(() => DashboardOfUser());
      isLoggedin = true;
      return true;
    } catch (e) {
      print(e);
      rethrow;
    }
  }

   signOutUser() async {
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
          "Are you sure?\nyou want to logout from app?",
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
                Get.back(result: "loggedOut");
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

    if (resultResponse == "loggedOut") {
      //delete-remove the user data from phone local storage
      AuthProvider().removeUserInfo().then((value) {
        Get.off(const LoginScreen());
      });
    }
  }


     Future<void> removeUserInfo() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    await preferences.remove("currentUser");
  }
}
