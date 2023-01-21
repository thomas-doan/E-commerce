import 'dart:convert';
import 'dart:io';

import 'package:c2wk/providers/current_user.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:c2wk/screens/dashboard_of_user.dart';
import 'package:c2wk/screens/profile_component.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;

class UploadItemsScreenComponent extends StatefulWidget {
  const UploadItemsScreenComponent({super.key});

  @override
  State<UploadItemsScreenComponent> createState() =>
      _UploadItemsScreenComponentState();
}

class _UploadItemsScreenComponentState
    extends State<UploadItemsScreenComponent> {
  final ImagePicker _picker = ImagePicker();
  XFile? pickedImageXFile;

  var formKey = GlobalKey<FormState>();
  var nameController = TextEditingController();
  var priceController = TextEditingController();
  var descriptionController = TextEditingController();
  var categoryController = TextEditingController();
  var imageLink = "";
  String? dropdownvalue = 'veste';
  //defaultScreen methods
  captureImageWithPhoneCamera() async {
    pickedImageXFile = await _picker.pickImage(source: ImageSource.camera);

    Get.back();

    setState(() => pickedImageXFile);
  }

  pickImageFromPhoneGallery() async {
    pickedImageXFile = await _picker.pickImage(source: ImageSource.gallery);

    Get.back();

    setState(() => pickedImageXFile);
  }

  showDialogBoxForImagePickingAndCapturing() {
    return showDialog(
        context: context,
        builder: (context) {
          return SimpleDialog(
            backgroundColor: Colors.black,
            title: const Text(
              "Item Image",
              style: TextStyle(
                color: Colors.deepPurple,
                fontWeight: FontWeight.bold,
              ),
            ),
            children: [
              SimpleDialogOption(
                onPressed: () {
                  captureImageWithPhoneCamera();
                },
                child: const Text(
                  "Choisir ton image de la camera",
                  style: TextStyle(
                    color: Colors.grey,
                  ),
                ),
              ),
              SimpleDialogOption(
                onPressed: () {
                  pickImageFromPhoneGallery();
                },
                child: const Text(
                  "Image de votre gallery",
                  style: TextStyle(
                    color: Colors.grey,
                  ),
                ),
              ),
              SimpleDialogOption(
                onPressed: () {
                  Get.back();
                },
                child: const Text(
                  "STOP",
                  style: TextStyle(
                    color: Colors.red,
                  ),
                ),
              ),
            ],
          );
        });
  }
  //defaultScreen methods ends here

  saveItemInfoToDatabase() async {
    try {
      const FlutterSecureStorage storage = FlutterSecureStorage();

      var userId = await CurrentUser().getUserConnect();
      var tokenUser = await storage.read(key: 'token');

      print('userId : $userId');
      print('dropdownvalue: $dropdownvalue');

      var valueOfcategory = 0;

      switch (dropdownvalue) {
        case 'chaussure':
          valueOfcategory = 11;
          break;
        case 'veste':
          valueOfcategory = 12;
          break;
        case 'doudoune':
          valueOfcategory = 13;
          break;
        case 'pantalon':
          valueOfcategory = 14;
          break;
        case 'parka':
          valueOfcategory = 15;
          break;

        case 'bonnet':
          valueOfcategory = 16;
          break;

        case 'gant':
          valueOfcategory = 17;
          break;
      }
      var response = await http.post(
        Uri.parse('http://localhost:3000/product/create'),
        headers: {'authorization': 'Bearer $tokenUser'},
        body: {
          'name': nameController.text.trim().toString(),
          'price': priceController.text.trim().toString(),
          'description': descriptionController.text.trim().toString(),
          'image': 'assets/images/parka.jpeg',
          'CategoryId': valueOfcategory.toString(),
        },
      );
   
      if (response.statusCode == 200) {
        var resBodyOfUploadItem = jsonDecode(response.body);
        print('resBodyOfUploadItem: $resBodyOfUploadItem');

    
          Fluttertoast.showToast(msg: "Le produit est bien ajouté !");

          setState(() {
            pickedImageXFile = null;
            nameController.clear();

            priceController.clear();

            descriptionController.clear();
          });

          Get.to(DashboardOfUser());
       
      } else {
        Fluttertoast.showToast(msg: "Erreur");
      }
    } catch (errorMsg) {
      print("Error:: " + errorMsg.toString());
    }
  }

  Widget defaultScreen() {
    return Scaffold(
      appBar: AppBar(
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Colors.black54,
                Color.fromARGB(255, 183, 114, 58),
              ],
            ),
          ),
        ),
        automaticallyImplyLeading: false,
        title: const Text("Ajoute votre produit"),
        centerTitle: true,
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Colors.black54,
              Color.fromARGB(255, 183, 114, 58),
            ],
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.add_photo_alternate,
                color: Colors.white54,
                size: 200,
              ),

              //button
              Material(
                color: Colors.black38,
                borderRadius: BorderRadius.circular(30),
                child: InkWell(
                  onTap: () {
                    showDialogBoxForImagePickingAndCapturing();
                  },
                  borderRadius: BorderRadius.circular(30),
                  child: const Padding(
                    padding: EdgeInsets.symmetric(
                      vertical: 10,
                      horizontal: 28,
                    ),
                    child: Text(
                      "Ajoute un nouveau vetement !",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget uploadItemFormScreen() {
    var items = [
      'chaussure',
      'veste',
      'doudoune',
      'pantalon',
      'parka',
      'bonnet',
      'gant'
    ];
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Colors.black54,
                Colors.deepPurple,
              ],
            ),
          ),
        ),
        automaticallyImplyLeading: false,
        title: const Text("Upload ton produit"),
        centerTitle: true,
        leading: IconButton(
          onPressed: () {
            setState(() {
              pickedImageXFile = null;
              nameController.clear();
              priceController.clear();
              descriptionController.clear();
            });
            Get.to(DashboardOfUser());
          },
          icon: const Icon(
            Icons.clear,
          ),
        ),
      ),
      body: ListView(
        children: [
          //image
          Container(
            height: MediaQuery.of(context).size.height * 0.4,
            width: MediaQuery.of(context).size.width * 0.8,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: FileImage(
                  File(pickedImageXFile!.path),
                ),
                fit: BoxFit.cover,
              ),
            ),
          ),

          //upload item form
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Container(
              decoration: const BoxDecoration(
                color: Colors.white24,
                borderRadius: BorderRadius.all(
                  Radius.circular(60),
                ),
                boxShadow: [
                  BoxShadow(
                    blurRadius: 8,
                    color: Colors.black26,
                    offset: Offset(0, -3),
                  ),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(30, 30, 30, 8),
                child: Column(
                  children: [
                    Form(
                      key: formKey,
                      child: Column(
                        children: [
                          TextFormField(
                            controller: nameController,
                            validator: (val) =>
                                val == "" ? "Il faut un nom" : null,
                            decoration: InputDecoration(
                              prefixIcon: const Icon(
                                Icons.title,
                                color: Colors.black,
                              ),
                              hintText: "Nom image...",
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
                            height: 18,
                          ),

                          //item price
                          TextFormField(
                            controller: priceController,
                            validator: (val) =>
                                val == "" ? "Il faut un prix !" : null,
                            decoration: InputDecoration(
                              prefixIcon: const Icon(
                                Icons.price_change_outlined,
                                color: Colors.black,
                              ),
                              hintText: "Prix de l'article...",
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
                            height: 18,
                          ),

                          //item description
                          TextFormField(
                            controller: descriptionController,
                            validator: (val) =>
                                val == "" ? "Il faut une description !" : null,
                            decoration: InputDecoration(
                              prefixIcon: const Icon(
                                Icons.description,
                                color: Colors.black,
                              ),
                              hintText: "description de l'article ...",
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
                            height: 18,
                          ),

                          DropdownButton(
                            value: dropdownvalue,
                            icon: const Icon(Icons.keyboard_arrow_down),
                            items: items.map((items) {
                              return DropdownMenuItem(
                                  value: items, child: Text(items));
                            }).toList(),
                            onChanged: (String? newValue) {
                              setState(() {
                                dropdownvalue = newValue;
                              });
                            },
                          ),

                          //button
                          Material(
                            color: Colors.black,
                            borderRadius: BorderRadius.circular(30),
                            child: InkWell(
                              onTap: () {
                                if (formKey.currentState!.validate()) {
                                  Fluttertoast.showToast(msg: "En cours ...");
                                  saveItemInfoToDatabase();
                                }
                              },
                              borderRadius: BorderRadius.circular(30),
                              child: const Padding(
                                padding: EdgeInsets.symmetric(
                                  vertical: 10,
                                  horizontal: 28,
                                ),
                                child: Text(
                                  "Enregistrer",
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 16,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 16,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return pickedImageXFile == null ? defaultScreen() : uploadItemFormScreen();
  }
}
