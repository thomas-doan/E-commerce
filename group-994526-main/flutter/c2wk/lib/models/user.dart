import 'dart:convert';

List<UserModel> userFromJson(String str) =>
    List<UserModel>.from(json.decode(str).map((x) => UserModel.fromJson(x)));

String userToJson(List<UserModel> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));


class UserModel {

   UserModel({
    required this.id_user,
    required this.username,
    required this.email,
    required this.password,
    required this.fk_role,
/*     required this.createdAt,
    required this.updatedAt, */
   /*  required this.deletedAt, */
  });

  // ignore: non_constant_identifier_names
  int id_user;
  String username;
  String password;
  int fk_role;
  String email;
/*   DateTime createdAt;
  DateTime updatedAt; */
  /* DateTime deletedAt; */
  // ignore: non_constant_identifier_names





  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
        id_user: json["id_user"],
        username: json["username"],
        email: json["email"],
        fk_role: json["fk_role"],
        password: json["password"],
    /*     createdAt: DateTime.parse(json["created_at"]),
        updatedAt: DateTime.parse(json["updated_at"]), */
     /*    deletedAt: DateTime.parse(json["deleted_at"]), */
      );

  Map<String, dynamic> toJson() => {
        'id_user': id_user.toString(),
        'username': username,
        'email': email,
        'fk_role': fk_role.toString(),
        'password': password,
/*        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(), */
     /*    "deletedAt": updatedAt.toIso8601String(), */
      };
}
