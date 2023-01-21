import 'dart:convert';

List<CategoryModel> categoryFromJson(String str) => List<CategoryModel>.from(
    json.decode(str).map((x) => CategoryModel.fromJson(x)));

String categoryToJson(List<CategoryModel> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class CategoryModel {
  CategoryModel({
    required this.id,
    required this.name,
    required this.image,
  });

  int id;
  String name;
  String image;

  factory CategoryModel.fromJson(Map<String, dynamic> json) => CategoryModel(
        id: json["id"],
        name: json["category"],
        image: json["image"],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "category": name,
        "image": image,
      };
}
