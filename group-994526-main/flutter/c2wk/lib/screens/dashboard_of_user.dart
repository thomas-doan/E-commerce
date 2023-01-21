
import 'package:c2wk/screens/add_product_component.dart';
import 'package:c2wk/screens/favorite_component.dart';
import 'package:c2wk/screens/home_component.dart';
import 'package:c2wk/screens/order_component.dart';
import 'package:c2wk/screens/profile_component.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'package:get/get.dart';
import 'package:flutter/material.dart';



// ignore: must_be_immutable
class DashboardOfUser extends StatelessWidget {
  DashboardOfUser({super.key});
/* final currentUser = CurrentUser().test(); */
  List<Widget> buildListView = [
    const HomeComponent(),
    const FavoriteComponent(),
    const OrderComponent(),
    const ProfileComponent(),
    const UploadItemsScreenComponent()
  ];

  List navigationButtonsProperties = [
    {
      "active_icon": Icons.home,
      "non_active_icon": Icons.home_outlined,
      "label": "Home",
    },
    {
      "active_icon": Icons.favorite,
      "non_active_icon": Icons.favorite_border,
      "label": "Favorites",
    },
    {
      "active_icon": FontAwesomeIcons.boxOpen,
      "non_active_icon": FontAwesomeIcons.box,
      "label": "Orders",
    },
     {
      "active_icon": Icons.person,
      "non_active_icon": Icons.person_outlined,
      "label": "profile",
    }, 

        {
      "active_icon": Icons.photo_album,
      "non_active_icon": Icons.photo_album_outlined,
      "label": "Add Product",
    },
  ];

final RxInt _indexNumber = 0.obs;

  @override
  Widget build(BuildContext context) {
        return Scaffold(
           backgroundColor: Colors.black,
          body: SafeArea(
            child: Obx(() => buildListView[_indexNumber.value]),
          ),
          bottomNavigationBar: Obx(
            () => BottomNavigationBar(
              currentIndex: _indexNumber.value,
              onTap: (value) {
                _indexNumber.value = value;
              },
              showSelectedLabels: true,
              showUnselectedLabels: true,
              selectedItemColor: Colors.white,
              unselectedItemColor: Colors.white24,
              items: List.generate(5, (index) {
                var navBtnProperty = navigationButtonsProperties[index];
                return BottomNavigationBarItem(
                  backgroundColor: Colors.black,
                  icon: Icon(navBtnProperty["non_active_icon"]),
                  activeIcon: Icon(navBtnProperty["active_icon"]),
                  label: navBtnProperty["label"],
                );
              }),
            ),
          ), 
        );
      
    
  }
}

