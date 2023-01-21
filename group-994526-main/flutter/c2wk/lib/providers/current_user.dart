import 'dart:async';

import 'package:c2wk/providers/user_preferences.dart';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';

import '../models/user.dart';

class CurrentUser extends GetxController {
  final FlutterSecureStorage storage = const FlutterSecureStorage();

  Future<dynamic> getUserConnect() async {
    try {
      var getUserInfoFromLocalStorage =
          await RememberUserPrefs().readUserInfo();

      return getUserInfoFromLocalStorage;
    } catch (e) {
      print(e);
    }
  }
}
