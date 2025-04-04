"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"
// import { User } from '@/types/user';
import type { Profile } from "@/types/profile"
//import { SupabaseClient } from '@supabase/supabase-js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileFormProps extends React.ComponentPropsWithoutRef<"div"> {
  initialProfile?: {
    avatar: string
    username: string
    firstName: string
    lastName: string
    age: string
    school: string
    gradYear: string
    major: string
    bio: string
    linkedin: string
    github: string
    portfolio: string
  }
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ className, initialProfile, ...props }) => {
  const [profile, setProfile] = useState(
    initialProfile || {
      avatar: "",
      username: "",
      firstName: "",
      lastName: "",
      age: "",
      school: "",
      gradYear: "",
      major: "",
      bio: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
  )

  const [isDirty, setIsDirty] = useState(false)
  const [isFormEmpty, setIsFormEmpty] = useState(true)
  const [user, setUser] = useState<Profile | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const router = useRouter()

  // fetch user info from SupaBase client on initial render
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error(error)
      return
    }

    const dbUser = await supabase.from("profiles").select("*").eq("id", data.user?.id)

    if (dbUser.data && dbUser.data.length > 0) {
      setUser(dbUser.data[0])

      // Update the profile state with the fetched data
      const userData = dbUser.data[0]
      setProfile((prev) => ({
        ...prev,
        avatar: userData.avatar || prev.avatar,
        username: userData.username || prev.username,
        firstName: userData.firstName || prev.firstName,
        lastName: userData.lastName || prev.lastName,
        age: userData.age || prev.age,
        school: userData.school || prev.school,
        gradYear: userData.gradYear || prev.gradYear,
        major: userData.major || prev.major,
        bio: userData.bio || prev.bio,
        linkedin: userData.linkedin || prev.linkedin,
        github: userData.github || prev.github,
        portfolio: userData.portfolio || prev.portfolio,
      }))
    }
  }

  useEffect(() => {
    const isChanged = Object.keys(profile).some(
      (key) => profile[key as keyof typeof profile] !== initialProfile?.[key as keyof typeof profile],
    )
    setIsDirty(isChanged)

    const isEmpty = Object.values(profile).every((value) => value === "")
    setIsFormEmpty(isEmpty)
  }, [profile, initialProfile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveSuccess(false)

    try {
      const supabase = createClient()
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError) {
        throw new Error(userError.message)
      }

      if (!userData.user) {
        throw new Error("User not authenticated")
      }

      // Create a single object with all profile fields
      const profileData = {
        id: userData.user.id,
        ...profile,
      }

      // Upsert all data at once
      const { error } = await supabase.from("profiles").upsert(profileData)

      if (error) {
        throw new Error(error.message)
      }

      // Update the user state with the new profile data
      setUser(
        (prev) =>
          ({
            ...prev,
            ...profile,
          }) as Profile,
      )

      // Show success state
      setSaveSuccess(true)

      // Refresh the page data
      router.refresh()

      // Reset dirty state since we've saved
      setIsDirty(false)
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsSaving(false)

      // Reset success state after 3 seconds
      if (saveSuccess) {
        setTimeout(() => {
          setSaveSuccess(false)
        }, 3000)
      }
    }
  }

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Update Profile</CardTitle>
        <CardDescription>Update your profile information below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                name="avatar"
                value={profile.avatar}
                onChange={handleInputChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                placeholder="johndoe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                placeholder="John"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Select
                name="age"
                value={profile.age}
                onValueChange={(value) => setProfile((prev) => ({ ...prev, age: value }))}
              >
                <SelectTrigger id="age">
                  <SelectValue placeholder="Select your age" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 101 }, (_, i) => i).map((age) => (
                    <SelectItem key={age} value={age.toString()}>
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                name="school"
                value={profile.school}
                onChange={handleInputChange}
                placeholder="University of ..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gradYear">Graduation Year</Label>
              <Select
                name="gradYear"
                value={profile.gradYear}
                onValueChange={(value) => setProfile((prev) => ({ ...prev, gradYear: value }))}
              >
                <SelectTrigger id="gradYear">
                  <SelectValue placeholder="Select graduation year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 200 }, (_, i) => new Date().getFullYear() + i - 100).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
                name="major"
                value={profile.major}
                onChange={handleInputChange}
                placeholder="Computer Science"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Biography</Label>
              <Input
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                placeholder="Hello, I'm John Doe!"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/your-profile"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                name="github"
                value={profile.github}
                onChange={handleInputChange}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="portfolio">Portfolio</Label>
              <Input
                id="portfolio"
                name="portfolio"
                value={profile.portfolio}
                onChange={handleInputChange}
                placeholder="https://your-portfolio.com"
              />
            </div>
            <Button type="submit" className="w-full" disabled={(!isDirty && !isFormEmpty) || isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Saved!
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

