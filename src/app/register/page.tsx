"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import GoogleButton from "@/components/auth/GoogleButton";
import { authClient } from "@/lib/auth-client";

const passwordError = (password: string) => {
  if (!/[A-Z]/.test(password)) return "Password needs an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password needs a lowercase letter.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  return "";
};

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    const invalid = passwordError(user.password);
    setError(invalid);
    if (invalid) return;

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (data) {
      toast.add({
        title: "Account created",
        description: "Login with your new account.",
      });
      router.push("/login");
    }

    if (error) {
      toast.add({
        title: "Registration failed",
        description: error.message,
      });
    }
  };

  return (
    <main className="w-full mx-auto flex max-w-md flex-col gap-6 px-6 py-16">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-heading text-2xl">
            Create your account
          </CardTitle>
          <CardDescription>
            It takes a minute, then you can borrow and lend books.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" name="name" placeholder="Shahriar Hasan" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="image">Photo URL</FieldLabel>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="https://i.ibb.co/your-photo.jpg"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" required />
                {error ? (
                  <FieldDescription className="text-destructive">
                    {error}
                  </FieldDescription>
                ) : (
                  <FieldDescription>
                    One uppercase letter, one lowercase letter, at least 6 characters.
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit">Register</Button>
              </Field>
              <FieldSeparator>Or continue with</FieldSeparator>
              <Field>
                <GoogleButton label="Register with Google" />
                <FieldDescription className="text-center">
                  Already a member? <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
