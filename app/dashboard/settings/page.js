"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data.user;

      if (user) {
        setUserId(user.id);
        const { data, error } = await supabase
          .from("main_owner")
          .select("name, email")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setProfile(data);
        }
      } else {
        console.error("No authenticated user found.");
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    if (!userId) {
      console.error("User ID is not defined.");
      return;
    }

    const { error } = await supabase
      .from("main_owner")
      .update({ name: profile.name, email: profile.email })
      .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      alert("Profile updated successfully");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16">
      <div className="px-4 md:px-6">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your account settings and preferences.
          </p>
        </div>
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <form className="grid gap-6" onSubmit={handleSaveChanges}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-picture">Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <img src="/placeholder.svg" alt="Profile Picture" />
                        <AvatarFallback>JP</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change</Button>
                    </div>
                  </div>
                  <CardFooter>
                    <Button type="submit">Save Changes</Button>
                  </CardFooter>
                </form>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <div className="font-medium">Delete Account</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Permanently delete your account and all your data.
                    </div>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
