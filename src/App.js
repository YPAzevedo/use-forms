import React, { useState } from "react";
import "./styles.css";
import useForms from "./useForms";

export default function App() {
  const [formData, setFormData] = useState({});
  const { register, handleSubmit, errors } = useForms();

  const onSubmit = (data, errors) => {
    setFormData(data);
    console.log(errors);
  };

  return (
    <div className="App">
      <h1>useForms</h1>
      <h2>Submit your form.</h2>
      <pre style={{ border: "1px solid black", padding: 12 }}>
        {JSON.stringify(formData, null, 2)}
      </pre>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="search">Name: </label>
        <input
          ref={register({ required: [true, "Name is required"] })}
          name="name"
          type="text"
          placeholder="Your name"
        />
        <br />
        {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
        <br />
        <label htmlFor="email">Email: </label>
        <input
          ref={register({
            required: [true, "Email is required"],
            maxLength: [15, "Email is too long"],
            minLength: [1, "Email is too short"]
          })}
          name="email"
          type="text"
          placeholder="Your email"
        />
        <br />
        {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        <br />
        <label htmlFor="age">Age: </label>
        <input
          ref={register({
            customPredicate: [(value) => value === "22", "Age must be 22"]
          })}
          name="age"
          type="text"
          placeholder="Your age"
        />
        <br />
        {errors.age && <small style={{ color: "red" }}>{errors.age}</small>}
        <br />
        <label htmlFor="nickname">Nickname: </label>
        <input
          ref={register({
            required: [true, "Nickname is required"],
            maxLength: [10, "Must be less than 10 characters long"],
            regex: [new RegExp("user:", "i"), "Nicknames must have user:"]
          })}
          name="nickname"
          type="text"
          placeholder="Your nickname"
        />
        <br />
        {errors.nickname && (
          <small style={{ color: "red" }}>{errors.nickname}</small>
        )}
        <br />
        <label htmlFor="password">Password: </label>
        <input
          ref={register({
            required: [true, "Password required"],
            minLength: [5, "Must be more then 5 characters long"]
          })}
          name="password"
          type="password"
          placeholder="Your password"
        />
        <br />
        {errors.password && (
          <small style={{ color: "red" }}>{errors.password}</small>
        )}
        <br />
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          ref={register({
            matchesWith: ["password", "Passwords not matching"]
          })}
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
        />
        <br />
        {errors.confirmPassword && (
          <small style={{ color: "red" }}>{errors.confirmPassword}</small>
        )}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
