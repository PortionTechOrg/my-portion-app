import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Link } from "react-router-dom";
import useSignup from "@/hooks/form-hooks/use-signup-hook";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";

export default function RegisterBuyer() {

  const { onSignUp, form, isLoading } = useSignup();

  // Set the role to user automatically
  React.useEffect(() => {
    form.setValue('role', 'user');
  }, [form]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                width={120}
                height={320}
                alt="portion-logo"
              />
            </Link>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Create an account
          </h1>
          <p className="text-gray-500 text-lg">Start your journey with us</p>
        </div>

        {/* Sign Up Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSignUp)} className="space-y-6">
            <div>
              <FormField
                control={form.control}
                name="firstname"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium mb-2 block">First Name</FormLabel>
                    <FormControl>
                      <Input className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary" placeholder="John" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>

            <div>
              <FormField
                control={form.control}
                name="lastname"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium mb-2 block">Last Name</FormLabel>
                    <FormControl>
                      <Input className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>

            <div>
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium mb-2 block">Email</FormLabel>
                    <FormControl>
                      <Input className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary" placeholder="johndoe@mail.com" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>

            <div>
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium mb-2 block">Password</FormLabel>
                    <FormControl>
                      <Input className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary" type="password" placeholder="password" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>

            <div>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium mb-2 block">Confirm Password</FormLabel>
                    <FormControl>
                      <Input className="h-12 text-base border-gray-200 focus:border-primary focus:ring-primary" type="password" placeholder="confirm password" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                
                required
              />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-primary hover:text-primary/80 underline"
                >
                  Terms & Conditions
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
            >
              {isLoading ? <div className="spinner"></div> : "Create Account"}
            </Button>
          </form>
        </Form>

        {/* Sign in link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
