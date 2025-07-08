import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const JavaTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Core Java
      </Typography>
      <Typography variant="body1" paragraph>
        {` Java is a versatile, object-oriented programming language used for
        building a wide range of applications, from web and mobile apps to
        large-scale enterprise systems. It's known for its "write once, run
        anywhere" capability.`}
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Object-Oriented Programming (OOP):</strong>
          {` A paradigm based
          on the concept of "objects," which can contain data and code.`}
        </li>
        <li>
          <strong>JVM (Java Virtual Machine):</strong> An engine that allows
          Java programs to run on any device or operating system.
        </li>
        <li>
          <strong>Classes and Objects:</strong> A class is a blueprint for
          creating objects. An object is an instance of a class.
        </li>
        <li>
          <strong>Collections Framework:</strong> A set of classes and
          interfaces for storing and managing groups of data, like `List` and
          `Map`.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example (A Class)
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <pre>
          <code>
            {`public class Dog {
    String breed;
    int age;

    public Dog(String breed) {
        this.breed = breed;
    }

    public void bark() {
        System.out.println("Woof!");
    }

    public static void main(String[] args) {
        Dog myDog = new Dog("Labrador");
        myDog.bark(); // Prints "Woof!"
    }
}`}
          </code>
        </pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        This code defines a `Dog` class with properties and a method. The `main`
        method creates a new `Dog` object and calls its `bark` method.
      </Typography>
    </Box>
  );
};

export default JavaTutorialPage;
