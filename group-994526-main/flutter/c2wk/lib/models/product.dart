import 'dart:convert';

List<ProductModel> productFromJson(String str) => List<ProductModel>.from(
    json.decode(str).map((x) => ProductModel.fromJson(x)));

String productToJson(List<ProductModel> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class ProductModel {
  int id;
  String name;
  int price;
  String description;
  String image;
  int categoryId;
  int userId;


  ProductModel({
    required this.id,
    required this.name,
    required this.price,
    required this.description,
    required this.image,
    required this.categoryId,
    required this.userId,
  });
//INSERT INTO Products(name, price, description, image, CategoryId, UserIdUser, createdAt, updatedAt) VALUES ('name5', 4, 'description jdfje', 'assets/manteaugood.jpg', 2, 1, '2022-12-22 12:46:37', '2022-12-23 12:46:37');
  factory ProductModel.fromJson(Map<String, dynamic> json) => ProductModel(
        id: json["id_product"],
        name: json["name"],
        price: json["price"],
        description: json["description"],
        image: json["image"],
        categoryId: json["CategoryId"],
        userId: json["UserIdUser"],
      );

  Map<String, dynamic> toJson() => {
        "id_product": id,
        "name": name,
        "price": price,
        "description": description,
        "image": image,
        "CategoryId": categoryId,
        "UserIdUser": userId,
      };
}
