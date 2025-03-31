import mongoose from "mongoose";
import request from "supertest";
import application from "../app";
import * as db from "../model/_index";

describe("User Authentication and Blog Endpoints", () => {
  let token: string;
  let blogId: string; 

  const testUser = {
    email: "testuser@yopmail.com",
    password: "Test@1234",
    firstName: "Test",
    lastName: "User",
    deviceToken: "static-device-token",
    deviceType: "1",
    deviceName: "Test Device",
  };

  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/Blog-Database");

    await db.userModel.deleteOne({ email: testUser.email });
    await request(application.instance).post("/api/user/signup").send(testUser);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

    it("should log in with a static user successfully", async () => {
      const res = await request(application.instance)
        .post("/api/user/login")
        .send({
          email: testUser.email,
          password: testUser.password,
          deviceToken: testUser.deviceToken,
          deviceType: testUser.deviceType,
          deviceName: testUser.deviceName,
        });

      console.log("Login Response:", res.body);
      token = res.body.data?.accessToken;

      expect(res.status).toBe(200);
    }, 15000);

    it("should create a blog successfully", async () => {
      const res = await request(application.instance)
        .post("/api/user/private/createBlog")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Blog",
          author: "Vanshika",
          content: "This is a test blog content.",
        });

      console.log("Create Blog Response:", res.body);
      expect(res.status).toBe(200);

      blogId = res.body.data?._id; 
    }, 15000);

    it("should edit a blog successfully", async () => {

      const res = await request(application.instance)
        .put(`/api/user/private/editBlog/${blogId}`) 
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Updated Blog",
          author: "Vanshika",
          content: "This is an updated blog content.",
        });

      console.log("Edit Blog Response:", res.body);
      expect(res.status).toBe(200);
    }, 15000);


    it("should get user personal blog ", async () => {
      const res = await request(application.instance)
        .get(`/api/user/private/getMyBlogs`)
        .set("Authorization", `Bearer ${token}`);
      console.log("my Blog Response:", res.body);
      expect(res.status).toBe(200);
    }, 15000);
  
  
    it("should get all userss blogs ", async () => {
      const res = await request(application.instance)
        .get(`/api/user/private/getAllUserBlogs`)
        .set("Authorization", `Bearer ${token}`);
      console.log("my Blog Response:", res.body);
      expect(res.status).toBe(200);
    }, 15000);

  
  it("should delete a blog successfully", async () => {
    const res = await request(application.instance)
      .delete(`/api/user/private/deleteBlog/${blogId}`)
      .set("Authorization", `Bearer ${token}`);
    console.log("delete Blog Response:", res.body);
    expect(res.status).toBe(200);
  }, 15000);





});
