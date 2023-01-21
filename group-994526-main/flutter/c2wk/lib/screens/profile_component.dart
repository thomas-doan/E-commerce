import 'package:c2wk/providers/auth_provider.dart';
import 'package:c2wk/providers/user_preferences.dart';
import 'package:c2wk/services/storage_service.dart';
import 'package:c2wk/models/user.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../providers/current_user.dart';

class ProfileComponent extends StatefulWidget {
  const ProfileComponent({super.key});

  @override
  State<ProfileComponent> createState() => 
  _ProfileComponentState();
}

class _ProfileComponentState extends State<ProfileComponent> {
  get value => null;

  Widget userInfoItemProfile(IconData iconData, String userData) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: Colors.white,
      ),
      padding: const EdgeInsets.symmetric(
        horizontal: 16,
        vertical: 8,
      ),
      child: Row(
        children: [
          Icon(
            iconData,
            size: 30,
            color: Colors.black,
          ),
          const SizedBox(
            width: 16,
          ),
          Text(
            userData,
            style: const TextStyle(
              fontSize: 15,
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    var usernameController = TextEditingController();
    var emailController = TextEditingController();
    /* var paysController = TextEditingController();
    var villeController = TextEditingController();
    var adresseOfUserController = TextEditingController(); */
    return FutureBuilder(
      future: StorageService().getUserInfo(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return ListView(
            padding: const EdgeInsets.all(32),
            children: [
              Center(
                child: Image.asset(
                  "assets/images/profil.png",
                  width: 240,
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              TextFormField(
                controller: usernameController,
                validator: (val) => val == "" ? "Il faut un username !" : null,
                decoration: InputDecoration(
                  prefixIcon: const Icon(
                    Icons.person,
                    color: Colors.black,
                  ),
                  hintText: snapshot.data!.username,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                    borderSide: const BorderSide(
                      color: Colors.white60,
                    ),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                    borderSide: const BorderSide(
                      color: Colors.white60,
                    ),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                    borderSide: const BorderSide(
                      color: Colors.white60,
                    ),
                  ),
                  disabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                    borderSide: const BorderSide(
                      color: Colors.white60,
                    ),
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 6,
                  ),
                  fillColor: Colors.white,
                  filled: true,
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              TextFormField(
                controller: emailController,
                validator: (val) => val == "" ? "Il faut un email !" : null,
                decoration: InputDecoration(
                  prefixIcon: const Icon(
                    Icons.email,
                    color: Colors.black,
                  ),
                  hintText: snapshot.data!.email,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                    borderSide: const BorderSide(
                      color: Colors.white60,
                    ),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                    borderSide: const BorderSide(
                      color: Colors.white60,
                    ),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                    borderSide: const BorderSide(
                      color: Colors.white60,
                    ),
                  ),
                  disabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                    borderSide: const BorderSide(
                      color: Colors.white60,
                    ),
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 6,
                  ),
                  fillColor: Colors.white,
                  filled: true,
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Center(
                child: Material(
                  color: Color.fromARGB(255, 255, 166, 82),
                  borderRadius: BorderRadius.circular(8),
                  child: InkWell(
                    onTap: () {
                      RememberUserPrefs().modifyUser(usernameController.text,
                          emailController.text, snapshot.data!.id_user, snapshot.data!.password);
                    },
                    borderRadius: BorderRadius.circular(32),
                    child: const Padding(
                      padding: EdgeInsets.symmetric(
                        horizontal: 30,
                        vertical: 12,
                      ),
                      child: Text(
                        "Modifier",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Center(
                child: Material(
                  color: Colors.redAccent,
                  borderRadius: BorderRadius.circular(8),
                  child: InkWell(
                    onTap: () {
                      AuthProvider().signOutUser();
                    },
                    borderRadius: BorderRadius.circular(32),
                    child: const Padding(
                      padding: EdgeInsets.symmetric(
                        horizontal: 30,
                        vertical: 12,
                      ),
                      child: Text(
                        "Sign Out",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Center(
                child: Material(
                  color: Color.fromARGB(255, 71, 5, 5),
                  borderRadius: BorderRadius.circular(8),
                  child: InkWell(
                    onTap: () {
                      RememberUserPrefs().deleteUser(snapshot.data!.id_user);
                    },
                    borderRadius: BorderRadius.circular(32),
                    child: const Padding(
                      padding: EdgeInsets.symmetric(
                        horizontal: 30,
                        vertical: 12,
                      ),
                      child: Text(
                        "Supprimer mon compte",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(
                height: 20,
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
