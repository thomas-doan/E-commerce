import 'package:c2wk/providers/user_preferences.dart';
import 'package:c2wk/users/authentication/login_screen.dart';
import 'package:c2wk/screens/dashboard_of_user.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'ShareCT',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.orange,
      ),
      home: FutureBuilder(
   
        builder: (context, dataSnapShot) {
        /*   if (dataSnapShot.data == null) {
            return const LoginScreen();
          } else {
            return DashboardOfUser();
          } */
          return const LoginScreen();
        },
      ),
    );
  }
}
