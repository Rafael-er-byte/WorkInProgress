import InvalidOperation from "../../../../shared/errors/core/InvalidOperation";
import InvalidParameters from "../../../../shared/errors/core/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/errors/core/MissingRequiredParameters";
import UserBuilder from "../model/UserBuilder";

describe("User entity tests (strong password validation)", () => {
  let builder: UserBuilder;

  beforeEach(() => {
    builder = new UserBuilder()
      .setId("user-001")
      .setUserName("rafael")
      .setEmail("rafael@example.com", true)
      .setEmailPrimary("rafael@example.com")
      .setPassword("ValidP@ss1") // Valid password
      .setCreatedAt("2025-10-19")
      .setLocalPassword(true);
  });

  // Building
  test("should build a valid user with builder", () => {
    const user = builder.build();

    expect(user.getId()).toBe("user-001");
    expect(user.getUserName()).toBe("rafael");
    expect(user.getMainEmail()?.getEmail()).toBe("rafael@example.com");
    expect(user.hasPassword()).toBe(true);
    expect(user.getCreatedAt()).toBe("2025-10-19");
  });

  // Password tests
  test("should set and get a valid password", () => {
    const user = builder.build();
    user.setPassword("NewValidP@ss2");
    expect(user.getPasssword()).toBe("NewValidP@ss2");
  });

  test("should throw for invalid passwords (too short)", () => {
    const user = builder.build();
    expect(() => user.setPassword("Ab1@c")).toThrow(InvalidParameters);
  });

  test("should throw for missing uppercase", () => {
    const user = builder.build();
    expect(() => user.setPassword("weakp@ss1")).toThrow(InvalidParameters);
  });

  test("should throw for missing lowercase", () => {
    const user = builder.build();
    expect(() => user.setPassword("WEAKP@SS1")).toThrow(InvalidParameters);
  });

  test("should throw for missing number", () => {
    const user = builder.build();
    expect(() => user.setPassword("WeakP@ss")).toThrow(InvalidParameters);
  });

  test("should throw for missing symbol", () => {
    const user = builder.build();
    expect(() => user.setPassword("WeakPass1")).toThrow(InvalidParameters);
  });

  test("should throw when getting password without having one", () => {
    builder.setLocalPassword(false);
    const user = builder.build();
    expect(() => user.getPasssword()).toThrow(InvalidOperation);
  });

  //Emails

  test("should add and list all emails", () => {
    const user = builder.build();
    user.setEmail("extra@example.com");
    const emails = user.getAllEmails();

    expect(emails).toContain("rafael@example.com");
    expect(emails).toContain("extra@example.com");
  });

  test("should delete an email correctly", () => {
    const user = builder.build();
    user.setEmail("temp@example.com");
    user.deleteEmail("temp@example.com");

    expect(user.getAllEmails()).not.toContain("temp@example.com");
  });

  test("should throw when deleting non-existent email", () => {
    const user = builder.build();
    expect(() => user.deleteEmail("ghost@example.com")).toThrow(InvalidOperation);
  });

  test("should remove main email if deleted", () => {
    const user = builder.build();
    const main = user.getMainEmail()?.getEmail()!;
    user.deleteEmail(main);
    expect(user.getMainEmail()).toBeUndefined();
  });

  test("should change main email", () => {
    const user = builder.build();
    user.setEmail("second@example.com");
    user.setMainEmail("second@example.com");

    expect(user.getMainEmail()?.getEmail()).toBe("second@example.com");
  });

  test("should throw when setting non-existing main email", () => {
    const user = builder.build();
    expect(() => user.setMainEmail("notfound@example.com")).toThrow(InvalidOperation);
  });

  test("should verify email successfully", () => {
    const user = builder.build();
    user.verifyEmail("rafael@example.com");
    expect(user.getMainEmail()?.isVerified()).toBe(true);
  });

  test("should throw when verifying non-existent email", () => {
    const user = builder.build();
    expect(() => user.verifyEmail("ghost@example.com")).toThrow(InvalidOperation);
  });

  //Profile URL

  test("should set and get profile url", () => {
    const user = builder.build();
    user.setUrlProfile("https://cdn/img.png");
    expect(user.getUrlProfile()).toBe("https://cdn/img.png");
  });

  test("should delete profile url", () => {
    const user = builder.build();
    user.setUrlProfile("https://cdn/img.png");
    user.deleteUrlProfile();
    expect(user.getUrlProfile()).toBeUndefined();
  });

  test("should throw when setting empty url", () => {
    const user = builder.build();
    expect(() => user.setUrlProfile("")).toThrow(MissingRequiredParameters);
  });

  //Username

  test("should update username", () => {
    const user = builder.build();
    user.setUserName("adrian");
    expect(user.getUserName()).toBe("adrian");
  });

  test("should throw when setting empty username", () => {
    const user = builder.build();
    expect(() => user.setUserName("")).toThrow(MissingRequiredParameters);
  });
});
